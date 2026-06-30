import { getChapters } from '../../data/chapterContent.js';

const GRADE_INFO = {
  9:  { label: 'a 9-a',  subtitle: 'Bazele Python & Structuri Liniare' },
  10: { label: 'a 10-a', subtitle: 'Tablouri, Șiruri & Recursivitate' },
  11: { label: 'a 11-a', subtitle: 'Grafuri, Backtracking & OOP' },
};

const DUNGEON_FLOORS = {
  9:  ['Cripta Variabilelor', 'Labirintul Buclelor', 'Cavoul Algoritmilor', 'Sala Structurilor Liniare'],
  10: ['Tărâmul Șirurilor', 'Biblioteca Dicționarelor', 'Cetatea Matricilor', 'Abisul Recursivității'],
  11: ['Pădurea Grafurilor', 'Câmpul Backtracking', 'Cetatea OOP-ului', 'Sanctuarul Marelui Arhitect'],
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
        <div style={{ fontSize: 12, color: 'var(--dg)', textAlign: 'center', marginBottom: 22, lineHeight: 1.5 }}>
          {chapter.summary}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            className="btn full"
            style={{ fontSize: 13, padding: '12px 14px', textAlign: 'left' }}
            onClick={onLearn}
          >
            <div>📖 <strong>Învață</strong></div>
            <div style={{ fontSize: 11, color: 'var(--dg)', marginTop: 3 }}>
              Teorie, exemple și sintaxă din noua programă
            </div>
          </button>

          <button
            className="btn amb full"
            style={{ fontSize: 13, padding: '12px 14px', textAlign: 'left' }}
            onClick={onQuickQuiz}
          >
            <div>🎯 <strong>Quiz rapid</strong></div>
            <div style={{ fontSize: 11, color: 'var(--dg)', marginTop: 3 }}>
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
            <div>{isSelected ? '✓ Selectat pentru quiz personalizat' : '+ Adaugă la quiz personalizat'}</div>
            <div style={{ fontSize: 11, color: 'var(--dg)', marginTop: 3 }}>
              Selectează mai multe capitole, apoi pornește quiz-ul
            </div>
          </button>
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: 18, width: '100%', background: 'transparent',
            border: 'none', color: 'var(--dg)', fontSize: 12,
            cursor: 'pointer', fontFamily: 'inherit', padding: '6px 0',
          }}
        >
          ← Închide
        </button>
      </div>
    </div>
  );
}

export default function MenuScreen({ state, actions }) {
  const { grade, chapterModal, selectedTopics } = state;
  const chapters = getChapters(grade || 9);
  const info = GRADE_INFO[grade] || GRADE_INFO[9];
  const floors = DUNGEON_FLOORS[grade] || DUNGEON_FLOORS[9];
  const modalChapter = chapterModal ? chapters.find(c => c.id === chapterModal) : null;

  return (
    <div className="panel" style={{ maxWidth: 600, margin: 'auto' }}>
      <div className="title-vt">SYNTAX SORCERER</div>

      {/* Inline grade selector */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 4, marginBottom: 2 }}>
        <span className="tag" style={{ letterSpacing: 2 }}>CLASĂ</span>
        {[9, 10, 11].map(g => (
          <button
            key={g}
            onClick={() => actions.onGradeChange(g)}
            style={{
              background: grade === g ? 'rgba(255,179,0,0.15)' : 'transparent',
              border: `1px solid ${grade === g ? 'var(--amb)' : 'var(--brd)'}`,
              color: grade === g ? 'var(--amb)' : 'var(--dg)',
              borderRadius: 12,
              padding: '4px 14px',
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: 'inherit',
              letterSpacing: 1,
              minHeight: 32,
              transition: 'all 0.12s',
            }}
          >
            a {g}-a
          </button>
        ))}
      </div>
      <div className="tag" style={{ textAlign: 'center', marginBottom: 4, letterSpacing: 2 }}>
        {info.subtitle}
      </div>

      <hr className="hr" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
        <div className="tag" style={{ marginBottom: 2 }}>▸ CAPITOLE</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {chapters.map(ch => {
            const isSel = (selectedTopics || []).includes(ch.id);
            return (
              <button
                key={ch.id}
                className="chip-btn"
                onClick={() => actions.onOpenChapterModal(ch.id)}
                style={{
                  background: isSel ? 'rgba(0,255,65,0.1)' : 'transparent',
                  border: `1px solid ${isSel ? 'var(--g)' : 'var(--brd)'}`,
                  color: isSel ? 'var(--g)' : 'var(--txt)',
                  borderRadius: 14,
                  padding: '4px 12px',
                  fontSize: 12,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  transition: 'all 0.12s',
                }}
              >
                {ch.icon} {ch.name} {isSel && <span style={{ fontSize: 10 }}>✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {selectedTopics && selectedTopics.length > 0 && (
        <div style={{
          marginBottom: 10, padding: '10px 12px',
          background: 'rgba(0,255,65,0.05)',
          border: '1px solid var(--g)',
          borderRadius: 4,
          display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: 12, color: 'var(--g)', flex: 1 }}>
            {selectedTopics.length} capitol{selectedTopics.length > 1 ? 'e' : ''} selectat{selectedTopics.length > 1 ? 'e' : ''}
          </span>
          <button
            className="btn full center"
            style={{ fontSize: 12, padding: '6px 14px', borderColor: 'var(--g)', color: 'var(--g)' }}
            onClick={() => actions.onStartChapterQuiz(selectedTopics)}
          >
            🎯 Quiz personalizat
          </button>
          <button
            onClick={actions.onClearTopics}
            style={{
              background: 'transparent', border: 'none', color: 'var(--dg)',
              fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', padding: '4px 8px',
            }}
          >
            ✕ Șterge
          </button>
        </div>
      )}

      <hr className="hr" />

      <div style={{ marginBottom: 8 }}>
        <div className="tag" style={{ marginBottom: 6 }}>▸ ETAJE DUNGEON</div>
        <div className="grid2">
          {floors.map((name, i) => (
            <div key={i} className="info-box" style={{ fontSize: 11 }}>
              <span className="c-amb">Etaj {i + 1}</span> · {name}
            </div>
          ))}
        </div>
      </div>

      <hr className="hr" />

      <div className="flex-col">
        <button className="btn amb full center" style={{ fontSize: 16, padding: '14px' }} onClick={actions.onStart}>
          ⚔️ JOACĂ ACUM
        </button>
        <button className="btn full center" onClick={actions.onHowTo}>
          📖 CUM SE JOACĂ
        </button>
      </div>

      <div className="credits-foot">
        <button className="credits-link" onClick={actions.onGotoCredits}>
          ✦ Generic &amp; Credits
        </button>
        <span>Creat de <strong>Marius-Stefan Mihet</strong> · UBB, Computer Science (EN)</span>
      </div>

      {modalChapter && (
        <ChapterModal
          chapter={modalChapter}
          isSelected={(selectedTopics || []).includes(modalChapter.id)}
          onLearn={() => actions.onGotoLearn(modalChapter.id)}
          onQuickQuiz={() => actions.onStartChapterQuiz([modalChapter.id])}
          onToggle={() => actions.onToggleTopic(modalChapter.id)}
          onClose={actions.onCloseChapterModal}
        />
      )}
    </div>
  );
}
