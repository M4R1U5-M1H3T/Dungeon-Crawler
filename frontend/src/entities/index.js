export class Player {
  constructor(name) {
    this.name    = name;
    this.hp      = 100; this.maxHp  = 100;
    this.mp      = 60;  this.maxMp  = 60;
    this.xp      = 0;   this.level  = 1;
    this.potions = 3;   this.gold   = 0;
    this.score   = 0;   this.streak = 0;
  }
  isAlive()    { return this.hp > 0; }
  takeDmg(n)   { this.hp = Math.max(0, this.hp - n); return this; }
  heal(n)      { this.hp = Math.min(this.maxHp, this.hp + n); return this; }
  restoreMp(n) { this.mp = Math.min(this.maxMp, this.mp + n); return this; }
  spendMp(n)   { if (this.mp < n) return false; this.mp -= n; return true; }
  addScore(n)  { this.score = Math.max(0, this.score + n); return this; }
  gainXP(n) {
    this.xp += n;
    const need = this.level * 100;
    if (this.xp >= need) {
      this.xp -= need; this.level++;
      this.maxHp += 15; this.heal(20);
      this.maxMp += 10; this.restoreMp(15);
      return true;
    }
    return false;
  }
  clone() {
    return Object.assign(new Player(this.name), this);
  }
}

export class EnemyInstance {
  constructor(d) { Object.assign(this, JSON.parse(JSON.stringify(d))); }
  isAlive()  { return this.hp > 0; }
  takeDmg(n) { this.hp = Math.max(0, this.hp - n); return this; }
  clone() { return new EnemyInstance(this); }
}
