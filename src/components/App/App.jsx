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
import { setCountProducts } from "../../utils/constants/constants";

function App() {
  // // Переменная хранит в себе id товаров
  const [id, setId] = useState([]);
  // Переменная хранит в себе информацию о товарах
  const [products, setProducts] = useState([]);
  // Переменная включает/выключает прелоадер
  const [isLoading, setIsLoading] = useState(true);
  // Переменная показывает какое количество данных будем хранить на страничке
  const [productsPerPage, setProductsPerPage] = useState(setCountProducts());
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

  // Устанаваливаем определённое количество карточек на страницу, в зависимости от ширины
  useEffect(() => {
    function handleResize() {
      setProductsPerPage(setCountProducts());
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Функция, содержащая логику обработки ошибок
  function handleError(err) {
    console.log(err);
    setError(true);
    setErrorText(
      "При загрузке данных с сервера произошла ошибка. Попробуйте перезагрузить страницу.",
    );
    setIsLoading(false);
    return err;
  }

  // Получаем id товаров
  useEffect(() => {
    setIsLoading(true);
    getProducts("get_ids", { offset: 0, limit: 500 })
      .then((data) => {
        if (data) {
          setId(data);
          setError(false);
          setErrorText("");
        }
      })
      .catch((err) => {
        handleError(err);
      });
  }, []);

  // После получения списка id запрашиваем список товаров и брендов
  useEffect(() => {
    if (id.length !== 0) {
      Promise.all([
        getProducts("get_items", { ids: id }),
        getProducts("get_fields", { field: "brand" }),
      ])
        .then(([productItems, brandItems]) => {
          setIsLoading(true);
          if (productItems) {
            const uniqueProducts = [];

            // Фильтруем товары с повторяющимися id и соханяем в переменную
            productItems.forEach((item) => {
              if (!uniqueProducts.some((p) => p.id === item.id)) {
                uniqueProducts.push(item);
                setIsLoading(false);
              }
            });
            setProducts(uniqueProducts);
          }

          if (brandItems) {
            // Фильтруем бренды и сохраняем в переменную
            const filterBrands = brandItems.filter((d) => d !== null);
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
          setIsLoading(false);
          handleError(err);
        });
    }
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
          handleError={(err) => {
            handleError(err);
          }}
        />
      </BrandContext.Provider>
    </div>
  );
}

export default App;
