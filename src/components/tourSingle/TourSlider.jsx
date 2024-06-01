import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Stars from "../common/Stars";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import dayjs from 'dayjs';

export default function TourSlider() {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allCamps'); // Fetch all camps
        const upcomingCamps = response.data
          .filter(camp => dayjs(camp.date).isAfter(dayjs())) // Filter for future dates
          .sort((a, b) => dayjs(a.date) - dayjs(b.date)) // Sort by date
          .slice(0, 7); // Get the next 7 upcoming camps
        setCamps(upcomingCamps);
      } catch (error) {
        console.error('Error fetching camps:', error);
      }
    };

    fetchCamps();
  }, []);

  return (
    <section className="layout-pt-xl layout-pb-xl">
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <h2 className="text-30">The next 7 upcoming camps:</h2>
          </div>
        </div>

        <div className="relative pt-40 sm:pt-20">
          <div
            className="overflow-hidden pb-5 js-section-slider"
            data-gap="30"
            data-slider-cols="xl-4 lg-3 md-2 sm-1 base-1"
            data-nav-prev="js-slider1-prev"
            data-nav-next="js-slider1-next"
          >
            <div className="swiper-wrapper">
              <Swiper
                spaceBetween={30}
                className="w-100"
                pagination={{
                  el: ".pbutton1",
                  clickable: true,
                }}
                navigation={{
                  prevEl: ".js-slider10-prev",
                  nextEl: ".js-slider10-next",
                }}
                modules={[Navigation, Pagination]}
                breakpoints={{
                  500: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                }}
              >
                {camps.map((camp, i) => (
                  <SwiperSlide key={i}>
                    <Link
                      to={`/camp/${camp._id}`}
                      className="tourCard -type-1 py-10 px-10 border-1 rounded-12 bg-white -hover-shadow"
                    >
                      <div className="tourCard__header">
                        <div className="tourCard__image ratio ratio-28:20">
                          <img
                            src={`http://localhost:5000/uploads/${camp.campPictureCover}`}
                            alt={camp.title}
                            className="img-ratio rounded-12"
                          />
                        </div>

                        <button className="tourCard__favorite">
                          <i className="icon-heart"></i>
                        </button>
                      </div>

                      <div className="tourCard__content px-10 pt-10">
                        <div className="tourCard__location d-flex items-center text-13 text-light-2">
                          <i className="icon-pin d-flex text-16 text-light-2 mr-5"></i>
                          {camp.emplacement}
                        </div>

                        <h3 className="tourCard__title text-16 fw-500 mt-5">
                          <span>{camp.title}</span>
                        </h3>

                        <div className="tourCard__rating d-flex items-center text-13 mt-5">
                          <div className="d-flex x-gap-5">
                            <Stars star={camp.reviewScore} />
                          </div>

                          <span className="text-dark-1 ml-10">
                            {camp.reviewScore ? camp.reviewScore : 0} ({camp.reviewCount ? camp.reviewCount : 0})
                          </span>
                        </div>

                        <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                          <div className="d-flex items-center">
                            <i className="icon-clock text-16 mr-5"></i>
                            {dayjs(camp.date).format('DD MMM YYYY')}
                          </div>

                          <div>
                            <span className="text-16 fw-500">{camp.prix} TND</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="navAbsolute">
            <button className="navAbsolute__button bg-white js-slider10-prev">
              <i className="icon-arrow-left text-14"></i>
            </button>

            <button className="navAbsolute__button bg-white js-slider10-next">
              <i className="icon-arrow-right text-14"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
