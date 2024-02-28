import "./FilterPopup.scss";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import exitIcon from "../../image/close-icon-black.svg";
import Form from "../Form/Form";

function FilterPopup({ filterPopup, setFilterPopup }) {
  useEffect(() => {
    // Закрываем попап щелчком на Esc
    const closeEsc = (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        setFilterPopup(false);
      }
    };

    // Закрываем попап щелчком на фон
    const closeClickBackground = (e) => {
      if (e.target.classList.contains("popup_opened")) {
        setFilterPopup(false);
      }
    };

    window.addEventListener("keydown", closeEsc);
    window.addEventListener("mousedown", closeClickBackground);

    return () => {
      window.removeEventListener("keydown", closeEsc);
      window.removeEventListener("mousedown", closeClickBackground);
    };
  }, []);

  return (
    <div className={`popup ${filterPopup ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__button"
          type="button"
          onClick={() => {
            setFilterPopup(false);
          }}
        >
          <img className="popup__icon" src={exitIcon} alt="Кнопка выйти" />
        </button>
        <Form id="filter-form" />
      </div>
    </div>
  );
}

FilterPopup.propTypes = {
  filterPopup: PropTypes.bool.isRequired,
  setFilterPopup: PropTypes.func,
};

FilterPopup.defaultProps = {
  setFilterPopup: () => {},
};

export default FilterPopup;
