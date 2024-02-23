/* eslint-disable consistent-return */
import React from "react";
import "./App.scss";
import { getProducts } from "../api/api";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Preloader from "../Preloader/Preloader";

function App() {
  // Переменная хранит в себе id товаров
  const [id, setId] = React.useState([]);
  // Переменная хранит в себе информацию о товарах
  const [products, setProducts] = React.useState([]);
  // Переменная включает/выключает прелоадер
  const [isLoading, setIsLoading] = React.useState(false);

  // Получаем id товаров при первой загрузке страницы
  React.useEffect(() => {
    getProducts("get_ids", { offset: 0, limit: 15 })
      .then((data) => {
        if (data) {
          setId(data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          return data;
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(true);
      });
  }, []);

  // После получения списка id запрашиваем список товаров
  React.useEffect(() => {
    getProducts("get_items", { ids: id })
      .then((data) => {
        if (data) {
          setProducts(data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          return data;
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      })
      .finally(() => {
        // setIsLoading(true);
      });
  }, [id]);
  return (
    <div className="app">
      <Header />
      {isLoading ? <Preloader /> : <Main products={products} />}
    </div>
  );
}

export default App;
