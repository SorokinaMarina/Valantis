import "./Main.scss";
import PropTypes from "prop-types";
import PaginatedItems from "../PaginatedItems/PaginatedItems";
import Button from "../Button/Button";
import Select from "../Select/Select";

function Main({
  productsPerPage,
  setItemOffset,
  itemOffset,
  setFilterPopup,
  setProductsPerPage,
}) {
  return (
    <main className="main">
      <div className="main__container">
        <Select
          productsPerPage={productsPerPage}
          setProductsPerPage={setProductsPerPage}
        />
        <Button text="Фильтры" setFilterPopup={setFilterPopup} />
      </div>
      <PaginatedItems
        productsPerPage={productsPerPage}
        setItemOffset={setItemOffset}
        itemOffset={itemOffset}
      />
    </main>
  );
}

Main.propTypes = {
  productsPerPage: PropTypes.number.isRequired,
  setItemOffset: PropTypes.func.isRequired,
  itemOffset: PropTypes.number.isRequired,
  setFilterPopup: PropTypes.func,
  setProductsPerPage: PropTypes.func,
};

Main.defaultProps = {
  setFilterPopup: () => {},
  setProductsPerPage: () => {},
};

export default Main;
