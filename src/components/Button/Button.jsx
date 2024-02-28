import "./Button.scss";
import PropTypes from "prop-types";
import filter from "../../image/icons8-параметры-сортировки-50.png";

function Button({ text, setFilterPopup }) {
  return (
    <div className="button">
      <button
        className="button__element"
        type="button"
        onClick={() => {
          setFilterPopup(true);
        }}
      >
        <img className="button__image" src={filter} alt="Фильтр" />
        {text}
      </button>
    </div>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  setFilterPopup: PropTypes.func,
};

Button.defaultProps = {
  setFilterPopup: () => {},
};

export default Button;
