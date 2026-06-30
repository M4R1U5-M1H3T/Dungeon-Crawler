import { useState } from 'react';

/* Minecraft-style "after credits" roll. The text scrolls slowly upward and
   loops forever; the player can speed it up, pause it, or return to the menu. */

const CREDITS = [
  { kind: 'logo',    text: '⚔️ SYNTAX SORCERER' },
  { kind: 'tagline', text: 'Dungeon Crawler · Python Edition' },
  { kind: 'gap' },
  { kind: 'gap' },
  { kind: 'role',    text: 'Creat de' },
  { kind: 'name',    text: 'Marius-Stefan Mihet' },
  { kind: 'sub',     text: 'Student · Universitatea Babeș-Bolyai (UBB)' },
  { kind: 'sub',     text: 'Informatică în limba engleză (Computer Science in English)' },
  { kind: 'gap' },
  { kind: 'gap' },
  { kind: 'role',    text: 'Concept & Game Design' },
  { kind: 'name',    text: 'Marius-Stefan Mihet' },
  { kind: 'gap' },
  { kind: 'role',    text: 'Programare (Frontend & Backend)' },
  { kind: 'name',    text: 'Marius-Stefan Mihet' },
  { kind: 'gap' },
  { kind: 'role',    text: 'Conținut educațional' },
  { kind: 'name',    text: 'Aliniat programei MEN de Informatică' },
  { kind: 'sub',     text: 'Clasele a IX-a, a X-a și a XI-a' },
  { kind: 'gap' },
  { kind: 'gap' },
  { kind: 'role',    text: 'Curriculum — Clasa a IX-a' },
  { kind: 'sub',     text: 'Variabile · Operatori · Condiționale · Bucle' },
  { kind: 'sub',     text: 'Liste · Funcții · Sortare · Căutare' },
  { kind: 'sub',     text: 'Fișiere · Stive & Cozi' },
  { kind: 'gap' },
  { kind: 'role',    text: 'Curriculum — Clasa a X-a' },
  { kind: 'sub',     text: 'Șiruri · Dicționare · Tupluri' },
  { kind: 'sub',     text: 'Tablouri · Matrici · Recursivitate' },
  { kind: 'gap' },
  { kind: 'role',    text: 'Curriculum — Clasa a XI-a' },
  { kind: 'sub',     text: 'Backtracking · Grafuri (BFS & DFS) · OOP' },
  { kind: 'gap' },
  { kind: 'gap' },
  { kind: 'role',    text: 'Mulțumiri speciale' },
  { kind: 'sub',     text: 'Profesorilor de informatică' },
  { kind: 'sub',     text: 'și tuturor elevilor care învață Python' },
  { kind: 'gap' },
  { kind: 'gap' },
  { kind: 'role',    text: 'Realizat cu' },
  { kind: 'sub',     text: 'React · Vite · Node.js · Express' },
  { kind: 'gap' },
  { kind: 'gap' },
  { kind: 'tagline', text: 'Mulțumim că ai jucat!' },
  { kind: 'name',    text: '🏆 The End 🏆' },
  { kind: 'gap' },
  { kind: 'sub',     text: '© ' + new Date().getFullYear() + ' Marius-Stefan Mihet' },
  { kind: 'gap' },
  { kind: 'gap' },
  { kind: 'gap' },
];

function Line({ item }) {
  if (item.kind === 'gap') return <div style={{ height: 30 }} />;
  const styles = {
    logo:    { fontSize: 30, fontWeight: 'bold', color: 'var(--amb)', letterSpacing: 2, textShadow: '0 0 14px rgba(255,179,0,0.6)' },
    tagline: { fontSize: 14, color: 'var(--dg)', letterSpacing: 2 },
    role:    { fontSize: 12, color: 'var(--dg)', letterSpacing: 3, textTransform: 'uppercase', opacity: 0.85 },
    name:    { fontSize: 20, fontWeight: 'bold', color: 'var(--g)', textShadow: '0 0 10px rgba(0,255,65,0.5)' },
    sub:     { fontSize: 13, color: 'var(--txt)' },
  };
  return <div style={{ ...styles[item.kind], lineHeight: 1.6, margin: '2px 0' }}>{item.text}</div>;
}

export default function CreditsScreen({ actions }) {
  const [speed, setSpeed] = useState(1);
  const [paused, setPaused] = useState(false);
  // Higher speed -> shorter duration. Base ~38s for a full pass.
  const duration = 38 / speed;

  return (
    <div
      className="panel"
      style={{
        margin: 'auto', maxWidth: 560, width: '100%',
        height: 'min(78vh, 620px)', padding: 0,
        position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse 120% 80% at 50% 120%, #04140a 0%, var(--pan) 60%)',
      }}
    >
      {/* fade masks top & bottom */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 70, zIndex: 3,
        background: 'linear-gradient(var(--pan), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 90, zIndex: 3,
        background: 'linear-gradient(transparent, var(--pan))', pointerEvents: 'none' }} />

      {/* scrolling roll */}
      <div
        className="credits-roll"
        style={{
          position: 'absolute', left: 0, right: 0, top: 0,
          textAlign: 'center', padding: '0 24px',
          animationDuration: duration + 's',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {CREDITS.map((item, i) => <Line key={i} item={item} />)}
      </div>

      {/* controls */}
      <div style={{
        position: 'absolute', bottom: 14, left: 0, right: 0, zIndex: 4,
        display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', padding: '0 16px',
      }}>
        <button className="btn" style={{ fontSize: 12, padding: '6px 12px' }} onClick={() => setPaused(p => !p)}>
          {paused ? '▶ Redă' : '⏸ Pauză'}
        </button>
        <button
          className="btn"
          style={{ fontSize: 12, padding: '6px 12px' }}
          onClick={() => setSpeed(s => (s >= 4 ? 1 : s * 2))}
        >
          ⏩ Viteză ×{speed}
        </button>
        <button className="btn amb" style={{ fontSize: 12, padding: '6px 12px' }} onClick={actions.onMenu}>
          ← Meniu principal
        </button>
      </div>
    </div>
  );
}
