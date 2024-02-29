import "./Form.scss";
import React, { useState } from "react";
import PropTypes from "prop-types";
import FilterList from "../FilterList/FilterList";

function Form({ id }) {
  // Объект содержит переменные, отвечающие за видимость инпутов меню фильтрации
  const [filterMenuVisible, setFilterMenuVisible] = useState({
    inputPrice: false,
    inputName: false,
    inputBrand: false,
  });

  // Функция изменяет значение переменных объекта filterMenuVisible
  function changeFilterMenuCondidtion(i) {
    if (i === "inputName") {
      setFilterMenuVisible({
        inputPrice: false,
        inputName: !filterMenuVisible.inputName,
        inputBrand: false,
      });
    }

    if (i === "inputPrice") {
      setFilterMenuVisible({
        inputPrice: !filterMenuVisible.inputPrice,
        inputName: false,
        inputBrand: false,
      });
    }

    if (i === "inputBrand") {
      setFilterMenuVisible({
        inputPrice: false,
        inputName: false,
        inputBrand: !filterMenuVisible.inputBrand,
      });
    }
  }

  return (
    <section className="form-container">
      <h1 className="form-container__title">Фильтр</h1>
      <form action="#" className="form-container__form" id={id} name={id}>
        <ul className="form-container__lists">
          <FilterList
            text="Цена"
            type="number"
            id="inputPrice"
            placeholder="Введите числовое значение"
            changeFilterMenuCondidtion={(i) => {
              changeFilterMenuCondidtion(i);
            }}
            filterMenuVisible={filterMenuVisible}
          />
          <FilterList
            text="Название"
            type="text"
            id="inputName"
            placeholder="Введите ключевое слово"
            changeFilterMenuCondidtion={(i) => {
              changeFilterMenuCondidtion(i);
            }}
            filterMenuVisible={filterMenuVisible}
          />
          <FilterList
            text="Бренд"
            type="text"
            id="inputBrand"
            placeholder=""
            changeFilterMenuCondidtion={(i) => {
              changeFilterMenuCondidtion(i);
            }}
            filterMenuVisible={filterMenuVisible}
          />
        </ul>
        <div className="form-container__button-container">
          <button className="form-container__button" type="submit">
            Применить
          </button>
        </div>
      </form>
    </section>
  );
}

Form.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Form;
