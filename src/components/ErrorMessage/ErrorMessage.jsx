import "./ErrorMessage.scss";
import PropTypes from "prop-types";

function ErrorMessage({ errorText }) {
  return (
    <div className="error">
      <p className="error__message">{errorText}</p>
    </div>
  );
}

ErrorMessage.propTypes = {
  errorText: PropTypes.string.isRequired,
};

export default ErrorMessage;
