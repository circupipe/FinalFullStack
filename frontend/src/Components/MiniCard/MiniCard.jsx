import "./MiniCard.css";

export function MiniCard({ item, onClick, link }) {
  const content = (
    <div className="mini-card" onClick={onClick}>
      <div className="mini-card-img">
        <img src={item.image || "/public/tektrash.png"} alt={item.product} />
      </div>
      <div className="mini-card-text">
        <p className="mini-card-name">{item.product}</p>
        <p className="mini-card-price">${item.price}</p>
      </div>
    </div>
  );

  return link ? (
    <a href={link} className="mini-card-link">
      {content}
    </a>
  ) : (
    content
  );
}
