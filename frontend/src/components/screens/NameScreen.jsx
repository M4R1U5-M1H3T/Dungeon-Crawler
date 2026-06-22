import { useRef, useEffect } from 'react';

export default function NameScreen({ state, actions }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleConfirm = () => {
    const name = inputRef.current?.value?.trim();
    if (!name) return;
    actions.onConfirmName(name);
  };

  return (
    <div className="panel ta-c" style={{ margin: 'auto', maxWidth: 420, padding: '40px 24px' }}>
      <div style={{ fontSize: 64, marginBottom: 8 }}>⚔️</div>
      <div className="muted" style={{ letterSpacing: 2, marginBottom: 20 }}>ALEGE NUMELE TĂU DE LUPTĂ</div>
      <input
        ref={inputRef}
        className="btn"
        type="text"
        maxLength={20}
        placeholder="ex: PythonWizard"
        style={{ width: '100%', textAlign: 'center', fontSize: 16, padding: 12, marginBottom: 8, borderColor: 'var(--dim)' }}
        defaultValue={state.nameDraft}
        onChange={e => actions.onSetNameDraft(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') handleConfirm(); }}
      />
      <div style={{ fontSize: 12, minHeight: 18, color: 'var(--red)', marginBottom: 10 }}></div>
      <button className="btn amb full center" style={{ fontSize: 14 }} onClick={handleConfirm}>
        INTRĂ ÎN DUNGEON ▸
      </button>
    </div>
  );
}
