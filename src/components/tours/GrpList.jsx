import Pagination from "../common/Pagination";
import ToggleSidebar from "./ToggleSidebar";
import Stars2 from "../common/Stars2";
import { useState, useEffect, useRef } from "react";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import ReactStars from 'react-stars';
import "react-toastify/dist/ReactToastify.css";
import './style.css'; // Import the custom CSS file
import LoadingSpinner from "@/components/common/LoadingSpinner2"; // Ensure the path is correct
import axiosInstance from '../axiosInstance'; // Import the Axios instance

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export default function GrpList() {
  const [setDdActives] = useState(false);
  const [settourTypeActive] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [campGroups, setCampGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [userReview, setUserReview] = useState(null); // New state to store user review
  const [userEmail, setUserEmail] = useState(null); // State to store user email
  const ITEMS_PER_PAGE = 8;
  const dropDownContainer = useRef();
  const dropDownContainer2 = useRef();
  const [loading, setLoading] = useState(true); // Add loading state

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
    const fetchCampGroups = async () => {
      try {
        const response = await axiosInstance.get('/allCampGroups'); // Updated line
        const groups = response.data;

        // Fetch ratings for each group
        const groupsWithRatings = await Promise.all(
          groups.map(async (group) => {
            const reviewsResponse = await axiosInstance.get('/getGroupReviews', { // Updated line
              params: { campGrpEmail: group.email }
            });

            const reviews = reviewsResponse.data;
            const totalScore = reviews.reduce((sum, review) => sum + review.score, 0);
            const averageRating = reviews.length ? totalScore / reviews.length : 0;
            return { ...group, averageRating, reviewsCount: reviews.length };
          })
        );

        setCampGroups(groupsWithRatings);
      } catch (error) {
        console.error('Error fetching camp groups:', error);
      }
      finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchCampGroups();
  }, []);

  useEffect(() => {
    const checkUserRole = async () => {
      const email = localStorage.getItem('userEmail');
      if (email) {
        console.log('User email found in localStorage:', email);
        try {
          const response = await axiosInstance.get('/userinfo', { // Updated line
            params: { email }
          });

          if (response.data) {
            setUserEmail(email);
            console.log('User info fetched:', response.data);
          } else {
            setUserEmail(null);
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
          setUserEmail(null);
        }
      } else {
        setUserEmail(null);
      }
    };

    checkUserRole();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleGroupClick = async (group) => {
    setSelectedGroup(group);
    setOpen(true);

    if (userEmail) {
      try {
        const response = await axiosInstance.get('/getReview', { // Updated line
          params: { campGrpEmail: group.email, camperEmail: userEmail }
        });

        setUserReview(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setUserReview(null);
        } else {
          console.error('Error fetching review:', error);
        }
      }
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedGroup(null);
    setUserReview(null); // Reset user review when modal is closed
  };

  const handleViewCamps = () => {
    // Navigate to the camps page of the selected group
    window.location.href = `/camps/${selectedGroup._id}`;
  };

  const handleRatingChange = async (newRating) => {
    if (!userEmail) {
      toast.error('You need to sign in as a camper to make a rating.');
      return;
    }

    try {
      await axiosInstance.post('/addOrUpdateReview', { // Updated line
        campGrpEmail: selectedGroup.email,
        camperEmail: userEmail,
        score: newRating
      });


      toast.success(`Your rating has been ${userReview ? 'updated' : 'submitted'} successfully!`);
      setUserReview({ ...userReview, score: newRating }); // Update user review in the state
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Error submitting your review. Please try again later.');
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCampGroups = campGroups.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <section className="layout-pb-xl">
        <div className="container">
          <div className="row y-gap-30 pt-30">
            {currentCampGroups.map((group, index) => (
              <div key={index} className="col-lg-3 col-sm-6">
                <div
                  onClick={() => handleGroupClick(group)}
                  className="tourCard -type-1 py-10 px-10 border-1 rounded-12 -hover-shadow"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="tourCard__header">
                    <div className="tourCard__image ratio ratio-28:20">
                      <img src={group.picture} alt={group.name} className="img-ratio rounded-12" />

                    </div>
                  </div>

                  <div className="tourCard__content px-10 pt-10">
                    <div className="tourCard__location d-flex items-center text-13 text-light-2">
                      <i className="icon-pin d-flex text-16 text-light-2 mr-5"></i>
                      {group.governorate}
                    </div>

                    <h3 className="tourCard__title text-16 fw-500 mt-5">
                      <span>Group Name: <b>{group.name}</b></span>
                    </h3>
                    <h5 className="tourCard__title text-14 fw-300 mt-5">
                      <span>{group.comments.substring(0, 70) + (group.comments.length > 70 ? '..' : '')}</span>
                    </h5>

                    <div className="tourCard__rating d-flex items-center text-13 mt-5">
                      <Stars2 star={group.averageRating} font="16" />
                      <span className="ml-10">({group.reviewsCount} reviews)</span>
                    </div>

                    <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                      <div className="d-flex items-center">
                        <i className="icon-clock text-16 mr-5"></i>
                        {dayjs(group.creationDate).format('YYYY')}
                      </div>

                      <div>
                        <span className="text-16 fw-500">{group.telephone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {campGroups.length > ITEMS_PER_PAGE && (
            <div className="d-flex justify-center flex-column mt-60">
              <Pagination
                currentPage={currentPage}
                totalItems={campGroups.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={handlePageChange}
              />

              <div className="text-14 text-center mt-20">
                Showing results {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, campGroups.length)} of {campGroups.length}
              </div>
            </div>
          )}
        </div>
      </section>

      {selectedGroup && (
        <Dialog
          open={open}
          getPersistentElements={() => document.querySelectorAll(".Toastify")}
          backdrop={<div className="custom-backdrop" />}
          className="custom-dialog"
        >
          <DialogHeading className="custom-heading">
            <i className="fas fa-info-circle"></i> {selectedGroup.name} Group
          </DialogHeading>
          <img src={selectedGroup.picture} alt={selectedGroup.name} className="custom-group-image" /> 


          <div className="custom-info">
            <p><i className="fas fa-envelope"></i> Email: <span>{selectedGroup.email}</span></p>
            <p><i className="fas fa-phone"></i> Phone: <span>{selectedGroup.telephone}</span></p>
            <p><i className="fas fa-map-marker-alt"></i> Governorate: <span>{selectedGroup.governorate}</span></p>
            <p><i className="fas fa-calendar-alt"></i> Creation: <span>{dayjs(selectedGroup.creationDate).format('YYYY')}</span></p>
          </div>
          <hr className="linee"></hr>
          <div className="custom-comment-section">
            About: <span className="txtt">{selectedGroup.comments} {" "}
              <b><a className="social" href={selectedGroup.socialMediaLink} target="_blank" rel="noopener noreferrer">
                Visit Facebook
              </a></b>
            </span>
          </div>
          <div className="custom-rating-section">
            <ReactStars
              count={5}
              size={50}
              color2={'#ffd700'}
              half={false}
              value={userReview ? userReview.score : 0} // Show user's review score if available
              onChange={handleRatingChange}
            />
            {/*  {userReview && (
              <div className="text-14 text-center mt-10">
                You have already rated this group. Your rating: {userReview.score}
              </div>
            )} */}
          </div>

          <div className="custom-buttons">
            <Button className="custom-button" onClick={handleViewCamps}>View Camps</Button>
            <DialogDismiss className="custom-button custom-secondary" onClick={handleCloseModal}>Close</DialogDismiss>
          </div>
        </Dialog>
      )}

      <ToggleSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <ToastContainer className="custom-toast-container" position="bottom-right" theme="dark" />
    </>
  );
}
