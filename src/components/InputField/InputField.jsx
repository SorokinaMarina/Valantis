/* eslint-disable jsx-a11y/label-has-associated-control */
import "./InputField.scss";
import PropTypes from "prop-types";

function InputField({ id, placeholder, type, inputName, setValues, values }) {
  function handleChange(e) {
    const { name, value } = e.target;

    setValues({ [name]: name === "price" ? Number(value) : value });
  }
  return (
    <fieldset className="input">
      <label className="input__label" htmlFor={id}>
        <input
          name={inputName}
          id={id}
          type={type}
          className="input__field"
          placeholder={placeholder}
          minLength={1}
          maxLength={30}
          onChange={handleChange}
          value={values[inputName] || ""}
        />
      </label>
    </fieldset>
  );
}

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  setValues: PropTypes.func,
  values: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
};

InputField.defaultProps = {
  setValues: () => {},
  values: {},
};

export default InputField;
