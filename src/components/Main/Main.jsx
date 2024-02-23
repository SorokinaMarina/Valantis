import "./Main.scss";
import PropTypes from "prop-types";

function Main({ products }) {
  const uniqueProducts = [];

  products.forEach((product) => {
    if (!uniqueProducts.some((p) => p.id === product.id)) {
      uniqueProducts.push(product);
    }
  });
  return (
    <main className="main">
      <section className="main__section">
        {uniqueProducts.map((product) => (
          <div key={product.id} className="main__container">
            <h2 className="main__title">{product.product}</h2>
            <div className="main__description">
              <p className="main__brand">
                {product.brand !== null ? `Бренд: ${product.brand}` : ""}
              </p>
              <p className="main__id">Id: {product.id}</p>
              <p className="main__price">{product.price} ₽</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

Main.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ),
};

Main.defaultProps = {
  products: [] || undefined,
};

export default Main;
