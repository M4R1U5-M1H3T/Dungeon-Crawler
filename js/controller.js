'use strict';

class GameController {
  constructor() {
    this._s   = new GameState();
    this._r   = new Renderer('app');
    this._cs  = new ChallengeService();
    this._cbt = new CombatService();
    this._prg = new ProgressionService();
  }

  start() { this._r.render(this._s, this); }

  act(action, value) {
    const s = this._s;
    const handlers = {
      // ── MENU ──────────────────────────────────────────────
      'start':      () => { s.screen = 'NAME'; },
      'howto':      () => { s.screen = 'HOWTO'; },
      'menu':       () => { s.screen = 'MENU'; },
      'restart':    () => { this._s = new GameState(); this._r.render(this._s, this); return; },

      // ── NAME ──────────────────────────────────────────────
      'confirm-name': () => {
        const inp = document.getElementById('pname');
        const name = (inp?.value || s.nameDraft || '').trim();
        if (!name) {
          const e = document.getElementById('name-err');
          if (e) e.textContent = '⚠️ Introdu un nume!';
          return;
        }
        s.player   = new Player(name);
        s.screen   = 'EXPLORING';
        s.floor    = 1; s.roomIdx = 0;
        s.msg      = `Bun venit, ${name}! Dungeonul te așteaptă. 🗡️`;
        s.msgCls   = 'success';
        s.leveledUp = false;
        s.usedChallengeIds = [];
      },

      // ── EXPLORING ─────────────────────────────────────────
      'enter-combat': () => {
        const fl   = DungeonRepository.get(s.floor);
        const room = fl.rooms[s.roomIdx];
        s.enemy    = new EnemyInstance(EnemyRepository.getById(room.id));
        s.screen   = 'COMBAT';
        s.phase    = 'ACTION';
        s.log      = [];
        s.lastOk   = null; s.msg = '';
        s.leveledUp = false;
        s.player.streak = 0;
        s.writeAnswer = '';
        s.pushLog(`⚔️ Luptă împotriva ${s.enemy.name}!`, 'log-info');
      },

      'enter-door': () => {
        const fl   = DungeonRepository.get(s.floor);
        const room = fl.rooms[s.roomIdx];
        const ch   = this._cs.forDoor(room.topic, s.floor, s.usedChallengeIds);
        s.markUsed(ch.id);
        s.challenge = ch;
        s.opts      = this._cs.shuffled(ch);
        s.screen    = 'DOOR';
        s.lastOk    = null; s.showHint = false;
        s.msg = ''; s.leveledUp = false;
      },

      'enter-write-door': () => {
        const ch = this._cs.forWriteDoor(s.usedChallengeIds);
        s.markUsed(ch.id);
        s.challenge = ch;
        s.screen = 'WRITE_DOOR';
        s.lastOk = null; s.showHint = false;
        s.writeAnswer = '';
        s.msg = ''; s.leveledUp = false;
      },

      'collect': () => {
        const fl   = DungeonRepository.get(s.floor);
        const room = fl.rooms[s.roomIdx];
        s.player.potions += room.potions;
        s.player.gold    += room.gold;
        s.player.addScore(100);
        s.rewardLines = [`+${room.potions} poțiun${room.potions>1?'i':'e'}`, `+${room.gold} aur`, '+100 scor'];
        s.msg = 'Ai colectat comorile din cameră!';
        s.screen = 'REWARD'; s.leveledUp = false;
      },

      // ── COMBAT ────────────────────────────────────────────
      'c-attack': () => {
        const ch = this._cs.forEnemy(s.enemy, s.usedChallengeIds);
        s.markUsed(ch.id);
        s.challenge = ch; s.opts = this._cs.shuffled(ch);
        s.phase = 'CHALLENGE'; s.isSpell = false;
        s.lastOk = null; s.showHint = false;
        s.writeAnswer = '';
      },

      'c-spell': () => {
        if (!s.player.spendMp(20)) { s.msg = 'MP insuficient!'; return; }
        const ch = this._cs.forEnemy(s.enemy, s.usedChallengeIds);
        s.markUsed(ch.id);
        s.challenge = ch; s.opts = this._cs.shuffled(ch);
        s.phase = 'CHALLENGE'; s.isSpell = true;
        s.lastOk = null; s.showHint = false;
        s.writeAnswer = '';
      },

      'c-potion': () => {
        if (!s.player.potions) return;
        s.player.potions--;
        s.player.heal(40);
        s.pushLog(`🧪 ${s.player.name} a folosit o poțiune (+40 HP)`, 'log-heal');
        s.msg = `Ai recuperat 40 HP! (${s.player.hp}/${s.player.maxHp})`;
        s.lastOk = null;
      },

      'c-flee': () => {
        if (s.enemy.isBoss) {
          s.msg = 'Nu poți fugi de un boss!';
          return;
        }
        
        if (Math.random() < 0.20) {
          s.lastOk = null; 
          s.leveledUp = false;
          
          s.roomIdx++;
          const fl = DungeonRepository.get(s.floor);
          
          if (s.roomIdx >= fl.rooms.length) {
            s.floor++; 
            s.roomIdx = 0;
            s.msg = `🏃 Ai fugit cu succes! Ai ajuns pe Etajul ${s.floor}.`;
          } else {
            s.msg = '🏃 Ai fugit din luptă și ai avansat în camera următoare!'; 
          }
          
          s.screen = 'EXPLORING';
          s.msgCls = 'info';
          
        } else {
          const dmg = this._cbt.enemyDmg(s.enemy);
          s.player.takeDmg(dmg);
          s.pushLog(`❌ Fuga a eșuat! ${s.enemy.name} te-a lovit pentru ${dmg} dmg.`, 'log-bad');
          s.msg = `Nu ai reușit să fugi! Damage primit: ${dmg}`;
          s.lastOk = false;
          if (!s.player.isAlive()) s.screen = 'GAME_OVER';
        }
      },

      // ── COMBAT ANSWER ──────────────────────────────────────
      'answer': () => {
        const ok = this._cs.validate(s.challenge, value);
        if (ok) {
          s.player.streak++;
          const dmg  = this._cbt.playerDmg(s.isSpell, s.player.streak);
          const pts  = this._prg.score(s.challenge.difficulty, s.isSpell, s.player.streak);
          s.enemy.takeDmg(dmg);
          s.player.addScore(pts);
          s.player.restoreMp(5);
          s.lastOk = true;
          s.pushLog(`✅ ${s.isSpell?'🔮 Vrajă':'⚔️ Atac'} pentru ${dmg} dmg! +${pts} pts | streak×${s.player.streak}`, 'log-ok');
          s.msg = `Corect! ${s.challenge.explanation}`;

          if (!s.enemy.isAlive()) {
            const lvl = s.player.gainXP(s.enemy.xp);
            s.player.gold += s.enemy.gold;
            s.player.streak = 0;
            s.rewardLines = [`+${s.enemy.xp} XP`, `+${s.enemy.gold} aur`,
              ...(lvl?[`🎉 Level Up → Lv.${s.player.level}!`]:[])];
            s.msg = `Ai înfrânt ${s.enemy.name}!`;
            s.screen = 'REWARD'; s.leveledUp = lvl;
          }
        } else {
          s.player.streak = 0;
          const dmg = this._cbt.enemyDmg(s.enemy);
          s.player.takeDmg(dmg);
          s.pushLog(`❌ Greșit! ${s.enemy.name} contra-atacă pentru ${dmg} dmg!`, 'log-hit');
          s.msg = `Greșit! Damage primit: ${dmg}.`;
          s.lastOk = false;
          if (!s.player.isAlive()) { s.screen = 'GAME_OVER'; }
        }
        s.phase = 'ACTION';
        s.writeAnswer = '';
      },

      // ── DOOR ANSWERS ───────────────────────────────────────
      'door-answer': () => {
        const ok = this._cs.validate(s.challenge, value);
        this._handleDoorResult(ok);
      },

      'write-door-answer': () => {
        const ok = this._cs.validate(s.challenge, value);
        this._handleDoorResult(ok);
      },

      // ── HINTS ──────────────────────────────────────────────
      'hint': () => { 
        s.showHint = true; 
        s.player.addScore(-50); 
      },
      'hint-write': () => {
        if (s.player.gold >= 10) {
          s.player.gold -= 10;
          s.showHint = true;
        } else {
          s.msg = 'Aur insuficient pentru hint!';
          s.msgCls = 'danger';
        }
      },

      // ── REWARD ────────────────────────────────────────────
      'next-room': () => {
        s.roomIdx++;
        s.lastOk = null; s.leveledUp = false;
        const fl = DungeonRepository.get(s.floor);
        if (s.roomIdx >= fl.rooms.length) {
          if (s.floor >= DungeonRepository.total()) {
            s.screen = 'VICTORY';
          } else {
            s.floor++; s.roomIdx = 0;
            s.screen = 'EXPLORING';
            s.msg = `Ai ajuns pe Etajul ${s.floor}: ${DungeonRepository.get(s.floor).name}!`;
            s.msgCls = 'success';
          }
        } else {
          s.screen = 'EXPLORING'; s.msg = ''; s.msgCls = 'info';
        }
      },

      'goto-shop': () => { s.shopMsg = ''; s.screen = 'SHOP'; },

      // ── SHOP ──────────────────────────────────────────────
      'buy-potion': () => {
        if (s.player.gold < 15) return;
        s.player.gold -= 15; s.player.potions++;
        s.shopMsg = '✅ Poțiune cumpărată!';
      },
      'buy-mana': () => {
        if (s.player.gold < 20) return;
        s.player.gold -= 20; s.player.restoreMp(30);
        s.shopMsg = '✅ Cristal de Mana folosit! +30 MP';
      },
      'buy-xp': () => {
        if (s.player.gold < 25) return;
        s.player.gold -= 25;
        const lvl = s.player.gainXP(50);
        s.shopMsg = `✅ +50 XP${lvl?' — LEVEL UP!':''}`;
        s.leveledUp = lvl;
      },
      'buy-maxhp': () => {
        if (s.player.gold < 40) return;
        s.player.gold -= 40; s.player.maxHp += 20; s.player.heal(20);
        s.shopMsg = '✅ +20 Max HP permanent!';
      },
      'close-shop': () => { s.screen = 'REWARD'; },
    };

    const h = handlers[action];
    if (h) h();
    this._r.render(this._s, this);
  }

  _handleDoorResult(ok) {
    const s = this._s;
    if (ok) {
      const pts = 150 + s.challenge.difficulty * 50;
      s.player.addScore(pts);
      const lvl = s.player.gainXP(30);
      s.rewardLines = [`+${pts} scor`, '+30 XP', '🚪 Ușa s-a deschis!'];
      s.msg = `Corect! ${s.challenge.explanation}`;
      s.screen = 'REWARD'; s.lastOk = true;
      s.leveledUp = lvl;
    } else {
      const dmg = 10 + s.floor * 4;
      s.player.takeDmg(dmg);
      s.lastOk = false; s.doorDmg = dmg;
      if (!s.player.isAlive()) s.screen = 'GAME_OVER';
    }
  }
}