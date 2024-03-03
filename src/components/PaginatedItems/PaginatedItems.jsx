import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import Items from "./Items/Items";
import "./PaginatedItems.scss";

function PaginatedItems({
  productsPerPage,
  products,
  setItemOffset,
  itemOffset,
}) {
  // Переменная вычисляет конечное смещение для отображения на странице
  const endOffset = itemOffset + productsPerPage;
  // Переменная с массивом продуктов для одной странички
  const currentItems = products.slice(itemOffset, endOffset);
  // Считаем сколько страниц в пагинации должно быть
  const pageCount = Math.ceil(products.length / productsPerPage);
  // Переменная отвечает за диапазон пагинации
  const [pageRange, setPageRange] = useState(5);

  // Функция вычисляет новое смещение на основе индекса выбранной страницы
  const handlePageClick = (event) => {
    const newOffset = (event.selected * productsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  // Функция устанавливает диапазон страниц в пагинации
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 600) {
        setPageRange(5);
      } else {
        setPageRange(3);
      }
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
  products: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ),
  setItemOffset: PropTypes.func.isRequired,
  itemOffset: PropTypes.number.isRequired,
};

PaginatedItems.defaultProps = {
  products: [],
};

export default PaginatedItems;
