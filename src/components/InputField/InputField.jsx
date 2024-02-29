/* eslint-disable jsx-a11y/label-has-associated-control */
import "./InputField.scss";
import PropTypes from "prop-types";

function InputField({ id, placeholder, type }) {
  return (
    <fieldset className="input">
      <label className="input__label" htmlFor={id}>
        <input
          name={id}
          id={id}
          type={type}
          className="input__field"
          placeholder={placeholder}
          minLength={1}
          maxLength={30}
        />
      </label>
    </fieldset>
  );
}

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default InputField;
