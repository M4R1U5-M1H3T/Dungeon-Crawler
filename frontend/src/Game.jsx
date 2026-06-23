import { useCallback } from 'react';
import { fetchChallenge, validateAnswer } from './api/gameApi.js';
import { CombatService, ProgressionService } from './services/combat.js';

import MenuScreen from './components/screens/MenuScreen.jsx';
import LearnScreen from './components/screens/LearnScreen.jsx';
import HowToScreen from './components/screens/HowToScreen.jsx';
import NameScreen from './components/screens/NameScreen.jsx';
import ExploreScreen from './components/screens/ExploreScreen.jsx';
import CombatScreen from './components/screens/CombatScreen.jsx';
import DoorScreen from './components/screens/DoorScreen.jsx';
import WriteDoorScreen from './components/screens/WriteDoorScreen.jsx';
import RewardScreen from './components/screens/RewardScreen.jsx';
import ShopScreen from './components/screens/ShopScreen.jsx';
import GameOverScreen from './components/screens/GameOverScreen.jsx';
import VictoryScreen from './components/screens/VictoryScreen.jsx';

export default function Game({ state, dispatch }) {
  const { floors, enemies, usedChallengeIds, grade, selectedTopics } = state;

  const getChallenge = useCallback(async (opts) => {
    dispatch({ type: 'SET_LOADING', value: true });
    try {
      const ch = await fetchChallenge({
        ...opts,
        excludeIds: usedChallengeIds,
        grade: grade || 9,
        selectedTopics: selectedTopics || [],
      });
      return ch;
    } finally {
      dispatch({ type: 'SET_LOADING', value: false });
    }
  }, [usedChallengeIds, grade, selectedTopics, dispatch]);

  const handleEnterCombat = useCallback(() => {
    dispatch({ type: 'ENTER_COMBAT' });
  }, [dispatch]);

  const handleEnterDoor = useCallback(async () => {
    const fl = floors.find(f => f.id === state.floor);
    const room = fl.rooms[state.roomIdx];
    const ch = await getChallenge({ topic: room.topic, maxDiff: Math.min(state.floor + 1, 3) });
    dispatch({ type: 'ENTER_DOOR', challenge: ch, opts: ch.options || [] });
  }, [state.floor, state.roomIdx, floors, getChallenge, dispatch]);

  const handleEnterWriteDoor = useCallback(async () => {
    const ch = await getChallenge({ type: 'write', maxDiff: 3 });
    dispatch({ type: 'ENTER_WRITE_DOOR', challenge: ch });
  }, [getChallenge, dispatch]);

  const handleAttack = useCallback(async () => {
    const enemy = state.enemy;
    const ch = await getChallenge({
      topic: enemy.topic,
      maxDiff: enemy.maxDiff,
      type: enemy.questionType || undefined,
    });
    dispatch({ type: 'C_ATTACK', challenge: ch, opts: ch.options || [] });
  }, [state.enemy, getChallenge, dispatch]);

  const handleSpell = useCallback(async () => {
    if (state.player.mp < 20) return;
    const enemy = state.enemy;
    const ch = await getChallenge({
      topic: enemy.topic,
      maxDiff: enemy.maxDiff,
      type: enemy.questionType || undefined,
    });
    dispatch({ type: 'C_SPELL', challenge: ch, opts: ch.options || [] });
  }, [state.player, state.enemy, getChallenge, dispatch]);

  const handlePotion = useCallback(() => {
    dispatch({ type: 'C_POTION' });
  }, [dispatch]);

  const handleFlee = useCallback(() => {
    if (state.enemy.isBoss) return;
    if (Math.random() < 0.10) {
      dispatch({ type: 'C_FLEE_SUCCESS' });
    } else {
      const dmg = CombatService.enemyDmg(state.enemy);
      dispatch({ type: 'C_FLEE_FAIL', dmg });
    }
  }, [state.enemy, dispatch]);

  const handleCombatAnswer = useCallback(async (answer) => {
    const ch = state.challenge;
    const result = await validateAnswer(ch.id, answer);
    if (result.correct) {
      const dmg = CombatService.playerDmg(state.isSpell, state.player.streak + 1);
      const pts = ProgressionService.score(ch.difficulty, state.isSpell, state.player.streak + 1);
      dispatch({ type: 'ANSWER_CORRECT', dmg, pts, explanation: result.explanation });
    } else {
      const dmg = CombatService.enemyDmg(state.enemy);
      dispatch({ type: 'ANSWER_WRONG', dmg, correctAnswer: result.correctAnswer });
    }
  }, [state.challenge, state.isSpell, state.player, state.enemy, dispatch]);

  const handleDoorAnswer = useCallback(async (answer) => {
    const ch = state.challenge;
    const result = await validateAnswer(ch.id, answer);
    if (result.correct) {
      dispatch({ type: 'DOOR_CORRECT', explanation: result.explanation });
    } else {
      dispatch({ type: 'DOOR_WRONG', correctAnswer: result.correctAnswer });
    }
  }, [state.challenge, dispatch]);

  const actions = {
    onMenu: () => dispatch({ type: 'GOTO_MENU' }),
    onHowTo: () => dispatch({ type: 'GOTO_HOWTO' }),
    onStart: () => dispatch({ type: 'GOTO_NAME' }),
    onSetNameDraft: (v) => dispatch({ type: 'SET_NAME_DRAFT', value: v }),
    onConfirmName: (name) => dispatch({ type: 'CONFIRM_NAME', name }),
    onEnterCombat: handleEnterCombat,
    onEnterDoor: handleEnterDoor,
    onEnterWriteDoor: handleEnterWriteDoor,
    onCollect: () => dispatch({ type: 'COLLECT' }),
    onAttack: handleAttack,
    onSpell: handleSpell,
    onPotion: handlePotion,
    onFlee: handleFlee,
    onCombatAnswer: handleCombatAnswer,
    onDoorAnswer: handleDoorAnswer,
    onWriteDoorAnswer: handleDoorAnswer,
    onHint: () => dispatch({ type: 'SHOW_HINT' }),
    onHintWrite: () => dispatch({ type: 'SHOW_HINT_WRITE' }),
    onNextRoom: () => dispatch({ type: 'NEXT_ROOM' }),
    onGotoShop: () => dispatch({ type: 'GOTO_SHOP' }),
    onBuyPotion: () => dispatch({ type: 'BUY_POTION' }),
    onBuyMana: () => dispatch({ type: 'BUY_MANA' }),
    onBuyXP: () => dispatch({ type: 'BUY_XP' }),
    onBuyMaxHP: () => dispatch({ type: 'BUY_MAXHP' }),
    onCloseShop: () => dispatch({ type: 'CLOSE_SHOP' }),
    onSetWriteAnswer: (v) => dispatch({ type: 'SET_WRITE_ANSWER', value: v }),
    onRestart: () => dispatch({ type: 'RESTART' }),
    onOpenChapterModal: (topicId) => dispatch({ type: 'OPEN_CHAPTER_MODAL', topicId }),
    onCloseChapterModal: () => dispatch({ type: 'CLOSE_CHAPTER_MODAL' }),
    onGotoLearn: (topicId) => dispatch({ type: 'GOTO_LEARN', topicId }),
    onCloseLearn: () => dispatch({ type: 'CLOSE_LEARN' }),
    onToggleTopic: (topicId) => dispatch({ type: 'TOGGLE_TOPIC', topicId }),
    onClearTopics: () => dispatch({ type: 'CLEAR_TOPICS' }),
    onStartChapterQuiz: (topics) => dispatch({ type: 'START_CHAPTER_QUIZ', topics }),
    onStartWeakQuiz: (topics) => dispatch({ type: 'START_CHAPTER_QUIZ', topics }),
  };

  const screenMap = {
    MENU:       <MenuScreen state={state} actions={actions} />,
    LEARN:      <LearnScreen state={state} actions={actions} />,
    HOWTO:      <HowToScreen actions={actions} />,
    NAME:       <NameScreen state={state} actions={actions} />,
    EXPLORING:  <ExploreScreen state={state} actions={actions} />,
    COMBAT:     <CombatScreen state={state} actions={actions} />,
    DOOR:       <DoorScreen state={state} actions={actions} />,
    WRITE_DOOR: <WriteDoorScreen state={state} actions={actions} />,
    REWARD:     <RewardScreen state={state} actions={actions} />,
    SHOP:       <ShopScreen state={state} actions={actions} />,
    GAME_OVER:  <GameOverScreen state={state} actions={actions} />,
    VICTORY:    <VictoryScreen state={state} actions={actions} />,
  };

  return (
    <div id="app">
      {state.loading && (
        <div style={{ position: 'fixed', top: 8, right: 8, color: 'var(--dg)', fontSize: 11, zIndex: 10000 }}>
          ⟳ loading...
        </div>
      )}
      {screenMap[state.screen] || screenMap.MENU}
    </div>
  );
}
