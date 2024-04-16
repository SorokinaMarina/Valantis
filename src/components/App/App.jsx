import React, { useState, useEffect } from "react";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../api/api";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Preloader from "../Preloader/Preloader";
import FilterPopup from "../FilterPopup/FilterPopup";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { setCountProducts } from "../../utils/constants/constants";
import { getAllId } from "../../redux/slice/idSlice/idSlice";
import { getProductsData } from "../../redux/slice/productsSlice/productsSlice";
import { getBrands } from "../../redux/slice/brandsSlice/brandsSlice";

function App() {
  // дальнейший код
  const dispatch = useDispatch();
  // Переменная хранит в себе id товаров
  const id = useSelector((state) => state.idReducer.id);
  // Переменная включает/выключает прелоадер
  const [isLoading, setIsLoading] = useState(true);
  // Переменная показывает какое количество данных будем хранить на страничке
  const [productsPerPage, setProductsPerPage] = useState(setCountProducts());
  // Переменная хранит текущее смещение для отображения на странице
  const [itemOffset, setItemOffset] = useState(0);
  // Переменная отвечает за видимость попапа с фильтрами
  const [filterPopup, setFilterPopup] = useState(false);
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
    getProducts("get_ids", { offset: 0, limit: 600 })
      .then((data) => {
        if (data) {
          dispatch(getAllId(data));
          setError(false);
          setErrorText("");
        }
      })
      .catch((err) => {
        handleError(err);
      });
  }, [productsPerPage]);

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
            dispatch(getProductsData(uniqueProducts));
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
            dispatch(getBrands(uniqueBrands));
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
      <Header />
      {isLoading && !error && <Preloader />}
      {!isLoading && !error && (
        <Main
          productsPerPage={productsPerPage}
          setItemOffset={setItemOffset}
          itemOffset={itemOffset}
          setFilterPopup={setFilterPopup}
          setProductsPerPage={setProductsPerPage}
        />
      )}
      {!isLoading && error && <ErrorMessage errorText={errorText} />}
      <FilterPopup
        filterPopup={filterPopup}
        setFilterPopup={setFilterPopup}
        setIsLoading={setIsLoading}
        setError={setError}
        setErrorText={setErrorText}
        handleError={(err) => {
          handleError(err);
        }}
      />
    </div>
  );
}

export default App;
