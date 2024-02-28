import "./Button.scss";
import PropTypes from "prop-types";

function Button({ number, currentPage, setCurrentPage }) {
  return (
    <button
      className={`buttons ${number === currentPage && "buttons_color"}`}
      type="button"
      onClick={() => {
        setCurrentPage(number);
      }}
    >
      {number}
    </button>
  );
}

Button.propTypes = {
  number: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Button;
