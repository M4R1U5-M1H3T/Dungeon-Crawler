'use strict';

class GameState {
  constructor() {
    this.screen           = 'MENU';
    this.player           = null;
    this.floor            = 1;
    this.roomIdx          = 0;
    this.enemy            = null;
    this.challenge        = null;
    this.opts             = [];
    this.log              = [];
    this.msg              = '';
    this.msgCls           = 'c-blu';
    this.lastOk           = null;
    this.isSpell          = false;
    this.showHint         = false;
    this.phase            = 'ACTION';
    this.rewardLines      = [];
    this.shopMsg          = '';
    this.nameDraft        = '';
    this.leveledUp        = false;
    this.doorDmg          = 0;
    this.writeAnswer      = '';
    this.usedChallengeIds = [];
  }

  pushLog(msg, cls = 'log-sys') {
    this.log.unshift({ msg, cls });
    if (this.log.length > 14) this.log.pop();
  }

  markUsed(id) {
    if (id && !this.usedChallengeIds.includes(id)) {
      this.usedChallengeIds.push(id);
    }
  }
}