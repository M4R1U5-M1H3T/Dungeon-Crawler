export default function ChallengeWriteWidget({ challenge, showHint, writeAnswer, onAnswer, onHint, onSetWriteAnswer, canAffordHint }) {
  if (!challenge) return null;
  const stars = '⭐'.repeat(challenge.difficulty);

  return (
    <div>
      <div className="hbar" style={{ marginBottom: 7 }}>
        <span className="tag" style={{ color: 'var(--cyn)' }}>✍️ SCRIERE COD · {stars}</span>
        {!showHint && (
          <button
            className="btn"
            style={{ padding: '3px 10px', fontSize: 11 }}
            disabled={!canAffordHint}
            title={canAffordHint ? '' : 'Nu ai destul aur!'}
            onClick={onHint}
          >
            💡 Hint (-10 💰)
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
      <div className="flex-col" style={{ marginTop: 8, gap: 6 }}>
        <input
          className="write-input"
          type="text"
          placeholder="Scrie codul Python corect…"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          value={writeAnswer}
          autoFocus
          onChange={e => onSetWriteAnswer(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') onAnswer(writeAnswer); }}
        />
        <button
          className="btn full center"
          style={{ borderColor: 'var(--cyn)', color: 'var(--cyn)' }}
          onClick={() => onAnswer(writeAnswer)}
        >
          ▸ TRIMITE RĂSPUNS
        </button>
      </div>
    </div>
  );
}
