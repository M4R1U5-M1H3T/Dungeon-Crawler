'use strict';

class ChallengeService {
  forEnemy(enemy, usedIds = []) {
    return ChallengeRepository.getRandom(
      enemy.topic,
      enemy.maxDiff,
      usedIds,
      enemy.questionType || null,
    );
  }

  forDoor(topic, floor, usedIds = []) {
    return ChallengeRepository.getRandom(topic, Math.min(floor + 1, 3), usedIds, null);
  }

  forWriteDoor(usedIds = []) {
    return ChallengeRepository.getRandom(null, 3, usedIds, 'write');
  }

  validate(ch, ans) {
    if (ch.type === 'write') return this._validateWrite(ch, ans);
    return ch.answer === ans;
  }

  _validateWrite(ch, ans) {
    const norm = s => String(s).trim().replace(/\s+/g, '').replace(/['"]/g, '"');
    const userAns = norm(ans);
    
    if (!userAns) return false;

    const getSimilarity = (s1, s2) => {
      const len1 = s1.length, len2 = s2.length;
      if (!len1 || !len2) return 0;
      const matrix = Array.from({ length: len1 + 1 }, () => new Array(len2 + 1).fill(0));
      for (let i = 0; i <= len1; i++) matrix[i][0] = i;
      for (let j = 0; j <= len2; j++) matrix[0][j] = j;

      for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
          const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j - 1] + cost
          );
        }
      }
      return 1 - (matrix[len1][len2] / Math.max(len1, len2));
    };

    const checkMatch = (target) => {
      const t = norm(target);
      if (t === userAns) return true;

      if (getSimilarity(userAns, t) >= 0.80) return true;
      
      const isSignificantChunk = userAns.length >= Math.max(4, t.length * 0.60);
      if (isSignificantChunk && (t.includes(userAns) || userAns.includes(t))) return true;
      
      return false; 
    };

    if (checkMatch(ch.answer)) return true;
    if (ch.altAnswers) {
      for (const alt of ch.altAnswers) {
        if (checkMatch(alt)) return true;
      }
    }
    return false;
  }

  shuffled(ch) { return ChallengeRepository.shuffleOptions(ch); }
}


class CombatService {
  SPELL_COST = 20;

  playerDmg(isSpell, streak) {
    const base  = isSpell ? 25 : 14;
    const bonus = Math.min(streak, 4) * 4;
    return base + bonus + Math.floor(Math.random() * 8);
  }

  enemyDmg(e) {
    return e.dmg[0] + Math.floor(Math.random() * (e.dmg[1] - e.dmg[0] + 1));
  }
}


class ProgressionService {
  score(difficulty, isSpell, streak) {
    let pts = difficulty * 50;
    if (isSpell) pts = Math.floor(pts * 1.5);
    pts += Math.min(streak, 5) * 15;
    return pts;
  }
}