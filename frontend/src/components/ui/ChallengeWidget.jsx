const TOPIC_COLORS = {
  'variabile':'var(--g)','operatori':'var(--blu)','condiționale':'var(--amb)',
  'bucle':'var(--pur)','șiruri':'var(--red)','liste':'#ff8c00',
  'funcții':'var(--cyn)','dicționare':'#ff66cc','tupluri':'#aaaaff',
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
