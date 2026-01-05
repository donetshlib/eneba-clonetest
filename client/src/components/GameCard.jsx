export default function GameCard({ g }) {
  const base = import.meta.env.BASE_URL;
  const href = `${base}game.html?id=${g.id}`;
  const placeholder = `${base}game-placeholder.png`;

  const price = Number(g.price_eur ?? 0).toFixed(2);
  const cashback = Number(g.cashback_eur ?? 0).toFixed(2);
  const discount = g.discount_percent ? `-${g.discount_percent}%` : null;

   return (
    <a className="cardLink" href={href}>
      <div className="card">
        <div className="coverWrap">
          <img
            className="cover"
            src={g.image_url || placeholder}
            alt={g.title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = placeholder;
            }}
          />

          <div className="badges">
            <span className="badge">{g.platform}</span>
            <span className="badge muted">{g.region}</span>
          </div>
        </div>

        <div className="cardBody">
          <div className="title">{g.title}</div>

          <div className="metaRow">
            <span className="discount">{discount ?? "—"}</span>
            <span className="cashback">Cashback €{cashback}</span>
          </div>

          <div className="priceRow">
            <div className="price">€{price}</div>
          </div>
        </div>
      </div>
    </a>
  );
}
