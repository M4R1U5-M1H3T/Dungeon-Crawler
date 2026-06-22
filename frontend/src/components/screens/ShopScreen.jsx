import HUD from '../ui/HUD.jsx';

function ShopRow({ name, desc, action, cost, gold }) {
  return (
    <div className="hbar">
      <div>
        <div className="c-amb">{name}</div>
        <div className="muted">{desc}</div>
      </div>
      <button className="btn center" onClick={action} disabled={gold < cost} style={{ minWidth: 120 }}>
        {cost} 💰
      </button>
    </div>
  );
}

export default function ShopScreen({ state, actions }) {
  const { player: p, shopMsg } = state;
  return (
    <>
      <HUD player={p} floor={state.floor} />
      <div className="panel">
        <div className="title-vt" style={{ fontSize: 36, textAlign: 'center' }}>🛒 MAGAZIN</div>
        <hr className="hr" />
        <div className="flex-col">
          <ShopRow name="🧪 Poțiune de Sănătate" desc="Recuperare 40 HP" action={actions.onBuyPotion} cost={15} gold={p.gold} />
          <hr className="hr" />
          <ShopRow name="💙 Cristal de Mana" desc="Recuperare 30 MP" action={actions.onBuyMana} cost={20} gold={p.gold} />
          <hr className="hr" />
          <ShopRow name="📖 Tomul Înțelepciunii" desc="+50 XP" action={actions.onBuyXP} cost={25} gold={p.gold} />
          <hr className="hr" />
          <ShopRow name="🛡️ Amuleta HP" desc="+20 Max HP permanent" action={actions.onBuyMaxHP} cost={40} gold={p.gold} />
        </div>
        <hr className="hr" />
        {shopMsg && <div className="info-box" style={{ marginBottom: 10 }}>{shopMsg}</div>}
        <button className="btn full center" onClick={actions.onCloseShop}>← CONTINUĂ AVENTURA</button>
      </div>
    </>
  );
}
