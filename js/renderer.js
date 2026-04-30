'use strict';

class Renderer {
  constructor(id) { this.root = document.getElementById(id); }

  render(s, ctrl) {
    const map = {
      MENU:       () => this._menu(),
      NAME:       () => this._name(s),
      EXPLORING:  () => this._explore(s),
      COMBAT:     () => this._combat(s),
      DOOR:       () => this._door(s),
      WRITE_DOOR: () => this._writeDoor(s),
      REWARD:     () => this._reward(s),
      SHOP:       () => this._shop(s),
      GAME_OVER:  () => this._over(s),
      VICTORY:    () => this._win(s),
      HOWTO:      () => this._howto(),  
    };
    this.root.innerHTML = (map[s.screen] || map.MENU)();
    this._bind(ctrl);
  }

  /* ── HUD ──────────────────────────────────────────────────── */
  _hud(p, floor) {
    const hp    = (p.hp / p.maxHp * 100).toFixed(1);
    const mp    = (p.mp / p.maxMp * 100).toFixed(1);
    const xpPct = (p.xp / (p.level * 100) * 100).toFixed(1);
    return `<div class="panel" style="padding:10px 14px;">
      <div class="hbar" style="margin-bottom:7px;">
        <span class="c-amb" style="font-size:13px;">⚔️ ${this._esc(p.name)}</span>
        <span class="muted">Lv.${p.level} &nbsp;·&nbsp; Etaj ${floor}</span>
        <span class="c-amb" style="font-size:13px;">🏆 ${p.score}</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
        <div class="bar-wrap">
          <span style="font-size:11px;min-width:26px;">❤️</span>
          <div class="bar"><div class="bar-fill hp-bar" style="width:${hp}%"></div></div>
          <span class="bar-val">${p.hp}/${p.maxHp}</span>
        </div>
        <div class="bar-wrap">
          <span style="font-size:11px;min-width:26px;">💙</span>
          <div class="bar"><div class="bar-fill mp-bar" style="width:${mp}%"></div></div>
          <span class="bar-val">${p.mp}/${p.maxMp}</span>
        </div>
      </div>
      <div class="hbar" style="margin-top:7px;font-size:11px;">
        <span>🧪 ${p.potions} poțiun${p.potions===1?'e':'i'}</span>
        <span class="bar-wrap" style="gap:4px;flex:1;max-width:140px;margin:0 12px;">
          <div class="bar" style="height:6px;"><div class="bar-fill" style="width:${xpPct}%;background:linear-gradient(90deg,#664400,var(--amb));"></div></div>
        </span>
        <span>XP ${p.xp}/${p.level*100}</span>
        <span>💰 ${p.gold}</span>
        ${p.streak>=2?`<span class="c-amb blink">🔥×${p.streak}</span>`:''}
      </div>
    </div>`;
  }

  /* ── PROGRESS ─────────────────────────────────────────────── */
  _progress(s) {
    const fl   = DungeonRepository.get(s.floor);
    const dots = fl.rooms.map((r, i) => {
      let cls = 'rdot', icon = '·';
      if (i < s.roomIdx)        { cls = 'rdot done'; icon = '✓'; }
      else if (i === s.roomIdx) { cls = 'rdot cur';  icon = r.icon; }
      else if (r.type === 'BOSS'){ cls = 'rdot boss'; icon = '♛'; }
      return `<span class="${cls}">${icon}</span>`;
    }).join(' ');
    return `<div class="panel" style="padding:7px 14px;">
      <div class="hbar">
        <span class="muted" style="font-size:11px;">${fl.name}</span>
        <div style="display:flex;gap:4px;align-items:center;">${dots}</div>
        <span class="muted" style="font-size:11px;">Camera ${s.roomIdx+1}/${fl.rooms.length}</span>
      </div>
    </div>`;
  }

