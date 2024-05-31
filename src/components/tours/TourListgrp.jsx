// src/components/tours/CampGrpList.js

import Pagination from "../common/Pagination";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function CampGrpList() {
  const [campGrps, setCampGrps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    const fetchCampGrps = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allCampGrps');
        setCampGrps(response.data);
      } catch (error) {
        console.error('Error fetching camp groups:', error);
      }
    };

    fetchCampGrps();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCampGrps = campGrps.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <section className="layout-pb-xl">
        <div className="container">
          <div className="row custom-dd-container justify-between items-center relative z-5">
            {/* Additional filter and search functionalities can be added here */}
          </div>

          <div className="row y-gap-30 pt-30">
            {currentCampGrps.map((campGrp, index) => (
              <div key={index} className="col-lg-3 col-sm-6">
                <Link
                  to={`/campgrp/${campGrp._id}`}
                  className="tourCard -type-1 py-10 px-10 border-1 rounded-12 -hover-shadow"
                >
                  <div className="tourCard__header">
                    <div className="tourCard__image ratio ratio-28:20">
                      <img
                        src={`http://localhost:5000/uploads/${campGrp.picture}`}
                        alt={campGrp.name}
                        className="img-ratio rounded-12"
                      />
                    </div>
                  </div>

                  <div className="tourCard__content px-10 pt-10">
                    <div className="tourCard__location d-flex items-center text-13 text-light-2">
                      <i className="icon-pin d-flex text-16 text-light-2 mr-5"></i>
                      {campGrp.email}
                    </div>

                    <h3 className="tourCard__title text-16 fw-500 mt-5">
                      <span>{campGrp.name}</span>
                    </h3>

                    <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                      <div className="d-flex items-center">
                        <i className="icon-clock text-16 mr-5"></i>
                        Created on: {campGrp.creationDate}
                      </div>

                      <div>
                        <a href={campGrp.socialMediaLink} target="_blank" rel="noopener noreferrer">
                          <i className="icon-social text-16"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {campGrps.length > ITEMS_PER_PAGE && (
            <div className="d-flex justify-center flex-column mt-60">
              <Pagination
                currentPage={currentPage}
                totalItems={campGrps.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={handlePageChange}
              />

              <div className="text-14 text-center mt-20">
                Showing results {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, campGrps.length)} of {campGrps.length}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
