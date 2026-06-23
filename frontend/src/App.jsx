import { useReducer, useEffect, useRef } from 'react';
import { gameReducer } from './game/gameReducer.js';
import { makeInitialState } from './game/initialState.js';
import { fetchDungeon, fetchEnemies } from './api/gameApi.js';
import Game from './Game.jsx';

const SAVE_KEY = 'dungeon_crawler_state';
const GRADE_LABELS = { 9: 'a 9-a', 10: 'a 10-a', 11: 'a 11-a' };

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, null, makeInitialState);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (state.player && state.screen !== 'MENU') {
      try {
        const toSave = { ...state, loading: false, floors: undefined, enemies: undefined };
        sessionStorage.setItem(SAVE_KEY, JSON.stringify(toSave));
      } catch (_) {}
    } else if (!state.player) {
      sessionStorage.removeItem(SAVE_KEY);
    }
  }, [state]);

  useEffect(() => {
    const isFirst = isFirstMount.current;
    isFirstMount.current = false;

    Promise.all([fetchDungeon(state.grade), fetchEnemies(state.grade)]).then(([floors, enemies]) => {
      dispatch({ type: 'INIT_DATA', floors, enemies });

      if (isFirst) {
        try {
          const saved = sessionStorage.getItem(SAVE_KEY);
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.player && parsed.screen !== 'MENU' && (parsed.grade || 9) === state.grade) {
              dispatch({ type: 'RESTORE_STATE', savedState: parsed, floors, enemies });
            }
          }
        } catch (_) {}
      }
    });
  }, [state.grade]);

  const handleGradeChange = (newGrade) => {
    if (newGrade === state.grade) return;
    if (state.player && state.screen !== 'MENU') {
      if (!window.confirm(`Schimbi clasa la ${GRADE_LABELS[newGrade]}. Progresul curent se va pierde. Continui?`)) return;
    }
    sessionStorage.removeItem(SAVE_KEY);
    dispatch({ type: 'SET_GRADE', grade: newGrade });
  };

  if (!state.floors.length) {
    return (
      <div id="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <div className="title-vt" style={{ fontSize: 40 }}>SYNTAX SORCERER</div>
        <div className="muted">Se încarcă dungeonul...</div>
      </div>
    );
  }

  return <Game state={state} dispatch={dispatch} onGradeChange={handleGradeChange} />;
}
