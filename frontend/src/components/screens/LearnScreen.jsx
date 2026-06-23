import { useState } from 'react';
import { getChapter, getChapters } from '../../data/chapterContent.js';

function CodeBlock({ code }) {
  return (
    <pre style={{
      background: 'var(--bg)',
      border: '1px solid var(--dg)',
      borderRadius: 6,
      padding: '10px 14px',
      fontSize: 12,
      lineHeight: 1.7,
      overflowX: 'auto',
      margin: '8px 0 0 0',
      color: 'var(--txt)',
    }}>
      <code>{code}</code>
    </pre>
  );
}

function Section({ s, idx }) {
  const [open, setOpen] = useState(idx === 0);
  return (
    <div style={{ borderBottom: '1px solid var(--dg)', marginBottom: 4 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none',
          color: open ? 'var(--amb)' : 'var(--txt)',
          textAlign: 'left', padding: '10px 4px',
          cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', fontSize: 13, fontWeight: open ? 'bold' : 'normal',
          fontFamily: 'inherit',
        }}
      >
        <span>{s.title}</span>
        <span style={{ fontSize: 11, color: 'var(--dg)' }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div style={{ padding: '0 4px 12px', fontSize: 13 }}>
          <p style={{ color: 'var(--txt)', marginBottom: s.code ? 4 : 0, lineHeight: 1.6 }}>{s.body}</p>
          {s.code && <CodeBlock code={s.code} />}
        </div>
      )}
    </div>
  );
}

export default function LearnScreen({ state, actions }) {
  const { learnTopic, grade } = state;
  const chapter = getChapter(learnTopic);
  const allChapters = getChapters(grade);
  const currentIdx = allChapters.findIndex(c => c.id === learnTopic);

  if (!chapter) {
    return (
      <div className="panel ta-c" style={{ margin: 'auto', maxWidth: 560, padding: '40px 24px' }}>
        <p className="muted">Capitol negăsit.</p>
        <button className="btn" onClick={actions.onCloseLearn}>← Înapoi</button>
      </div>
    );
  }

  const prevCh = currentIdx > 0 ? allChapters[currentIdx - 1] : null;
  const nextCh = currentIdx < allChapters.length - 1 ? allChapters[currentIdx + 1] : null;

  return (
    <div style={{ maxWidth: 680, margin: 'auto', padding: '24px 16px 60px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button
          className="btn"
          onClick={actions.onCloseLearn}
          style={{ padding: '5px 12px', fontSize: 12 }}
        >
          ← Meniu
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: 2 }}>LECȚIE · CLASA A {grade}-A</div>
          <div style={{ fontSize: 22, fontWeight: 'bold', color: 'var(--amb)' }}>
            {chapter.icon} {chapter.name}
          </div>
        </div>
      </div>

      <div className="info-box" style={{ marginBottom: 20, fontSize: 13, color: 'var(--txt)' }}>
        {chapter.summary}
      </div>

      <div className="panel" style={{ padding: '4px 16px 8px', marginBottom: 20 }}>
        {chapter.sections.map((s, i) => (
          <Section key={i} s={s} idx={i} />
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {prevCh && (
            <button
              className="btn"
              onClick={() => actions.onGotoLearn(prevCh.id)}
              style={{ fontSize: 12 }}
            >
              ← {prevCh.icon} {prevCh.name}
            </button>
          )}
          {nextCh && (
            <button
              className="btn"
              onClick={() => actions.onGotoLearn(nextCh.id)}
              style={{ fontSize: 12 }}
            >
              {nextCh.icon} {nextCh.name} →
            </button>
          )}
        </div>
        <button
          className="btn amb"
          onClick={() => actions.onStartChapterQuiz([learnTopic])}
          style={{ fontSize: 13, padding: '7px 18px' }}
        >
          🎯 Quiz din {chapter.name}
        </button>
      </div>
    </div>
  );
}
