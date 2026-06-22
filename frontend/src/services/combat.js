export const CombatService = {
  SPELL_COST: 20,
  playerDmg(isSpell, streak) {
    const base  = isSpell ? 25 : 14;
    const bonus = Math.min(streak, 4) * 4;
    return base + bonus + Math.floor(Math.random() * 8);
  },
  enemyDmg(e) {
    return e.dmg[0] + Math.floor(Math.random() * (e.dmg[1] - e.dmg[0] + 1));
  },
};

export const ProgressionService = {
  score(difficulty, isSpell, streak) {
    let pts = difficulty * 50;
    if (isSpell) pts = Math.floor(pts * 1.5);
    pts += Math.min(streak, 5) * 15;
    return pts;
  },
};
