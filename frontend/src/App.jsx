import { useReducer, useEffect } from 'react';
import { gameReducer } from './game/gameReducer.js';
import { makeInitialState } from './game/initialState.js';
import { fetchDungeon, fetchEnemies } from './api/gameApi.js';
import Game from './Game.jsx';

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, null, makeInitialState);

  useEffect(() => {
    Promise.all([fetchDungeon(), fetchEnemies()]).then(([floors, enemies]) => {
      dispatch({ type: 'INIT_DATA', floors, enemies });
    });
  }, []);

  if (!state.floors.length) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column', gap: 16 }}>
        <div className="title-vt" style={{ fontSize: 40 }}>SYNTAX SORCERER</div>
        <div className="muted">Se încarcă dungeonul...</div>
      </div>
    );
  }

  return <Game state={state} dispatch={dispatch} />;
}
