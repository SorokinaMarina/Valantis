import React from "react";
import PropTypes from "prop-types";
import "./FilterList.scss";
import arrowDown from "../../image/downarrow_120663.svg";
import InputField from "../InputField/InputField";
import Radio from "../Radio/Radio";
import { BrandContext } from "../../contexts/BrandsContext";

function FilterList({
  text,
  type,
  id,
  placeholder,
  changeFilterMenuCondidtion,
  filterMenuVisible,
  setValues,
  name,
  values,
}) {
  const brands = React.useContext(BrandContext);

  return (
    <li className="list">
      <button
        type="button"
        className="list__button"
        onClick={() => {
          changeFilterMenuCondidtion(id);
        }}
      >
        <p className="list__text">{text}</p>
        <img src={arrowDown} alt="стрелка вниз" className="list__image" />
      </button>
      {filterMenuVisible[id] && id !== "inputBrand" && (
        <InputField
          setValues={setValues}
          type={type}
          id={id}
          placeholder={placeholder}
          inputName={name}
          values={values}
        />
      )}
      {filterMenuVisible[id] && id === "inputBrand" && (
        <ul className="list__brands">
          {brands.map((item) => (
            <Radio
              inputName={name}
              item={item}
              key={item}
              setValues={setValues}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

FilterList.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  changeFilterMenuCondidtion: PropTypes.func,
  filterMenuVisible: PropTypes.objectOf(PropTypes.bool).isRequired,
  setValues: PropTypes.func,
  name: PropTypes.string.isRequired,
  values: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
};

FilterList.defaultProps = {
  changeFilterMenuCondidtion: () => {},
  setValues: () => {},
  values: {},
};

export default FilterList;
