import { useEffect, useState } from 'react';
import Pagination from '../common/Pagination';
import Sidebar from './Sidebargrp';
import Header from './Header';
import Stars from '../common/Stars';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { FaStopCircle } from 'react-icons/fa';
import { Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import './CampCard.css'; // Import the CSS file

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const ITEMS_PER_PAGE = 6;

export default function DBListinggrp({ onLogout }) {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [camps, setCamps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const campgrpEmail = localStorage.getItem('campgrpEmail');

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axios.get('http://localhost:5000/campsByCampgrp', {
          params: { email: campgrpEmail },
        });
        console.log('Fetched camps:', response.data); // Debug fetched data
        setCamps(response.data);
      } catch (error) {
        console.error('Error fetching camps:', error);
      }
    };

    fetchCamps();
  }, [campgrpEmail]);

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

  const isUpcoming = (camp) => {
    const today = dayjs().utc().startOf('day');
    const campDate = dayjs(camp.date).utc().startOf('day');

    return !camp.status && (campDate.isAfter(today) || campDate.isSame(today));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCancelClick = (camp) => {
    setSelectedCamp(camp);
    setShowDialog(true);
  };

  const confirmCancel = async () => {
    if (selectedCamp) {
      try {
        await axios.patch(`http://localhost:5000/camps/${selectedCamp._id}`, { status: 'Canceled' });
        setCamps((prevCamps) => prevCamps.map((camp) =>
          camp._id === selectedCamp._id ? { ...camp, status: 'Canceled' } : camp
        ));
        toast.success('Camp has been canceled successfully!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
        setShowDialog(false);
        setTimeout(() => setSelectedCamp(null), 300);
      } catch (error) {
        console.error('Error updating camp status:', error);
        toast.error('Error canceling the camp!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
      }
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
    setTimeout(() => setSelectedCamp(null), 300);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCamps = camps.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <ToastContainer transition={Bounce} />
      <div className={`dashboard ${sideBarOpen ? '-is-sidebar-visible' : ''} js-dashboard`}>
        <Sidebar setSideBarOpen={setSideBarOpen} onLogout={onLogout} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            <h1 className="text-30">My Listings</h1>
            <p className="">Here are all the camps you have created.</p>

            <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 md:px-20 md:pt-20 md:pb-20 mt-60 md:mt-30">
              <div className="row y-gap-30">
                {currentCamps.map((camp, index) => (
                  <div key={index} className="col-lg-6">
                    <div className="border-1 rounded-12 px-20 py-20 camp-card">
                      <div className="row x-gap-20 y-gap-20 items-center position-relative">
                        <div className="col-xxl-auto">
                          <div className="image-containercard col-xxl-auto">
                            <img
                              src={`http://localhost:5000/uploads/${camp.campPictureCover}`}
                              alt={camp.title}
                              className="camp-imagecard size-200 w-1/1 object-cover rounded-12"
                            />
                            {getStatusLabel(camp)}
                          </div>
                        </div>

                        <div className="col">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex items-center">
                              <i className="icon-pin mr-5"></i>
                              {camp.emplacement}
                            </div>
                            {isUpcoming(camp) && (
                              <button
                                className="cancel-button"
                                onClick={() => handleCancelClick(camp)}
                              >
                                <FaStopCircle />
                              </button>
                            )}
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
                ))}
              </div>

              <div className="mt-30">
                <Pagination
                  currentPage={currentPage}
                  totalItems={camps.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={handlePageChange}
                />

                <div className="text-14 text-center mt-20">
                  Showing results {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, camps.length)} of {camps.length}
                </div>
              </div>
            </div>

            <div className="text-center pt-30">
              © Copyright Campspotter {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>

      <Dialog
        aria-labelledby="custom-dialog-heading"
        className={`custom-dialog-overlay ${showDialog ? 'fade-in' : 'fade-out'}`}
        open={!!selectedCamp}
        onClose={closeDialog}
      >
        <div className="custom-dialog-content">
          <DialogHeading className='canceltitle' id="custom-dialog-heading">Cancel Camp</DialogHeading>
          
          <p>Are you sure you want to cancel this camp?</p>
          <div className="custom-button-container">
            <button className="custom-btn custom-btn-danger" onClick={confirmCancel}>
              Yes
            </button>
            <DialogDismiss as="button" className="custom-btn custom-btn-secondary" onClick={closeDialog}>
              No
            </DialogDismiss>
           
          </div>
        </div>
      </Dialog>
    </>
  );
}

DBListinggrp.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