  /* ── SCREENS ──────────────────────────────────────────────── */
  _menu() {
    return `<div class="panel ta-c" style="margin:auto;max-width:580px;padding:40px 24px;">
      <div class="title-vt">SYNTAX SORCERER</div>
      <div class="muted" style="letter-spacing:3px;margin-bottom:20px;">▸ DUNGEON CRAWLER · PYTHON EDITION ◂</div>
      <pre class="muted" style="font-size:10px;line-height:1.5;margin-bottom:20px;">
╔══════════════════════════════════════╗
║  Explorează dungeonurile pythoniste  ║
║  Sparge bug-uri cu cod corect        ║
║  Înfruntă inamicii cu logică pură   ║
╚══════════════════════════════════════╝
      </pre>
      <div class="info-box" style="text-align:left;margin-bottom:20px;">
        <span class="tag">📚 Programa cls. a 9-a · Informatică Python</span><br>
        Capitole: Variabile · Operatori · Condiționali · Bucle · Șiruri · Liste · Funcții · Dicționare · Tupluri · Scriere
      </div>
      <div class="flex-col" style="align-items:center;gap:10px;">
        <button class="btn amb center" style="width:220px;font-size:15px;" data-a="start">▸ JOACĂ ACUM</button>
        <button class="btn center" style="width:220px;" data-a="howto">? CUM SE JOACĂ</button>
      </div>
    </div>`;
  }

  _howto() {
    return `<div class="panel" style="max-width:580px;margin:auto;">
      <div class="title-vt" style="font-size:40px;">CUM SE JOACĂ</div>
      <hr class="hr">
      <div class="flex-col" style="font-size:13px;line-height:1.9;">
        <p>⚔️ <span class="c-amb">ATACĂ</span> – Răspunde corect la o întrebare Python pentru a lovi inamicul.</p>
        <p>🔮 <span class="c-pur">VRAJĂ</span> – Costă <b>20 MP</b> dar face mai mult damage. Streak-ul crește daunele!</p>
        <p>🧪 <span class="c-g">POȚIUNE</span> – Recuperează <b>40 HP</b>. Poți cumpăra mai multe din magazin.</p>
        <p>🏃 <span class="c-red">FUGĂ</span> – 20% șansă de reușită. <b>Nu funcționează împotriva boss-urilor!</b></p>
        <p>🚪 <span class="c-blu">UȘI MC</span> – Alege răspunsul corect. Eroarea costă HP!</p>
        <p>✍️ <span class="c-cyn">UȘI SCRIERE</span> – Scrie cod Python corect. Hint costă <b>10 💰</b>!</p>
        <p>💡 <span class="muted">HINT MC</span> – Penalizare <b>-50 scor</b>. Hint SCRIERE – costă <b>10 💰 aur</b>.</p>
        <p>🔥 <span class="c-amb">STREAK</span> – Răspunsuri consecutive corecte cresc damage-ul și scorul!</p>
      </div>
      <hr class="hr">
      <div class="grid3">
        <div class="info-box ta-c">⭐<br><span class="muted">Ușor</span></div>
        <div class="info-box ta-c">⭐⭐<br><span class="muted">Mediu</span></div>
        <div class="info-box ta-c">⭐⭐⭐<br><span class="muted">Greu</span></div>
      </div>
      <hr class="hr">
      <button class="btn full center" data-a="menu">← ÎNAPOI LA MENIU</button>
    </div>`;
  }

  _name(s) {
    return `<div class="panel ta-c" style="margin:auto;max-width:420px;padding:40px 24px;">
      <div style="font-size:64px;margin-bottom:8px;">⚔️</div>
      <div class="muted" style="letter-spacing:2px;margin-bottom:20px;">ALEGE NUMELE TĂU DE LUPTĂ</div>
      <input id="pname" class="btn" type="text" maxlength="20"
        placeholder="ex: PythonWizard"
        style="width:100%;text-align:center;font-size:16px;padding:12px;margin-bottom:8px;border-color:var(--dim);"
        value="${this._esc(s.nameDraft)}">
      <div id="name-err" style="font-size:12px;min-height:18px;color:var(--red);margin-bottom:10px;"></div>
      <button class="btn amb full center" style="font-size:14px;" data-a="confirm-name">INTRĂ ÎN DUNGEON ▸</button>
    </div>`;
  }

