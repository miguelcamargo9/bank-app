import React from "react";
import styles from "./Pagination.module.scss";


interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  onItemsPerPageChange: (numberOfItems: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.paginationContainer}>
      <div>
        <span>Mostrar </span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          {[5, 10, 20].map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
        <span> resultados</span>
      </div>
      <ul className={styles.pageNumbers}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={currentPage === number ? styles.activePage : ""}
            onClick={() => onPageChange(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
