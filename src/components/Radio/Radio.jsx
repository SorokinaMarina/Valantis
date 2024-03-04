import "./Radio.scss";
import React from "react";
import PropTypes from "prop-types";

function Radio({ item, setValues, inputName }) {
  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ [name]: value });
  }
  return (
    <li className="radio">
      <fieldset className="radio__fieldset">
        <label htmlFor={item} className="radio__label">
          <input
            name={inputName}
            type="radio"
            id={item}
            className="radio__input"
            value={item}
            onChange={handleChange}
          />
          <span className="radio__span">{item}</span>
        </label>
      </fieldset>
    </li>
  );
}

Radio.propTypes = {
  item: PropTypes.string,
  setValues: PropTypes.func,
  inputName: PropTypes.string.isRequired,
};

Radio.defaultProps = {
  item: undefined,
  setValues: () => {},
};

export default Radio;
