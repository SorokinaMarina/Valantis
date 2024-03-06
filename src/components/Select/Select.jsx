import "./Select.scss";
import PropTypes from "prop-types";
import { pageElementsCount } from "../../utils/constants/constants";

function Select({ productsPerPage, setProductsPerPage }) {
  function handleChange(e) {
    const { value } = e.target;

    setProductsPerPage(Number(value));
  }
  return (
    <fieldset className="select">
      <label htmlFor="select" className="select__label">
        Количество товаров на странице
        <select
          onChange={handleChange}
          className="select__select"
          name="select-page-count"
          value={"" || productsPerPage}
          id="select"
        >
          <option value="" className="select__option" key="select" hidden>
            {" "}
          </option>
          {pageElementsCount.map((num) => (
            <option className="select__option" value={num} key={num}>
              {num}
            </option>
          ))}{" "}
        </select>
      </label>
    </fieldset>
  );
}

Select.propTypes = {
  productsPerPage: PropTypes.number.isRequired,
  setProductsPerPage: PropTypes.func,
};

Select.defaultProps = {
  setProductsPerPage: () => {},
};

export default Select;