  _explore(s) {
    const fl   = DungeonRepository.get(s.floor);
    const room = fl.rooms[s.roomIdx];
    let body   = '';

    if (room.type === 'COMBAT' || room.type === 'BOSS') {
      const e      = EnemyRepository.getById(room.id);
      const isBoss = room.type === 'BOSS';
      body = `<div class="panel ta-c">
        <div class="tag" style="${isBoss?'color:var(--red)':''}">${isBoss?'⚠️ BOSS':'👁 INAMIC'}</div>
        <div class="sprite" style="color:${isBoss?'var(--red)':'var(--amb)'};">${e.sprite}</div>
        <div class="ename" style="color:${isBoss?'var(--red)':'var(--amb)'};">${e.name}</div>
        <div class="muted" style="margin:6px 0;">${e.flavor}</div>
        <hr class="hr">
        <button class="btn ${isBoss?'red':'amb'} full center" style="font-size:14px;" data-a="enter-combat">
          ${isBoss?'⚠️ ÎNFRUNTĂ BOSS-UL':'⚔️ ÎNCEPE LUPTA'}
        </button>
      </div>`;

    } else if (room.type === 'DOOR') {
      body = `<div class="panel ta-c">
        <div class="tag c-blu">🔐 UȘĂ BLOCATĂ</div>
        <div class="sprite c-blu">🚪</div>
        <div class="ename c-blu">Ușă Magică</div>
        <div class="muted" style="margin:6px 0;">Sigilată cu cod Python corupt. Rezolvă challenge-ul!</div>
        <div class="info-box" style="margin:8px auto;max-width:300px;">
          📚 Subiect: <span class="c-amb">${room.topic.toUpperCase()}</span>
        </div>
        <hr class="hr">
        <button class="btn blu full center" style="font-size:14px;" data-a="enter-door">🔓 DEZLEAGĂ UȘA</button>
      </div>`;

    } else if (room.type === 'WRITE_DOOR') {
      body = `<div class="panel ta-c">
        <div class="tag c-cyn">✍️ UȘĂ SCRIPTORILOR</div>
        <div class="sprite c-cyn">✍️</div>
        <div class="ename c-cyn">Ușa Codului Scris</div>
        <div class="muted" style="margin:6px 0;">Trebuie să scrii cod Python corect pentru a o deschide!</div>
        <div class="info-box" style="margin:8px auto;max-width:300px;">
          ✏️ Tip: <span class="c-cyn">SCRIERE COD</span> &nbsp;·&nbsp; Hint costă <span class="c-amb">10 💰</span>
        </div>
        <hr class="hr">
        <button class="btn" style="width:100%;text-align:center;font-size:14px;border-color:var(--cyn);color:var(--cyn);" data-a="enter-write-door">✍️ DEZLEAGĂ UȘA</button>
      </div>`;

    } else if (room.type === 'TREASURE') {
      body = `<div class="panel ta-c">
        <div class="tag c-amb">💎 CAMERĂ COMORI</div>
        <div class="sprite c-amb">💎</div>
        <div class="ename c-amb">Cameră Comori</div>
        <div class="muted" style="margin:6px 0;">Ai găsit o cameră cu recompense!</div>
        <div class="info-box" style="margin:8px auto;max-width:300px;">
          🧪 +${room.potions} poțiun${room.potions>1?'i':'e'} &nbsp;·&nbsp; 💰 +${room.gold} aur &nbsp;·&nbsp; +100 scor
        </div>
        <hr class="hr">
        <button class="btn amb full center" style="font-size:14px;" data-a="collect">💎 COLECTEAZĂ</button>
      </div>`;
    }

    return `
      ${this._hud(s.player, s.floor)}
      ${this._progress(s)}
      ${s.msg ? `<div class="panel info-box" style="color:${s.msgCls==='danger'?'var(--red)':s.msgCls==='success'?'var(--g)':'var(--blu)'};">${s.msg}</div>` : ''}
      ${s.leveledUp ? `<div class="panel ta-c" style="border-color:var(--amb);color:var(--amb);">🎉 LEVEL UP! Ești acum Lv.${s.player.level}! +15 Max HP · +10 Max MP</div>` : ''}
      ${body}`;
  }

