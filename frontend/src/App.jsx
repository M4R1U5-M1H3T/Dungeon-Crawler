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

  const showDropdown = true; 

  if (!state.floors.length) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column', gap: 16 }}>
        <div className="title-vt" style={{ fontSize: 40 }}>SYNTAX SORCERER</div>
        <div className="muted">Se încarcă dungeonul...</div>
        {showDropdown && (
          <div style={{ position: 'fixed', top: 12, right: 12 }}>
            <GradeDropdown grade={state.grade} onChange={handleGradeChange} />
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div style={{ position: 'fixed', top: 12, right: 12, zIndex: 9999 }}>
        <GradeDropdown grade={state.grade} onChange={handleGradeChange} />
      </div>
      <Game state={state} dispatch={dispatch} />
    </>
  );
}

function GradeDropdown({ grade, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ fontSize: 11, color: 'var(--amb)', userSelect: 'none', letterSpacing: 1 }}>CLASĂ</span>
      <select
        value={grade}
        onChange={e => onChange(parseInt(e.target.value))}
        style={{
          background: 'var(--panel)',
          color: 'var(--amb)',
          border: '1px solid var(--amb)',
          borderRadius: 4,
          padding: '4px 10px',
          fontSize: 13,
          cursor: 'pointer',
          fontFamily: 'inherit',
          outline: 'none',
        }}
      >
        <option value={9}>a 9-a</option>
        <option value={10}>a 10-a</option>
        <option value={11}>a 11-a</option>
      </select>
    </div>
  );
}
