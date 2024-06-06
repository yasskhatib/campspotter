import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Stars from "@/components/common/Stars";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export default function TourSliderOne() {
  const [topCamps, setTopCamps] = useState([]);

  useEffect(() => {
    const fetchTopCamps = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allCamps');
        let camps = response.data;
        const sixMonthsAgo = dayjs().utc().subtract(6, 'months');

        // First filter the camps
        camps = camps.filter(camp => dayjs(camp.date).utc().isAfter(sixMonthsAgo));

        // Then fetch ratings for each camp and assign it to the camp object
        await Promise.all(camps.map(camp =>
          axios.get(`http://localhost:5000/campComments/rating/${camp._id}`)
            .then(ratingResponse => {
              camp.rating = ratingResponse.data.rating ? ratingResponse.data.rating.toFixed(1) : "0.0"; // Assign default if no rating
            })
            .catch(() => {
              camp.rating = "0.0"; // Assign default if fetch fails
            })
        ));

        // Sort by review score and take top 5
        const sortedCamps = camps.sort((a, b) => b.reviewScore - a.reviewScore).slice(0, 5);
        setTopCamps(sortedCamps);
      } catch (error) {
        console.error('Error fetching top camps:', error);
      }
    };

    fetchTopCamps();
  }, []);

  return (
    <section className="layout-pt-xl layout-pt-sm relative">
      <div className="sectionBg -w-1530 rounded-12 bg-white"></div>

      <div className="container">
        <div className="row justify-between items-end y-gap-10">
          <div className="col-auto">
            <h2 data-aos="fade-up" className="text-30 md:text-24">
              Top 5 Camps in the Last 6 Months
            </h2>
          </div>

          <div className="col-auto">
            <Link
              to={"/camps"}
              data-aos="fade-right"
              className="buttonArrow d-flex items-center"
            >
              <span>See all</span>
              <i className="icon-arrow-top-right text-16 ml-10"></i>
            </Link>
          </div>
        </div>

        <div className="relative pt-40 sm:pt-20">
          <div className="overflow-hidden pb-30 js-section-slider">
            <div data-aos="fade-up" className="swiper-wrapper">
              <Swiper
                spaceBetween={30}
                className="w-100"
                pagination={{
                  el: ".pbutton1",
                  clickable: true,
                }}
                navigation={{
                  prevEl: ".prev1",
                  nextEl: ".next1",
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
                {topCamps.map((camp, i) => (
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
                            <Stars star={parseFloat(camp.rating)} />
                          </div>

                          <span className="text-dark-1 ml-10">
                            ({camp.rating} Reviews)
                          </span>
                        </div>

                        <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                          <div className="d-flex items-center">
                            <i className="icon-clock text-16 mr-5"></i>
                            {camp.duration} days
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
            <button className="navAbsolute__button bg-white js-slider1-prev prev1">
              <i className="icon-arrow-left text-14"></i>
            </button>

            <button className="navAbsolute__button bg-white js-slider1-next next1">
              <i className="icon-arrow-right text-14"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