  _combat(s) {
    const p    = s.player;
    const e    = s.enemy;
    const eHp  = (e.hp / e.maxHp * 100).toFixed(1);
    const isBoss = !!e.isBoss;

    let body = '';
    if (s.phase === 'ACTION') {
      let resultBox = '';
      if (s.lastOk !== null) {
        resultBox = `<div class="panel info-box" style="color:${s.lastOk?'var(--g)':'var(--red)'};margin-top:8px;">
          ${s.lastOk?'✅':'❌'} ${this._esc(s.msg)}
          ${!s.lastOk && s.challenge ? `<br><span class="muted">✔ Răspuns corect: <span class="c-amb">${this._esc(s.challenge.answer)}</span></span>` : ''}
        </div>`;
      }
      const fleeDisabled = isBoss;
      const fleeTitle    = isBoss ? 'Nu poți fugi de boss!' : '(20% șansă)';
      body = `${resultBox}
        <div class="grid2" style="margin-top:10px;">
          <button class="btn amb" data-a="c-attack">⚔️ ATACĂ<br><span class="muted">(15+ dmg · răspunde corect)</span></button>
          <button class="btn pur" data-a="c-spell" ${p.mp<20?'disabled':''}>🔮 VRAJĂ<br><span class="muted">(25+ dmg · cost 20 MP)</span></button>
          <button class="btn" data-a="c-potion" ${p.potions===0?'disabled':''}>🧪 POȚIUNE<br><span class="muted">${p.potions}x · +40 HP</span></button>
          <button class="btn red" data-a="c-flee" ${fleeDisabled?'disabled':''}>🏃 FUGĂ<br><span class="muted">${fleeTitle}</span></button>
        </div>`;
    } else {
      body = this._challengeW(s, 'answer');
    }

    return `
      ${this._hud(p, s.floor)}
      <div class="panel">
        <div class="hbar">
          <div>
            <div class="tag" style="${isBoss?'color:var(--red)':''}">${isBoss?'⚠️ BOSS':'⚔️ LUPTĂ'}</div>
            <div class="ename" style="color:${isBoss?'var(--red)':'var(--amb)'};">${e.sprite} ${e.name}</div>
          </div>
          <div style="min-width:160px;">
            <div class="bar-wrap">
              <div class="bar"><div class="bar-fill en-bar" style="width:${eHp}%"></div></div>
              <span class="bar-val" style="color:var(--red);">${e.hp}/${e.maxHp}</span>
            </div>
            <div class="muted" style="font-size:10px;text-align:right;margin-top:2px;">${e.flavor}</div>
          </div>
        </div>
        ${body}
      </div>
      <div class="panel" style="padding:10px 14px;">
        <div class="tag" style="margin-bottom:4px;">▸ LOG LUPTĂ</div>
        <div class="log">${s.log.map(l=>`<div class="${l.cls}">${l.msg}</div>`).join('')}</div>
      </div>`;
  }

  _door(s) {
    const ch = s.challenge;
    return `
      ${this._hud(s.player, s.floor)}
      ${this._progress(s)}
      <div class="panel">
        <div class="hbar" style="margin-bottom:8px;">
          <div>
            <div class="tag c-blu">🚪 UȘĂ BLOCATĂ · ${ch.topic.toUpperCase()} · ${'⭐'.repeat(ch.difficulty)}</div>
          </div>
          <div class="tag">${ch.type.replace('_',' ').toUpperCase()}</div>
        </div>
        ${s.lastOk===false?`<div class="info-box" style="color:var(--red);margin-bottom:8px;">❌ Greșit! Ai primit <b>${s.doorDmg} damage</b>. Mai încearcă!</div>`:''}
        ${this._challengeW(s, 'door-answer')}
      </div>`;
  }

  _writeDoor(s) {
    const ch = s.challenge;
    return `
      ${this._hud(s.player, s.floor)}
      ${this._progress(s)}
      <div class="panel">
        <div class="hbar" style="margin-bottom:8px;">
          <div>
            <div class="tag" style="color:var(--cyn);">✍️ UȘA SCRIPTORILOR · ${'⭐'.repeat(ch.difficulty)}</div>
          </div>
          <div class="tag">SCRIERE COD</div>
        </div>
        ${s.lastOk===false?`<div class="info-box" style="color:var(--red);margin-bottom:8px;">❌ Greșit! Ai primit <b>${s.doorDmg} damage</b>. Mai încearcă! Răspunsul corect: <span class="c-amb">${this._esc(ch.answer)}</span></div>`:''}
        ${this._challengeWrite(s, 'write-door-answer')}
      </div>`;
  }

  /* ── CHALLENGE WIDGETS ────────────────────────────────────── */

