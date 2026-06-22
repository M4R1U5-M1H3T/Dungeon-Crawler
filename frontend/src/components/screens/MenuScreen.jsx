export default function MenuScreen({ actions }) {
  return (
    <div className="panel ta-c" style={{ margin: 'auto', maxWidth: 580, padding: '40px 24px' }}>
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
        <span className="tag">📚 Programa cls. a 9-a · Informatică Python</span><br />
        Capitole: Variabile · Operatori · Condiționali · Bucle · Șiruri · Liste · Funcții · Dicționare · Tupluri · Scriere
      </div>
      <div className="flex-col" style={{ alignItems: 'center', gap: 10 }}>
        <button className="btn amb center" style={{ width: 220, fontSize: 15 }} onClick={actions.onStart}>▸ JOACĂ ACUM</button>
        <button className="btn center" style={{ width: 220 }} onClick={actions.onHowTo}>? CUM SE JOACĂ</button>
      </div>
    </div>
  );
}
