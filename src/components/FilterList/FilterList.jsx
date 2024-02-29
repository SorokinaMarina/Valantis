/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import "./FilterList.scss";
import arrowDown from "../../image/downarrow_120663.svg";
import InputField from "../InputField/InputField";
import Checkbox from "../Checkbox/Checkbox";
import { BrandContext } from "../../contexts/BrandsContext";

function FilterList({
  text,
  type,
  id,
  placeholder,
  changeFilterMenuCondidtion,
  filterMenuVisible,
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
        <InputField type={type} id={id} placeholder={placeholder} />
      )}
      {filterMenuVisible[id] && id === "inputBrand" && (
        <ul className="list__brands">
          {brands.map((item, index) => (
            <Checkbox text={item} key={index} id={index} />
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
};

FilterList.defaultProps = {
  changeFilterMenuCondidtion: () => {},
};

export default FilterList;
