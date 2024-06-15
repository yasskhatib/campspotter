import Pagination from "../common/Pagination";
import Calender from "../common/dropdownSearch/Calender";
import ToggleSidebar from "./ToggleSidebar";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Rating } from 'react-simple-star-rating';
import LoadingSpinner from "@/components/common/LoadingSpinner2"; // Ensure the path is correct

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export default function TourList3() {
  const [setDdActives] = useState(false);
  const [settourTypeActive] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [camps, setCamps] = useState([]);
  const [filteredCamps, setFilteredCamps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;
  const dropDownContainer = useRef();
  const dropDownContainer2 = useRef();
  const [campRatings, setCampRatings] = useState({}); // Store ratings in an object keyed by camp ID
  const [loading, setLoading] = useState(true); // Add loading state

  const location = useLocation();

  useEffect(() => {
    const handleClick = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        setDdActives(false);
      }
      if (
        dropDownContainer2.current &&
        !dropDownContainer2.current.contains(event.target)
      ) {
        settourTypeActive(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [setDdActives, settourTypeActive]);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allCamps');
        setCamps(response.data);
        setFilteredCamps(response.data);

        // Fetch ratings for all camps
        const ratingsResponse = await Promise.all(response.data.map(camp =>
          axios.get(`http://localhost:5000/campComments/rating/${camp._id}`).catch(() => ({ data: { rating: null } }))
        ));
        const ratings = ratingsResponse.reduce((acc, ratingResp, index) => {
          const ratingValue = ratingResp.data.rating;
          acc[response.data[index]._id] = ratingValue ? ratingValue.toFixed(1) : "0.0"; // Assign "0.0" if rating is null or undefined
          return acc;
        }, {});
        setCampRatings(ratings);

      } catch (error) {
        console.error('Error fetching camps:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchCamps();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');

    if (searchQuery) {
      const filtered = camps.filter(
        camp =>
          camp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          camp.emplacement.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCamps(filtered);
    } else {
      setFilteredCamps(camps);
    }
  }, [location.search, camps]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const getStatusLabel = (camp) => {
    const today = dayjs().utc().startOf('day');
    const campDate = dayjs(camp.date).utc().startOf('day');

    if (!camp.status) {
      if (campDate.isBefore(today) || campDate.isSame(today)) {
        return <span className="status-label-red">Expired</span>;
      } else {
        return <span className="status-label-green">Upcoming</span>;
      }
    } else {
      return <span className="status-label-black">{camp.status}</span>;
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCamps = filteredCamps.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className="layout-pb-xl">
        <div className="container">
          <div className="row custom-dd-container justify-between items-center relative z-5">
            <div className="col-auto">
              <div className="row custom-dd-container x-gap-10 y-gap-10 items-center">
                <div className="col-auto" hidden>
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="button -h-50 px-20 -outline-dark-1 text-dark-1"
                    data-x-click="tourPagesSidebar"
                  >
                    <i className="icon-sort-down text-18 mr-10"></i>
                    All Filter
                  </button>
                </div>

                <div className="col-auto" hidden>
                  <div
                    className="dropdown -base -date js-calendar js-form-dd js-dropdown js-dont-close"
                    data-main-value=""
                  >
                    <div className="dropdown__button h-50 min-w-auto js-button">
                      <div>
                        <span className="js-first-date">
                          <Calender />
                        </span>
                        <span className="js-last-date"></span>
                      </div>
                      <i className="icon-chevron-down ml-10"></i>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {currentCamps.length === 0 ? (
            <div className="text-center text-20">No results found for your search.</div>
          ) : (
            <>
              <div className="row y-gap-30 pt-30">
                {currentCamps.map((camp, index) => (
                  <div key={index} className="col-lg-3 col-sm-6">
                    <Link
                      to={`/camp/${camp._id}`}
                      className="tourCard -type-1 py-10 px-10 border-1 rounded-12 -hover-shadow"
                    >
                      <div className="tourCard__header">
                        <div className="tourCard__image ratio ratio-28:20">
                          <img
                            src={`http://localhost:5000/uploads/${camp.campPictureCover}`}
                            alt={camp.title}
                            className="img-ratio rounded-12"
                          />
                          {getStatusLabel(camp)}
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
                            <Rating initialValue={parseFloat(campRatings[camp._id] || 0)} size={20} readonly style={{ top: '-3px' }} />
                          </div>
                          <span className="text-dark-1 ml-10">
                            ({campRatings[camp._id] || 0} Reviews)
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
                  </div>
                ))}
              </div>

              {filteredCamps.length > ITEMS_PER_PAGE && (
                <div className="d-flex justify-center flex-column mt-60">
                  <Pagination
                    currentPage={currentPage}
                    totalItems={filteredCamps.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={handlePageChange}
                  />

                  <div className="text-14 text-center mt-20">
                    Showing results {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredCamps.length)} of {filteredCamps.length}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <ToggleSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </>
  );
}
