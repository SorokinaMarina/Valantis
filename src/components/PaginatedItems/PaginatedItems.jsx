import React from "react";
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
  // Функция вычисляет новое смещение на основе индекса выбранной страницы
  const handlePageClick = (event) => {
    const newOffset = (event.selected * productsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
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
