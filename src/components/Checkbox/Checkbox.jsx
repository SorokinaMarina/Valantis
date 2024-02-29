import "./Checkbox.scss";
import React, { useState } from "react";
import PropTypes from "prop-types";

function Checkbox({ text, id }) {
  const [value, setValue] = useState(false);

  function handleClick(e) {
    const { checked } = e.target;

    setValue(checked);
  }
  return (
    <li className="checkbox">
      <fieldset className="checkbox__fieldset">
        <label htmlFor="checkbox" className="checkbox__label">
          <input
            name={id}
            checked={value}
            type="checkbox"
            id={id}
            className="checkbox__input"
            onChange={handleClick}
          />
          <span className="checkbox__span">{text}</span>
        </label>
      </fieldset>
    </li>
  );
}

Checkbox.propTypes = {
  text: PropTypes.string,
  id: PropTypes.number,
};

Checkbox.defaultProps = {
  text: undefined,
  id: undefined,
};

export default Checkbox;
