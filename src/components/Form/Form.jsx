import "./Form.scss";
import React, { useState } from "react";
import PropTypes from "prop-types";
import InputField from "../InputField/InputField";
import arrowDown from "../../image/downarrow_120663.svg";

function Form({ id }) {
  const [isPriceVisible, setIsPriceVisible] = useState(false);
  const [isNameVisible, setIsNameVisible] = useState(false);
  const [isBrandVisible, setIsBrandVisible] = useState(false);
  return (
    <section className="form-container">
      <h1 className="form-container__title">Фильтр</h1>
      <form action="#" className="form-container__form" id={id} name={id}>
        <ul className="form-container__lists">
          <li className="form-container__list">
            <button
              type="button"
              className="form-container__button"
              onClick={() => {
                setIsPriceVisible(!isPriceVisible);
                setIsNameVisible(false);
                setIsBrandVisible(false);
              }}
            >
              <p className="form-container__list-text">Цена</p>
              <img
                src={arrowDown}
                alt="стрелка вниз"
                className="form-container__image"
              />
            </button>
            {isPriceVisible && (
              <InputField
                type="number"
                id="input-price"
                placeholder="Введите числовое значение"
              />
            )}
          </li>
          <li className="form-container__list">
            <button
              type="button"
              className="form-container__button"
              onClick={() => {
                setIsPriceVisible(false);
                setIsNameVisible(!isNameVisible);
                setIsBrandVisible(false);
              }}
            >
              <p className="form-container__list-text">Название</p>
              <img
                src={arrowDown}
                alt="стрелка вниз"
                className="form-container__image"
              />
            </button>
            {isNameVisible && (
              <InputField
                type="text"
                id="input-name"
                placeholder="Введите ключевое слово"
              />
            )}
          </li>
          <li className="form-container__list">
            <button
              type="button"
              className="form-container__button"
              onClick={() => {
                setIsPriceVisible(false);
                setIsNameVisible(false);
                setIsBrandVisible(!isBrandVisible);
              }}
            >
              <p className="form-container__list-text">Бренд</p>
              <img
                src={arrowDown}
                alt="стрелка вниз"
                className="form-container__image"
              />
            </button>
            {isBrandVisible && (
              <InputField type="text" id="input-brand" placeholder="" />
            )}
          </li>
        </ul>
      </form>
    </section>
  );
}

Form.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Form;