  _challengeW(s, action) {
    const ch = s.challenge;

    if (ch.type === 'write') return this._challengeWrite(s, action);

    const topicColor = {
      'variabile':'var(--g)','operatori':'var(--blu)','condiționale':'var(--amb)',
      'bucle':'var(--pur)','șiruri':'var(--red)','liste':'#ff8c00',
      'funcții':'var(--cyn)','dicționare':'#ff66cc','tupluri':'#aaaaff',
    }[ch.topic] || 'var(--g)';

    return `<div id="ch-widget">
      <div class="hbar" style="margin-bottom:7px;">
        <span class="tag" style="color:${topicColor};">📚 ${ch.topic.toUpperCase()} · ${'⭐'.repeat(ch.difficulty)}</span>
        ${!s.showHint?`<button class="btn" style="padding:3px 10px;font-size:11px;" data-a="hint">💡 Hint (-50 pts)</button>`:''}
      </div>
      <div style="font-size:13px;color:var(--txt);margin-bottom:6px;">${this._esc(ch.question)}</div>
      ${ch.code ? `<div class="code">${this._escCode(ch.code)}</div>` : ''}
      ${s.showHint ? `<div class="info-box" style="margin-bottom:8px;color:var(--cyn);">💡 ${this._esc(ch.hint)}</div>` : ''}
      <div class="grid2" style="margin-top:6px;">
        ${s.opts.map((opt,i)=>`
          <button class="btn" data-a="${action}" data-v="${this._escA(opt)}"
            style="font-size:12px;padding:8px 10px;min-height:46px;text-align:left;">
            <span class="c-amb">${['A','B','C','D'][i]}.</span> ${this._esc(opt)}
          </button>`).join('')}
      </div>
    </div>`;
  }

  _challengeWrite(s, action) {
    const ch = s.challenge;
    const hintLabel = '💡 Hint (-10 💰)';
    const canAffordHint = s.player && s.player.gold >= 10;

    return `<div id="ch-widget">
      <div class="hbar" style="margin-bottom:7px;">
        <span class="tag" style="color:var(--cyn);">✍️ SCRIERE COD · ${'⭐'.repeat(ch.difficulty)}</span>
        ${!s.showHint
          ? `<button class="btn" style="padding:3px 10px;font-size:11px;" data-a="hint-write"
               ${!canAffordHint?'disabled':''} title="${canAffordHint?'':'Nu ai destul aur!'}">
               ${hintLabel}
             </button>`
          : ''}
      </div>
      <div style="font-size:13px;color:var(--txt);margin-bottom:6px;">${this._esc(ch.question)}</div>
      ${ch.code ? `<div class="code">${this._escCode(ch.code)}</div>` : ''}
      ${s.showHint ? `<div class="info-box" style="margin-bottom:8px;color:var(--cyn);">💡 ${this._esc(ch.hint)}</div>` : ''}
      <div class="flex-col" style="margin-top:8px;gap:6px;">
        <input id="write-ans" class="write-input"
          type="text"
          placeholder="Scrie codul Python corect…"
          data-action="${action}"
          autocomplete="off" autocorrect="off" spellcheck="false"
          value="${this._esc(s.writeAnswer)}">
        <button class="btn full center" style="border-color:var(--cyn);color:var(--cyn);"
          data-a="${action}" data-write="1">▸ TRIMITE RĂSPUNS</button>
      </div>
    </div>`;
  }

  /* ── REWARD ───────────────────────────────────────────────── */
  _reward(s) {
    return `
      ${this._hud(s.player, s.floor)}
      <div class="panel ta-c">
        <div class="sprite c-g">🏆</div>
        <div class="ename c-g">VICTORIE!</div>
        <div style="font-size:13px;margin:6px 0;">${s.msg}</div>
        <hr class="hr">
        <div class="info-box" style="text-align:left;margin-bottom:12px;">
          ${s.rewardLines.map(r=>`<div>✅ ${r}</div>`).join('')}
        </div>
        ${s.leveledUp?`<div style="color:var(--amb);font-size:13px;margin-bottom:12px;">🎉 LEVEL UP! Ești acum Lv.${s.player.level}!</div>`:''}
        <div class="grid2">
          <button class="btn amb center" data-a="next-room">▸ CAMERA URMĂTOARE</button>
          <button class="btn center" data-a="goto-shop">🛒 MAGAZIN (${s.player.gold} 💰)</button>
        </div>
      </div>`;
  }

  /* ── SHOP ─────────────────────────────────────────────────── */
  _shop(s) {
    const p = s.player;
    return `
      ${this._hud(p, s.floor)}
      <div class="panel">
        <div class="title-vt" style="font-size:36px;text-align:center;">🛒 MAGAZIN</div>
        <hr class="hr">
        <div class="flex-col">
          ${this._shopRow('🧪 Poțiune de Sănătate','Recuperare 40 HP','buy-potion',15,p.gold)}
          <hr class="hr">
          ${this._shopRow('💙 Cristal de Mana','Recuperare 30 MP','buy-mana',20,p.gold)}
          <hr class="hr">
          ${this._shopRow('📖 Tomul Înțelepciunii','+50 XP','buy-xp',25,p.gold)}
          <hr class="hr">
          ${this._shopRow('🛡️ Amuleta HP','+20 Max HP permanent','buy-maxhp',40,p.gold)}
        </div>
        <hr class="hr">
        ${s.shopMsg?`<div class="info-box" style="margin-bottom:10px;">${s.shopMsg}</div>`:''}
        <button class="btn full center" data-a="close-shop">← CONTINUĂ AVENTURA</button>
      </div>`;
  }

