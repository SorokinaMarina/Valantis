import "./Main.scss";
import PropTypes from "prop-types";
import PaginatedItems from "../PaginatedItems/PaginatedItems";
import Button from "../Button/Button";

function Main({
  productsPerPage,
  products,
  setItemOffset,
  itemOffset,
  setFilterPopup,
}) {
  return (
    <main className="main">
      <Button text="Фильтры" setFilterPopup={setFilterPopup} />
      <PaginatedItems
        productsPerPage={productsPerPage}
        products={products}
        setItemOffset={setItemOffset}
        itemOffset={itemOffset}
      />
    </main>
  );
}

Main.propTypes = {
  productsPerPage: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ),
  setItemOffset: PropTypes.func.isRequired,
  itemOffset: PropTypes.number.isRequired,
  setFilterPopup: PropTypes.func,
};

Main.defaultProps = {
  products: [],
  setFilterPopup: () => {},
};

export default Main;
