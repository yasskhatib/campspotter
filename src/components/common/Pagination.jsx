import React, { useState, useEffect } from "react";

export default function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
  const [activeIndex, setActiveIndex] = useState(currentPage);
  const range = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    setActiveIndex(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setActiveIndex(page);
    onPageChange(page);
  };

  return (
    <div className="pagination justify-center">
      <button
        onClick={() => handlePageChange(activeIndex > 1 ? activeIndex - 1 : 1)}
        className="pagination__button customStylePaginationPre button -accent-1 mr-15 -prev"
      >
        <i className="icon-arrow-left text-15"></i>
      </button>

      <div className="pagination__count">
        {Array.from({ length: range }, (_, index) => (
          <div
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => handlePageChange(index + 1)}
            className={activeIndex === index + 1 ? 'is-active' : ''}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(activeIndex < range ? activeIndex + 1 : range)}
        className="pagination__button customStylePaginationNext button -accent-1 ml-15 -next"
      >
        <i className="icon-arrow-right text-15"></i>
      </button>
    </div>
  );
}
