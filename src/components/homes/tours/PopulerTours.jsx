import Stars from "@/components/common/Stars";
import { tourData } from "@/data/tours";

import { Link } from "react-router-dom";
import React from "react";

export default function PopulerTours() {
  return (
    <section className="layout-pt-xl layout-pb-xl">
      <div className="container">
        <div className="row justify-between items-end y-gap-10">
          <div className="col-auto">
            <h2
              data-aos="fade-up"
              data-aos-delay=""
              className="text-30 md:text-24"
            >
              Find Popular Tours
            </h2>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay=""
          className="row y-gap-30 justify-between pt-40 sm:pt-20 mobile-css-slider -w-300"
        >
          {tourData.slice(0, 4).map((elm, i) => (
            <div key={i} className="col-lg-3 col-md-6">
              <Link
                to={`/tour-single-1/${elm.id}`}
                className="tourCard -type-1 -rounded bg-white hover-shadow-1 overflow-hidden rounded-20 shadow-1 -hover-shadow"
              >
                <div className="tourCard__header">
                  <div className="tourCard__image ratio ratio-28:20">
                    <img src={elm.imageSrc} alt="image" className="img-ratio" />

                    <div className="tourCard__shape"></div>
                  </div>

                  <button className="tourCard__favorite">
                    <i className="icon-heart"></i>
                  </button>
                </div>

                <div className="tourCard__content px-20 py-10">
                  <div className="tourCard__location d-flex items-center text-13 text-light-2">
                    <i className="icon-pin d-flex text-16 text-light-2 mr-5"></i>
                    {elm.location}
                  </div>

                  <h3 className="tourCard__title text-16 fw-500 mt-5">
                    <span>{elm.title}</span>
                  </h3>

                  <div className="tourCard__rating text-13 mt-5">
                    <div className="d-flex items-center">
                      <div className="d-flex x-gap-5 pr-10">
                        <Stars star={elm.rating} />
                      </div>

                      <span className="text-dark-1 text-13">
                        {elm.rating} ({elm.ratingCount})
                      </span>
                    </div>
                  </div>

                  <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                    <div className="d-flex items-center">
                      <i className="icon-clock text-16 mr-5"></i>
                      {elm.duration}
                    </div>

                    <div>
                      From <span className="text-16 fw-500">${elm.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
