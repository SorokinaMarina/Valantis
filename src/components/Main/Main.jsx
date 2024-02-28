import "./Main.scss";
import PropTypes from "prop-types";
import PaginatedItems from "../PaginatedItems/PaginatedItems";

function Main({ productsPerPage, products, setItemOffset, itemOffset }) {
  return (
    <main className="main">
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
};

Main.defaultProps = {
  products: [],
};

export default Main;
