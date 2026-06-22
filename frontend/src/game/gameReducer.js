import { Player, EnemyInstance } from '../entities/index.js';

function pushLog(state, msg, cls = 'log-sys') {
  const log = [{ msg, cls }, ...state.log].slice(0, 14);
  return { ...state, log };
}

function markUsed(state, id) {
  if (!id || state.usedChallengeIds.includes(id)) return state;
  return { ...state, usedChallengeIds: [...state.usedChallengeIds, id] };
}

export function gameReducer(state, action) {
  switch (action.type) {
    case 'INIT_DATA':
      return { ...state, floors: action.floors, enemies: action.enemies };

    case 'SET_LOADING':
      return { ...state, loading: action.value };

    case 'GOTO_MENU':
      return { ...state, screen: 'MENU' };

    case 'GOTO_HOWTO':
      return { ...state, screen: 'HOWTO' };

    case 'GOTO_NAME':
      return { ...state, screen: 'NAME' };

    case 'SET_NAME_DRAFT':
      return { ...state, nameDraft: action.value };

    case 'CONFIRM_NAME': {
      const name = (action.name || '').trim();
      if (!name) return state;
      const player = new Player(name);
      return {
        ...state,
        player,
        screen: 'EXPLORING',
        floor: 1,
        roomIdx: 0,
        msg: `Bun venit, ${name}! Dungeonul te așteaptă. 🗡️`,
        msgCls: 'success',
        leveledUp: false,
        usedChallengeIds: [],
        log: [],
      };
    }

    case 'ENTER_COMBAT': {
      const fl = state.floors.find(f => f.id === state.floor);
      const room = fl.rooms[state.roomIdx];
      const enemyData = state.enemies.find(e => e.id === room.id);
      const enemy = new EnemyInstance(enemyData);
      return {
        ...state,
        enemy,
        screen: 'COMBAT',
        phase: 'ACTION',
        log: [],
        lastOk: null,
        msg: '',
        leveledUp: false,
        writeAnswer: '',
        ...pushLog({ ...state, log: [] }, `⚔️ Luptă împotriva ${enemy.name}!`, 'log-info'),
      };
    }

    case 'ENTER_DOOR': {
      const s = markUsed(state, action.challenge.id);
      return {
        ...s,
        challenge: action.challenge,
        opts: action.opts,
        screen: 'DOOR',
        lastOk: null,
        showHint: false,
        msg: '',
        leveledUp: false,
      };
    }

    case 'ENTER_WRITE_DOOR': {
      const s = markUsed(state, action.challenge.id);
      return {
        ...s,
        challenge: action.challenge,
        screen: 'WRITE_DOOR',
        lastOk: null,
        showHint: false,
        writeAnswer: '',
        msg: '',
        leveledUp: false,
      };
    }

    case 'COLLECT': {
      const fl = state.floors.find(f => f.id === state.floor);
      const room = fl.rooms[state.roomIdx];
      const p = state.player.clone();
      p.potions += room.potions;
      p.gold += room.gold;
      p.addScore(100);
      return {
        ...state,
        player: p,
        rewardLines: [
          `+${room.potions} poțiun${room.potions > 1 ? 'i' : 'e'}`,
          `+${room.gold} aur`,
          '+100 scor',
        ],
        msg: 'Ai colectat comorile din cameră!',
        screen: 'REWARD',
        leveledUp: false,
      };
    }

    case 'C_ATTACK': {
      const s = markUsed(state, action.challenge.id);
      return {
        ...s,
        challenge: action.challenge,
        opts: action.opts,
        phase: 'CHALLENGE',
        isSpell: false,
        lastOk: null,
        showHint: false,
        writeAnswer: '',
      };
    }

    case 'C_SPELL': {
      const p = state.player.clone();
      if (!p.spendMp(20)) return { ...state, msg: 'MP insuficient!' };
      const s = markUsed({ ...state, player: p }, action.challenge.id);
      return {
        ...s,
        challenge: action.challenge,
        opts: action.opts,
        phase: 'CHALLENGE',
        isSpell: true,
        lastOk: null,
        showHint: false,
        writeAnswer: '',
      };
    }

    case 'C_POTION': {
      if (!state.player.potions) return state;
      const p = state.player.clone();
      p.potions--;
      p.heal(40);
      return pushLog(
        { ...state, player: p, msg: `Ai recuperat 40 HP! (${p.hp}/${p.maxHp})`, lastOk: null },
        `🧪 ${p.name} a folosit o poțiune (+40 HP)`,
        'log-heal'
      );
    }

    case 'C_FLEE_SUCCESS': {
      let newRoomIdx = state.roomIdx + 1;
      let newFloor = state.floor;
      let msg;
      const fl = state.floors.find(f => f.id === state.floor);
      if (newRoomIdx >= fl.rooms.length) {
        newFloor++;
        newRoomIdx = 0;
        msg = `🏃 Ai fugit cu succes! Ai ajuns pe Etajul ${newFloor}.`;
      } else {
        msg = '🏃 Ai fugit din luptă și ai avansat în camera următoare!';
      }
      return { ...state, floor: newFloor, roomIdx: newRoomIdx, screen: 'EXPLORING', msg, msgCls: 'info', lastOk: null, leveledUp: false };
    }

    case 'C_FLEE_FAIL': {
      const p = state.player.clone();
      p.takeDmg(action.dmg);
      const newState = pushLog(
        { ...state, player: p, msg: `Nu ai reușit să fugi! Damage primit: ${action.dmg}`, lastOk: false },
        `❌ Fuga a eșuat! ${state.enemy.name} te-a lovit pentru ${action.dmg} dmg.`,
        'log-bad'
      );
      if (!p.isAlive()) return { ...newState, screen: 'GAME_OVER' };
      return newState;
    }

    case 'ANSWER_CORRECT': {
      const p = state.player.clone();
      p.streak++;
      const dmg = action.dmg;
      const pts = action.pts;
      const enemy = state.enemy.clone();
      enemy.takeDmg(dmg);
      p.addScore(pts);
      p.restoreMp(5);

      let base = pushLog(
        { ...state, player: p, enemy, lastOk: true, msg: `Corect! ${action.explanation}` },
        `✅ ${state.isSpell ? '🔮 Vrajă' : '⚔️ Atac'} pentru ${dmg} dmg! +${pts} pts | streak×${p.streak}`,
        'log-ok'
      );

      if (!enemy.isAlive()) {
        const lvl = p.gainXP(enemy.xp);
        p.gold += enemy.gold;
        p.streak = 0;
        return {
          ...base,
          player: p,
          enemy,
          rewardLines: [
            `+${enemy.xp} XP`,
            `+${enemy.gold} aur`,
            ...(lvl ? [`🎉 Level Up → Lv.${p.level}!`] : []),
          ],
          msg: `Ai înfrânt ${enemy.name}!`,
          screen: 'REWARD',
          leveledUp: lvl,
        };
      }
      return { ...base, player: p, enemy, phase: 'ACTION', writeAnswer: '' };
    }

    case 'ANSWER_WRONG': {
      const p = state.player.clone();
      p.streak = 0;
      p.takeDmg(action.dmg);
      const newState = pushLog(
        { ...state, player: p, lastOk: false, msg: `Greșit! Damage primit: ${action.dmg}.`, phase: 'ACTION', writeAnswer: '', challenge: { ...state.challenge, correctAnswer: action.correctAnswer } },
        `❌ Greșit! ${state.enemy.name} contra-atacă pentru ${action.dmg} dmg!`,
        'log-hit'
      );
      if (!p.isAlive()) return { ...newState, screen: 'GAME_OVER' };
      return newState;
    }

    case 'DOOR_CORRECT': {
      const p = state.player.clone();
      const pts = 150 + state.challenge.difficulty * 50;
      p.addScore(pts);
      const lvl = p.gainXP(30);
      return {
        ...state,
        player: p,
        rewardLines: [`+${pts} scor`, '+30 XP', '🚪 Ușa s-a deschis!'],
        msg: `Corect! ${action.explanation}`,
        screen: 'REWARD',
        lastOk: true,
        leveledUp: lvl,
      };
    }

    case 'DOOR_WRONG': {
      const p = state.player.clone();
      const dmg = 10 + state.floor * 4;
      p.takeDmg(dmg);
      if (!p.isAlive()) return { ...state, player: p, screen: 'GAME_OVER' };
      return { ...state, player: p, lastOk: false, doorDmg: dmg, challenge: { ...state.challenge, correctAnswer: action.correctAnswer } };
    }

    case 'SHOW_HINT':
      return { ...state, showHint: true, player: (() => { const p = state.player.clone(); p.addScore(-50); return p; })() };

    case 'SHOW_HINT_WRITE': {
      if (state.player.gold < 10) return { ...state, msg: 'Aur insuficient pentru hint!', msgCls: 'danger' };
      const p = state.player.clone();
      p.gold -= 10;
      return { ...state, player: p, showHint: true };
    }

    case 'NEXT_ROOM': {
      const newRoomIdx = state.roomIdx + 1;
      const fl = state.floors.find(f => f.id === state.floor);
      if (newRoomIdx >= fl.rooms.length) {
        const totalFloors = state.floors.length;
        if (state.floor >= totalFloors) {
          return { ...state, screen: 'VICTORY' };
        }
        const newFloor = state.floor + 1;
        const newFl = state.floors.find(f => f.id === newFloor);
        return { ...state, floor: newFloor, roomIdx: 0, screen: 'EXPLORING', msg: `Ai ajuns pe Etajul ${newFloor}: ${newFl.name}!`, msgCls: 'success', lastOk: null, leveledUp: false };
      }
      return { ...state, roomIdx: newRoomIdx, screen: 'EXPLORING', msg: '', msgCls: 'info', lastOk: null, leveledUp: false };
    }

    case 'GOTO_SHOP':
      return { ...state, shopMsg: '', screen: 'SHOP' };

    case 'BUY_POTION': {
      if (state.player.gold < 15) return state;
      const p = state.player.clone();
      p.gold -= 15; p.potions++;
      return { ...state, player: p, shopMsg: '✅ Poțiune cumpărată!' };
    }
    case 'BUY_MANA': {
      if (state.player.gold < 20) return state;
      const p = state.player.clone();
      p.gold -= 20; p.restoreMp(30);
      return { ...state, player: p, shopMsg: '✅ Cristal de Mana folosit! +30 MP' };
    }
    case 'BUY_XP': {
      if (state.player.gold < 25) return state;
      const p = state.player.clone();
      p.gold -= 25;
      const lvl = p.gainXP(50);
      return { ...state, player: p, shopMsg: `✅ +50 XP${lvl ? ' — LEVEL UP!' : ''}`, leveledUp: lvl };
    }
    case 'BUY_MAXHP': {
      if (state.player.gold < 40) return state;
      const p = state.player.clone();
      p.gold -= 40; p.maxHp += 20; p.heal(20);
      return { ...state, player: p, shopMsg: '✅ +20 Max HP permanent!' };
    }
    case 'CLOSE_SHOP':
      return { ...state, screen: 'REWARD' };

    case 'SET_WRITE_ANSWER':
      return { ...state, writeAnswer: action.value };

    case 'RESTART':
      return {
        screen: 'MENU',
        player: null, floor: 1, roomIdx: 0,
        enemy: null, challenge: null, opts: [],
        log: [], msg: '', msgCls: 'info',
        lastOk: null, isSpell: false, showHint: false,
        phase: 'ACTION', rewardLines: [], shopMsg: '',
        nameDraft: '', leveledUp: false, doorDmg: 0,
        writeAnswer: '', usedChallengeIds: [],
        floors: state.floors, enemies: state.enemies,
        loading: false,
      };

    default:
      return state;
  }
}
