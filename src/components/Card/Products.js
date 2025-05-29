import tracker from "../../lib/mixpanel";

const Product = ({ product }) => {
  const { id, name, tagline, ctaUrl } = product;
  return (
    <a
      rel="noreferrer"
      key={id}
      className="product-item"
      href={ctaUrl}
      target="_blank"
      onClick={() => tracker.track("OTHER_PRODUCTS", { name })}
    >
      <h4 className="product-title">{name}</h4>
      <div className="product-description">{tagline}</div>
    </a>
  );
};

export default Product;
