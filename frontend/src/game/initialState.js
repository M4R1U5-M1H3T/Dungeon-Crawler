export function makeInitialState() {
  return {
    screen: 'MENU',
    player: null,
    floor: 1,
    roomIdx: 0,
    enemy: null,
    challenge: null,
    opts: [],
    log: [],
    msg: '',
    msgCls: 'info',
    lastOk: null,
    isSpell: false,
    showHint: false,
    phase: 'ACTION',
    rewardLines: [],
    shopMsg: '',
    nameDraft: '',
    leveledUp: false,
    doorDmg: 0,
    writeAnswer: '',
    usedChallengeIds: [],
    // loaded from backend
    floors: [],
    enemies: [],
    loading: false,
  };
}
