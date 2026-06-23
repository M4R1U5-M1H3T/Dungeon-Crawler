import { getChapters } from '../../data/chapterContent.js';

const GRADE_INFO = {
  9:  { label: 'a 9-a',  subtitle: 'Bazele Python' },
  10: { label: 'a 10-a', subtitle: 'Structuri de Date & Algoritmi' },
  11: { label: 'a 11-a', subtitle: 'Algoritmi Avansați & OOP' },
};

const DUNGEON_FLOORS = {
  9:  ['Cripta Variabilelor', 'Labirintul Buclelor', 'Citadela Erorii', 'Sala Scriptorilor'],
  10: ['Tărâmul Tablourilor', 'Cetatea Matricilor', 'Abisul Algoritmilor', 'Fortăreața Fișierelor'],
  11: ['Labirintul Recursivității', 'Câmpul Backtracking', 'Citadela Structurilor', 'Cetatea OOP-ului'],
};

function ChapterModal({ chapter, isSelected, onLearn, onQuickQuiz, onToggle, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
        zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="panel"
        style={{ width: '100%', maxWidth: 380, padding: '28px 22px' }}
      >
        <div style={{ fontSize: 36, textAlign: 'center', marginBottom: 6 }}>{chapter.icon}</div>
        <div style={{ fontSize: 20, fontWeight: 'bold', color: 'var(--amb)', textAlign: 'center', marginBottom: 4 }}>
          {chapter.name}
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginBottom: 22, lineHeight: 1.5 }}>
          {chapter.summary}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            className="btn full"
            style={{ fontSize: 13, padding: '12px 14px', textAlign: 'left' }}
            onClick={onLearn}
          >
            <div>📖 <strong>Învață</strong></div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>
              Teorie, exemple și sintaxă din noua programă
            </div>
          </button>

          <button
            className="btn amb full"
            style={{ fontSize: 13, padding: '12px 14px', textAlign: 'left' }}
            onClick={onQuickQuiz}
          >
            <div>🎯 <strong>Quiz rapid</strong></div>
            <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.5)', marginTop: 3 }}>
              Joc complet doar din {chapter.name}
            </div>
          </button>

          <button
            className="btn full"
            style={{
              fontSize: 13, padding: '12px 14px', textAlign: 'left',
              borderColor: isSelected ? 'var(--g)' : 'var(--dg)',
              color: isSelected ? 'var(--g)' : 'var(--txt)',
            }}
            onClick={onToggle}
          >
            <div>{isSelected ? '✓' : '+'} <strong>{isSelected ? 'Elimină din selecție' : 'Adaugă la quiz personalizat'}</strong></div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>
              Combină mai multe capitole într-un singur quiz
            </div>
          </button>
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: 18, width: '100%', background: 'none', border: 'none',
            color: 'var(--dg)', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit',
            padding: '4px',
          }}
        >
          × Închide
        </button>
      </div>
    </div>
  );
}

export default function MenuScreen({ state, actions }) {
  const grade = (state && state.grade) || 9;
  const info = GRADE_INFO[grade] || GRADE_INFO[9];
  const floors = DUNGEON_FLOORS[grade] || [];
  const chapters = getChapters(grade);
  const selectedTopics = state.selectedTopics || [];
  const chapterModal = state.chapterModal;
  const modalChapter = chapterModal ? chapters.find(c => c.id === chapterModal) : null;

  return (
    <div className="panel ta-c" style={{ margin: 'auto', maxWidth: 600, padding: '36px 24px' }}>
      <div className="title-vt">SYNTAX SORCERER</div>
      <div className="muted" style={{ letterSpacing: 3, marginBottom: 20 }}>▸ DUNGEON CRAWLER · PYTHON EDITION ◂</div>

      <pre className="muted" style={{ fontSize: 10, lineHeight: 1.5, marginBottom: 20 }}>
{`╔══════════════════════════════════════╗
║  Explorează dungeonurile pythoniste  ║
║  Sparge bug-uri cu cod corect        ║
║  Înfruntă inamicii cu logică pură   ║
╚══════════════════════════════════════╝`}
      </pre>

      <div className="info-box" style={{ textAlign: 'left', marginBottom: 20 }}>
        <div style={{ marginBottom: 8 }}>
          <span className="tag">📚 Programa cls. {info.label} · {info.subtitle}</span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 12 }}>
          {floors.map((f, i) => (
            <span key={i}>🏰 {f}{i < floors.length - 1 ? '  ' : ''}</span>
          ))}
        </div>

        <div style={{ fontSize: 11, color: 'var(--amb)', marginBottom: 7, letterSpacing: 1, fontWeight: 'bold' }}>
          CAPITOLE — apasă pentru a explora:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {chapters.map(ch => {
            const sel = selectedTopics.includes(ch.id);
            return (
              <button
                key={ch.id}
                onClick={() => actions.onOpenChapterModal(ch.id)}
                style={{
                  background: sel ? 'var(--g)' : 'var(--bg)',
                  color: sel ? '#000' : 'var(--txt)',
                  border: `1px solid ${sel ? 'var(--g)' : 'var(--dg)'}`,
                  borderRadius: 16,
                  padding: '5px 13px',
                  fontSize: 12,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <span>{ch.icon}</span>
                <span>{ch.name}</span>
                {sel && <span style={{ fontSize: 10 }}>✓</span>}
              </button>
            );
          })}
        </div>

        {selectedTopics.length > 0 && (
          <div style={{
            marginTop: 12, padding: '10px 12px',
            background: 'rgba(0,200,80,0.07)',
            border: '1px solid var(--g)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: 12, color: 'var(--g)', flex: 1 }}>
              ✓ {selectedTopics.length} capitol{selectedTopics.length > 1 ? 'e' : ''} selectat{selectedTopics.length > 1 ? 'e' : ''}
            </span>
            <button
              className="btn amb"
              style={{ padding: '5px 14px', fontSize: 12 }}
              onClick={() => actions.onStartChapterQuiz(selectedTopics)}
            >
              🎯 Quiz personalizat
            </button>
            <button
              onClick={actions.onClearTopics}
              style={{ background: 'none', border: 'none', color: 'var(--dg)', cursor: 'pointer', fontSize: 11, fontFamily: 'inherit', padding: 0 }}
            >
              × Golește
            </button>
          </div>
        )}
      </div>

      <div className="flex-col" style={{ alignItems: 'center', gap: 10 }}>
        <button className="btn amb center" style={{ width: 220, fontSize: 15 }} onClick={actions.onStart}>
          ▸ JOACĂ ACUM
        </button>
        <button className="btn center" style={{ width: 220 }} onClick={actions.onHowTo}>
          ? CUM SE JOACĂ
        </button>
      </div>

      {modalChapter && (
        <ChapterModal
          chapter={modalChapter}
          isSelected={selectedTopics.includes(chapterModal)}
          onLearn={() => actions.onGotoLearn(chapterModal)}
          onQuickQuiz={() => actions.onStartChapterQuiz([chapterModal])}
          onToggle={() => actions.onToggleTopic(chapterModal)}
          onClose={actions.onCloseChapterModal}
        />
      )}
    </div>
  );
}
