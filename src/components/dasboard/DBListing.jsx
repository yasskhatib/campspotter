import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Header from './Header';
import Pagination from '../common/Pagination';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Stars from '../common/Stars';
import './CampCard.css'; // Import the CSS file

dayjs.extend(utc);
dayjs.extend(timezone);

const ITEMS_PER_PAGE = 8;

export default function DBListing({ user }) {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        const response = await axios.get('http://localhost:5000/api/reservations', {
          params: { email },
        });
        console.log('Fetched reservations:', response.data); // Log the fetched data
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentReservations = reservations.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

  return (
    <div className={`dashboard ${sideBarOpen ? '-is-sidebar-visible' : ''} js-dashboard`}>
      <Sidebar setSideBarOpen={setSideBarOpen} />
      <div className="dashboard__content">
        <Header setSideBarOpen={setSideBarOpen} />
        <div className="dashboard__content_content">
          <h1 className="text-30">My Listings</h1>
          <p>{user ? user.fullName : 'Loading...'}: visited camps</p>

          <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 md:px-20 md:pt-20 md:pb-20 mt-60 md:mt-30">
            <div className="row y-gap-30">
              {currentReservations.length > 0 ? (
                currentReservations.map((reservation, index) => {
                  const camp = reservation.campId; // Ensure we access the populated camp data
                  return (
                    <div key={index} className="col-lg-6">
                      <div className="border-1 rounded-12 px-20 py-20">
                        <div className="row x-gap-20 y-gap-20 items-center">
                          <div className="col-xxl-auto">
                            <div className="image-containercard col-xxl-auto">
                              {camp.campPictureCover ? (
                                <img
                                  src={`http://localhost:5000/uploads/${camp.campPictureCover}`}
                                  alt={camp.title}
                                  className="camp-imagecard size-200 w-1/1 object-cover rounded-12"
                                />
                              ) : (
                                <div className="no-image-placeholder">No Image</div>
                              )}
                              {getStatusLabel(camp)}
                            </div>
                          </div>

                          <div className="col">
                            <div className="d-flex items-center">
                              <i className="icon-pin mr-5"></i>
                              {camp.emplacement}
                            </div>

                            <div className="text-18 lh-15 fw-500 mt-5">
                              <Link to={`/camp/${camp._id}`}>{camp.title}</Link>
                            </div>

                            <div className="d-flex items-center mt-5">
                              <div className="d-flex x-gap-5 text-yellow-2 mr-10">
                                <Stars star={camp.reviewScore} />
                              </div>
                              <div>({camp.reviewScore} reviews)</div>
                            </div>

                            <div className="row y-gap-15 justify-between items-end pt-5">
                              <div className="col-auto">
                                <div className="d-flex items-center">
                                  <i className="icon-clock mr-5"></i>
                                  <div className="text-14">{camp.duration} days</div>
                                </div>
                              </div>

                              <div className="col-auto">
                                <div className="text-right md:text-left">
                                  <div className="lh-14"></div>
                                  <span className="text-20 fw-500">
                                    {camp.prix} DT
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>No reservations found.</div>
              )}
            </div>

            <div className="mt-30">
              <Pagination
                currentPage={currentPage}
                totalItems={reservations.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={handlePageChange}
              />

              <div className="text-14 text-center mt-20">
                Showing results {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, reservations.length)} of {reservations.length}
              </div>
            </div>
          </div>

          <div className="text-center pt-30">
            © Copyright Campspotter {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}

DBListing.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    governorate: PropTypes.string,
    telephone: PropTypes.string,
  }),
};
