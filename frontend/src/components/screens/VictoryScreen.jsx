import { getChapters } from '../../data/chapterContent.js';

function computeGrade(correct, total) {
  if (!total) return 1;
  return Math.max(1, Math.min(10, Math.round((correct / total) * 9 + 1)));
}

function getWeakTopics(topicStats, grade) {
  const chapters = getChapters(grade);
  return chapters
    .filter(ch => {
      const s = topicStats[ch.id];
      return s && s.total >= 2 && (s.correct / s.total) < 0.7;
    })
    .sort((a, b) => {
      const ra = (topicStats[a.id].correct / topicStats[a.id].total);
      const rb = (topicStats[b.id].correct / topicStats[b.id].total);
      return ra - rb;
    });
}

export default function VictoryScreen({ state, actions }) {
  const { player, questionsCorrect, questionsTotal, topicStats, grade } = state;
  const nota = computeGrade(questionsCorrect, questionsTotal);
  const weakTopics = getWeakTopics(topicStats || {}, grade || 9);

  return (
    <div className="panel ta-c" style={{ margin: 'auto', maxWidth: 500, padding: '40px 24px' }}>
      <div className="title-vt" style={{ color: 'var(--amb)' }}>VICTORIE!</div>
      <div className="sprite c-amb">🏆</div>
      <div style={{ fontSize: 14, margin: '12px 0' }}>
        <p className="c-g">{player.name} a cucerit Dungeonul Python!</p>
        <p className="muted">Marele Maestru al Sintaxei a fost nimicit.</p>
      </div>

      <div className="info-box" style={{ marginBottom: 16, textAlign: 'left' }}>
        <div>📝 Notă finală: <span className="c-amb" style={{fontSize: 18, fontWeight: 'bold' }}>{nota}/10</span> <span className="muted" style={{ fontSize: 12 }}>({questionsCorrect}/{questionsTotal} corecte)</span></div>
        <div>🏆 Scor final: <span className="c-amb">{player.score}</span></div>
        <div>⚔️ Nivel final: <span className="c-amb">{player.level}</span></div>
        <div>💰 Aur total: <span className="c-amb">{player.gold}</span></div>
      </div>

      {weakTopics.length > 0 && (
        <div style={{
          marginBottom: 16, padding: '12px 14px',
          background: 'rgba(255,180,0,0.07)',
          border: '1px solid var(--amb)',
          borderRadius: 8, textAlign: 'left',
        }}>
          <div style={{ fontSize: 12, color: 'var(--amb)', fontWeight: 'bold', marginBottom: 8 }}>
            📈 Mai ai de lucru la:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
            {weakTopics.map(ch => {
              const s = topicStats[ch.id];
              const pct = Math.round(s.correct / s.total * 100);
              return (
                <span key={ch.id} style={{
                  fontSize: 11, background: 'var(--bg)',
                  border: '1px solid var(--dg)', borderRadius: 12,
                  padding: '3px 10px', color: 'var(--txt)',
                }}>
                  {ch.icon} {ch.name} <span style={{ color: 'var(--amb)' }}>{pct}%</span>
                </span>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              className="btn full"
              style={{ fontSize: 12, padding: '6px 12px', flex: 1 }}
              onClick={() => actions.onGotoLearn(weakTopics[0].id)}
            >
              📖 Studiază {weakTopics[0].icon} {weakTopics[0].name}
            </button>
            <button
              className="btn amb full"
              style={{ fontSize: 12, padding: '6px 12px', flex: 1 }}
              onClick={() => actions.onStartWeakQuiz(weakTopics.map(c => c.id))}
            >
              🎯 Exersează capitolele slabe
            </button>
          </div>
        </div>
      )}

      <button className="btn amb full center" style={{ fontSize: 14 }} onClick={actions.onRestart}>
        ↺ JOACĂ DIN NOU
      </button>
      <button
        className="btn full center"
        style={{ fontSize: 13, marginTop: 8 }}
        onClick={actions.onGotoCredits}
      >
        🎬 Vezi genericul (After Credits)
      </button>
    </div>
  );
}

