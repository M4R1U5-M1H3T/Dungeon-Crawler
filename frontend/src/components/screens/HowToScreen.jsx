export default function HowToScreen({ actions }) {
  return (
    <div className="panel" style={{ maxWidth: 580, margin: 'auto' }}>
      <div className="title-vt" style={{ fontSize: 40 }}>CUM SE JOACĂ</div>
      <hr className="hr" />
      <div className="flex-col" style={{ fontSize: 13, lineHeight: 1.9 }}>
        <p>⚔️ <span className="c-amb">ATACĂ</span> – Răspunde corect la o întrebare Python pentru a lovi inamicul.</p>
        <p>🔮 <span className="c-pur">VRAJĂ</span> – Costă <b>20 MP</b> dar face mai mult damage. Streak-ul crește daunele!</p>
        <p>🧪 <span className="c-g">POȚIUNE</span> – Recuperează <b>40 HP</b>. Poți cumpăra mai multe din magazin.</p>
        <p>🏃 <span className="c-red">FUGĂ</span> – 20% șansă de reușită. <b>Nu funcționează împotriva boss-urilor!</b></p>
        <p>🚪 <span className="c-blu">UȘI MC</span> – Alege răspunsul corect. Eroarea costă HP!</p>
        <p>✍️ <span className="c-cyn">UȘI SCRIERE</span> – Scrie cod Python corect. Hint costă <b>10 💰</b>!</p>
        <p>💡 <span className="muted">HINT MC</span> – Penalizare <b>-50 scor</b>. Hint SCRIERE – costă <b>10 💰 aur</b>.</p>
        <p>🔥 <span className="c-amb">STREAK</span> – Răspunsuri consecutive corecte cresc damage-ul și scorul!</p>
      </div>
      <hr className="hr" />
      <div className="grid3">
        <div className="info-box ta-c">⭐<br /><span className="muted">Ușor</span></div>
        <div className="info-box ta-c">⭐⭐<br /><span className="muted">Mediu</span></div>
        <div className="info-box ta-c">⭐⭐⭐<br /><span className="muted">Greu</span></div>
      </div>
      <hr className="hr" />
      <button className="btn full center" onClick={actions.onMenu}>← ÎNAPOI LA MENIU</button>
    </div>
  );
}
