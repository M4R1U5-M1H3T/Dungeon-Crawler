const TOPIC_COLORS = {
  'variabile':'var(--g)','operatori':'var(--blu)','condiționale':'var(--amb)',
  'bucle':'var(--pur)','șiruri':'var(--red)','liste':'#ff8c00',
  'funcții':'var(--cyn)','dicționare':'#ff66cc','tupluri':'#aaaaff',
  'sortare':'#ffb347','cautare':'#7fd1ff','fisiere':'#c0a060',
  'stive_cozi':'#9d8cff','tablouri':'#66d9a6','matrici':'#6699ff',
  'recursivitate':'#ff7fa8','backtracking':'#d98cff','OOP':'#ffd700',
  'grafuri':'#5fe0c0',
  'scriere':'#bbbbbb','scriere_10':'#bbbbbb','scriere_11':'#bbbbbb',
};

export default function ChallengeWidget({ challenge, opts, showHint, onAnswer, onHint }) {
  if (!challenge) return null;
  const topicColor = TOPIC_COLORS[challenge.topic] || 'var(--g)';
  const stars = '⭐'.repeat(challenge.difficulty);

  return (
    <div>
      <div className="hbar" style={{ marginBottom: 7 }}>
        <span className="tag" style={{ color: topicColor }}>📚 {challenge.topic?.toUpperCase()} · {stars}</span>
        {!showHint && (
          <button className="btn" style={{ padding: '3px 10px', fontSize: 11 }} onClick={onHint}>
            💡 Hint (-50 pts)
          </button>
        )}
      </div>
      <div style={{ fontSize: 13, color: 'var(--txt)', marginBottom: 6 }}>{challenge.question}</div>
      {challenge.code && <pre className="code">{challenge.code}</pre>}
      {showHint && (
        <div className="info-box" style={{ marginBottom: 8, color: 'var(--cyn)' }}>
          💡 {challenge.hint}
        </div>
      )}
      <div className="grid2" style={{ marginTop: 6 }}>
        {opts.map((opt, i) => (
          <button
            key={i}
            className="btn"
            style={{ fontSize: 12, padding: '8px 10px', minHeight: 46, textAlign: 'left' }}
            onClick={() => onAnswer(opt)}
          >
            <span className="c-amb">{['A', 'B', 'C', 'D'][i]}.</span> {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
