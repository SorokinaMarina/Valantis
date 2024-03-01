/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import "./Checkbox.scss";
import React from "react";
import PropTypes from "prop-types";

function Checkbox({ values, value, setValues, filteredCheckboxValues }) {
  function handleChange(e) {
    const { id, checked } = e.target;

    const updatedValues = values.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked,
        };
      }
      return item;
    });

    setValues(updatedValues);
  }
  return (
    <li className="checkbox">
      <fieldset className="checkbox__fieldset">
        <label htmlFor="checkbox" className="checkbox__label">
          <input
            name={value.name}
            checked={value.checked}
            type="checkbox"
            id={value.id}
            className="checkbox__input"
            onChange={handleChange}
            disabled={value.disabled}
            onClick={filteredCheckboxValues}
          />
          <span className="checkbox__span">{value.name}</span>
        </label>
      </fieldset>
    </li>
  );
}

Checkbox.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
  ),
  value: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  ),
  setValues: PropTypes.func,
  filteredCheckboxValues: PropTypes.func,
};

Checkbox.defaultProps = {
  values: [],
  value: undefined,
  setValues: () => {},
  filteredCheckboxValues: () => {},
};

export default Checkbox;
