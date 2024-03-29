import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import Items from "./Items/Items";
import "./PaginatedItems.scss";
import { countPaginatePages } from "../../utils/constants/constants";

function PaginatedItems({ productsPerPage, setItemOffset, itemOffset }) {
  // Получаем данные продуктов из хранилища
  const products = useSelector((state) => state.productsReducer.products);
  // Переменная вычисляет конечное смещение для отображения на странице
  const endOffset = itemOffset + productsPerPage;
  // Переменная с массивом продуктов для одной странички
  const currentItems = products.slice(itemOffset, endOffset);
  // Считаем сколько страниц в пагинации должно быть
  const pageCount = Math.ceil(products.length / productsPerPage);
  // Переменная отвечает за диапазон пагинации
  const [pageRange, setPageRange] = useState(countPaginatePages());

  // Функция вычисляет новое смещение на основе индекса выбранной страницы
  const handlePageClick = (event) => {
    const newOffset = (event.selected * productsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  // Функция устанавливает диапазон страниц в пагинации
  useEffect(() => {
    function handleResize() {
      setPageRange(countPaginatePages());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageRange}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={1}
      />
    </>
  );
}

PaginatedItems.propTypes = {
  productsPerPage: PropTypes.number.isRequired,
  setItemOffset: PropTypes.func.isRequired,
  itemOffset: PropTypes.number.isRequired,
};

export default PaginatedItems;
