/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./FilterList.scss";
import { v4 as uuidv4 } from "uuid";
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
  const [values, setValues] = useState([]);

  useEffect(() => {
    setValues(() => {
      if (brands) {
        const newObj = brands.map((item) => ({
          name: item,
          checked: false,
          id: uuidv4(),
          disabled: false,
        }));
        return newObj;
      }

      return [];
    });
  }, [brands]);

  function filteredCheckboxValues() {
    const anyTrue = values.some((item) => item.checked === true);
    const newValues = values.reduce((acc, key) => {
      if (key.checked) {
        acc[key] = key;
      } else if (anyTrue) {
        acc[key].checked = false;
        acc[key].disabled = true;
      } else {
        acc[key].disabled = false;
      }

      return acc;
    }, {});

    console.log(newValues);
  }

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
          {values.map((item) => (
            <Checkbox
              values={values}
              value={item}
              key={item.id}
              setValues={setValues}
              filteredCheckboxValues={() => {
                filteredCheckboxValues();
              }}
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
};

FilterList.defaultProps = {
  changeFilterMenuCondidtion: () => {},
};

export default FilterList;
