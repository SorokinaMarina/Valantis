import PropTypes from "prop-types";
import "./Items.scss";

function Items({ currentItems }) {
  return (
    <div className="items">
      {currentItems &&
        currentItems.map((item) => (
          <li key={item.id} className="items__list">
            <h2 className="items__title">{item.product}</h2>
            <ul className="items__description">
              <li className="items__brand">
                {item.brand !== null
                  ? `Бренд: ${item.brand}`
                  : `Бренд отсутствует`}
              </li>
              <li className="items__id">Id: {item.id}</li>
              <li className="items__price">{item.price} ₽</li>
            </ul>
          </li>
        ))}
    </div>
  );
}

Items.propTypes = {
  currentItems: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ),
};

Items.defaultProps = {
  currentItems: [],
};

export default Items;