  _shopRow(name, desc, action, cost, gold) {
    return `<div class="hbar">
      <div>
        <div class="c-amb">${name}</div>
        <div class="muted">${desc}</div>
      </div>
      <button class="btn center" data-a="${action}" ${gold<cost?'disabled':''} style="min-width:120px;">
        ${cost} 💰
      </button>
    </div>`;
  }

  /* ── GAME OVER / WIN ──────────────────────────────────────── */
  _over(s) {
    return `<div class="panel ta-c" style="margin:auto;max-width:480px;padding:40px 24px;">
      <div class="title-vt" style="color:var(--red);font-size:60px;">GAME OVER</div>
      <div class="sprite c-red">💀</div>
      <div style="font-size:13px;margin:12px 0;">
        <p class="c-txt">${this._esc(s.player.name)} a căzut în Dungeonul Python...</p>
        <p class="muted">Etaj ${s.floor} · Camera ${s.roomIdx+1}</p>
      </div>
      <div class="info-box" style="margin-bottom:20px;text-align:left;">
        <div>🏆 Scor final: <span class="c-amb">${s.player.score}</span></div>
        <div>⚔️ Nivel: <span class="c-amb">${s.player.level}</span></div>
        <div>💰 Aur colectat: <span class="c-amb">${s.player.gold}</span></div>
      </div>
      <button class="btn amb full center" style="font-size:14px;" data-a="restart">↺ ÎNCEARCĂ DIN NOU</button>
    </div>`;
  }

  _win(s) {
    return `<div class="panel ta-c" style="margin:auto;max-width:480px;padding:40px 24px;">
      <div class="title-vt" style="color:var(--amb);">VICTORIE!</div>
      <div class="sprite c-amb">🏆</div>
      <div style="font-size:14px;margin:12px 0;">
        <p class="c-g">${this._esc(s.player.name)} a cucerit Dungeonul Python!</p>
        <p class="muted">Marele Maestru al Sintaxei a fost nimicit.</p>
      </div>
      <div class="info-box" style="margin-bottom:20px;text-align:left;">
        <div>🏆 Scor final: <span class="c-amb">${s.player.score}</span></div>
        <div>⚔️ Nivel final: <span class="c-amb">${s.player.level}</span></div>
        <div>💰 Aur total: <span class="c-amb">${s.player.gold}</span></div>
      </div>
      <button class="btn amb full center" style="font-size:14px;" data-a="restart">↺ JOACĂ DIN NOU</button>
    </div>`;
  }

  /* ── EVENT BINDING ────────────────────────────────────────── */
  _bind(ctrl) {
    this.root.querySelectorAll('[data-a]').forEach(el => {
      el.addEventListener('click', () => {
        if (el.dataset.write) {
          const inp = document.getElementById('write-ans');
          ctrl.act(el.dataset.a, inp ? inp.value : '');
        } else {
          ctrl.act(el.dataset.a, el.dataset.v);
        }
      });
    });

    const pname = this.root.querySelector('#pname');
    if (pname) {
      pname.focus();
      pname.addEventListener('keydown', e => {
        if (e.key === 'Enter') ctrl.act('confirm-name');
        ctrl._s.nameDraft = pname.value;
      });
      pname.addEventListener('input', () => { ctrl._s.nameDraft = pname.value; });
    }

    const writeInp = this.root.querySelector('#write-ans');
    if (writeInp) {
      writeInp.focus();
      writeInp.addEventListener('input', () => { ctrl._s.writeAnswer = writeInp.value; });
      writeInp.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          ctrl.act(writeInp.dataset.action, writeInp.value);
        }
      });
    }
  }

  /* ── ESCAPE HELPERS ───────────────────────────────────────── */
  _esc(s) {
    return String(s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
      .replace(/\n/g,'<br>');
  }
  _escCode(s) {
    return String(s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  _escA(s) {
    return String(s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }
}