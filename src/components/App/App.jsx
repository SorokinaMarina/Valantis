/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";
import "./App.scss";
import { getProducts } from "../api/api";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Preloader from "../Preloader/Preloader";
import FilterPopup from "../FilterPopup/FilterPopup";
import { BrandContext } from "../../contexts/BrandsContext";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function App() {
  // // Переменная хранит в себе id товаров
  const [id, setId] = useState([]);
  // Переменная хранит в себе информацию о товарах
  const [products, setProducts] = useState([]);
  // Переменная включает/выключает прелоадер
  const [isLoading, setIsLoading] = useState(true);
  // Переменная показывает какое количество данных будем хранить на страничке
  const [productsPerPage] = useState(50);
  // Переменная хранит текущее смещение для отображения на странице
  const [itemOffset, setItemOffset] = useState(0);
  // Переменная отвечает за видимость попапа с фильтрами
  const [filterPopup, setFilterPopup] = useState(false);
  // Переменная содержит в себе массив брендов
  const [brands, setBrands] = useState([]);
  // Переменная отвечает за видимость ошибки
  const [error, setError] = useState(false);
  // Переменная устанавливает текст ошибки
  const [errorText, setErrorText] = useState("");

  // Получаем id товаров при первой загрузке страницы
  useEffect(() => {
    setIsLoading(true);
    getProducts("get_ids", { offset: itemOffset })
      .then((data) => {
        if (data) {
          setId(data);
          setError(false);
          setErrorText("");
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setErrorText(
          "При загрузке данных с сервера произошла ошибка. Попробуйте перезагрузить страницу.",
        );
        return err;
      });
  }, []);

  // После получения списка id запрашиваем список товаров и брендов
  useEffect(() => {
    getProducts("get_items", { ids: id })
      .then((data) => {
        setIsLoading(true);
        if (data) {
          const uniqueProducts = [];

          // Фильтруем товары с повторяющимися id
          data.forEach((item) => {
            if (!uniqueProducts.some((p) => p.id === item.id)) {
              uniqueProducts.push(item);
            }
          });
          setProducts(uniqueProducts);
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      })
      .finally(() => {
        setIsLoading(false);
      });

    // Получаем массив брендов с сервера
    getProducts("get_fields", { field: "brand" })
      .then((data) => {
        setIsLoading(true);
        if (data) {
          const filterBrands = data.filter((d) => d !== null);
          const uniqueBrands = [];
          filterBrands.forEach((item) => {
            if (!uniqueBrands.some((el) => el === item)) {
              uniqueBrands.push(item);
            }
          });
          setBrands(uniqueBrands);
          setError(false);
          setErrorText("");
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setErrorText(
          "При загрузке данных с сервера произошла ошибка. Попробуйте перезагрузить страницу.",
        );
        return err;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div className="app">
      <BrandContext.Provider value={brands}>
        <Header />
        {isLoading && !error && <Preloader />}
        {!isLoading && !error && (
          <Main
            productsPerPage={productsPerPage}
            products={products}
            setItemOffset={setItemOffset}
            itemOffset={itemOffset}
            setFilterPopup={setFilterPopup}
          />
        )}
        {!isLoading && error && <ErrorMessage errorText={errorText} />}
        <FilterPopup
          filterPopup={filterPopup}
          setFilterPopup={setFilterPopup}
          setId={setId}
          setIsLoading={setIsLoading}
          setError={setError}
          setErrorText={setErrorText}
        />
      </BrandContext.Provider>
    </div>
  );
}

export default App;
