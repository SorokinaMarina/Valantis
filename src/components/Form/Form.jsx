/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import "./Form.scss";
import React, { useState } from "react";
import PropTypes from "prop-types";
import FilterList from "../FilterList/FilterList";
import { getProducts } from "../api/api";

function Form({
  id,
  setId,
  setIsLoading,
  setFilterPopup,
  setError,
  setErrorText,
}) {
  // Объект содержит переменные, отвечающие за видимость инпутов меню фильтрации
  const [filterMenuVisible, setFilterMenuVisible] = useState({
    inputPrice: false,
    inputName: false,
    inputBrand: false,
  });
  // Переменная, собирающая значение с полей
  const [values, setValues] = useState({});

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

    setValues({});
  }

  // Функция, которая фильтрует данные
  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    setFilterPopup(false);
    getProducts("filter", values)
      .then((data) => {
        if (data) {
          setId(data);
          setError(false);
          setErrorText("");
        } else {
          return data;
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setErrorText("Товары не найдены");
        return err;
      })
      .finally(() => {
        setIsLoading(false);
      });
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
            name="price"
            placeholder="Введите числовое значение"
            changeFilterMenuCondidtion={(i) => {
              changeFilterMenuCondidtion(i);
            }}
            filterMenuVisible={filterMenuVisible}
            values={values}
            setValues={setValues}
          />
          <FilterList
            text="Название"
            type="text"
            id="inputName"
            name="product"
            placeholder="Введите ключевое слово"
            changeFilterMenuCondidtion={(i) => {
              changeFilterMenuCondidtion(i);
            }}
            filterMenuVisible={filterMenuVisible}
            values={values}
            setValues={setValues}
          />
          <FilterList
            text="Бренд"
            type="text"
            id="inputBrand"
            name="brand"
            placeholder=""
            changeFilterMenuCondidtion={(i) => {
              changeFilterMenuCondidtion(i);
            }}
            filterMenuVisible={filterMenuVisible}
            setValues={setValues}
          />
        </ul>
        <div className="form-container__button-container">
          <button
            className="form-container__button"
            type="submit"
            onClick={handleSubmit}
          >
            Применить
          </button>
        </div>
      </form>
    </section>
  );
}

Form.propTypes = {
  id: PropTypes.string.isRequired,
  setId: PropTypes.func,
  setIsLoading: PropTypes.func,
  setFilterPopup: PropTypes.func,
  setError: PropTypes.func,
  setErrorText: PropTypes.func,
};

Form.defaultProps = {
  setId: () => {},
  setIsLoading: () => {},
  setFilterPopup: () => {},
  setError: () => {},
  setErrorText: () => {},
};

export default Form;
