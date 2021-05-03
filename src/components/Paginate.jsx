import React from "react";

export const Paginate = ({
  currentPage,
  itemsPerPage,
  totalItems,
  pageSelect,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="..." className="my-4">
      <ul className="pagination pagination-lg justify-content-center border-0">
        {pageNumbers?.map((page) => (
          <li
            className={`page-item ${page === currentPage && "active"}`}
            key={page}
          >
            <a href="!#" className="page-link" onClick={() => pageSelect(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
