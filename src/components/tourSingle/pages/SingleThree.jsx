import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TourSingleSidebar from "../TourSingleSidebar";
import OthersInformation from "../OthersInformation";
import MainInformation2 from "./MainInformation2";
import parse, { domToReact } from 'html-react-parser';
import LoadingSpinner from "@/components/common/LoadingSpinner2"; // Ensure the path is correct

export default function SingleThree({ camp, user }) {
  const [campGroupName, setCampGroupName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(4);
  const [hasCommented, setHasCommented] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const toastId = useRef(null);

  useEffect(() => {
    const fetchCampGroupName = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/campGroup/${camp.campgrpEmail}`);
        setCampGroupName(response.data.name);
      } catch (error) {
        console.error('Error fetching camp group name:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/comments/${camp._id}`);
        setComments(response.data);
        if (user) {
          const userComment = response.data.find(cmt => cmt.camperEmail === user.email);
          if (userComment) {
            setHasCommented(true);
          }
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchCampGroupName();
    fetchComments();
  }, [camp.campgrpEmail, camp._id, user]);

  const getEmbedUrl = (iframeString) => {
    const matches = iframeString.match(/src="([^"]+)"/);
    return matches ? matches[1] : '';
  };

  const embedUrl = getEmbedUrl(camp.googleMapUrl);

  const inclusionItems = camp.inclusion.split(' - ');

  const renderDescription = (description) => {
    const options = {
      replace: ({ name, children }) => {
        if (name === 'h4') {
          return (
            <h4>
              <FontAwesomeIcon icon={faClock} className="fa-clock" />
              {domToReact(children, options)}
            </h4>
          );
        }

        if (name === 'strong') {
          return (
            <h4>
              <FontAwesomeIcon icon={faClock} className="fa-clock" />
              {domToReact(children, options)}
            </h4>
          );
        }
      },
    };
    return parse(description, options);
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    if (!user || user.role !== 'camper') {
      toast.error('Please log in as a camper to leave a comment.', {
        position: 'bottom-right',
        theme: 'dark'
      });
      return;
    }

    if (!comment || rating === 0) {
      toast.error('Rating and comment are required.', {
        position: 'bottom-right',
        theme: 'dark'
      });
      return;
    }

    if (hasCommented) {
      toast.error('You have already commented on this camp.', {
        position: 'bottom-right',
        theme: 'dark'
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/addComment', {
        campId: camp._id,
        camperEmail: user.email,
        camperFullName: user.fullName,
        rating,
        comment,
      });

      if (response.status === 201) {
        toastId.current = toast.success('Comment submitted successfully!', {
          position: 'bottom-right',
          theme: 'dark',
          autoClose: 3000,
          onClose: () => {
            setComment('');
            setRating(0);
            setHasCommented(true);
            setComments([...comments, { camperFullName: user.fullName, rating, comment, date: new Date() }]);
          }
        });
      }
    } catch (error) {
      toast.error('Error submitting comment.', {
        position: 'bottom-right',
        theme: 'dark'
      });
      console.error('Error submitting comment:', error);
    }
  };

  const handleLoadMore = () => {
    setVisibleComments(prevVisibleComments => prevVisibleComments + 4);
  };

  const visibleCommentsList = comments.slice(0, visibleComments);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="pt-30 js-pin-container">
      <div className="container">
        <div className="row y-gap-30 justify-between">
          <div className="col-lg-8">
            <MainInformation2 camp={{ ...camp, duration: Number(camp.duration), campGroupName }} />
            <div className="row justify-center pt-30">
              <div className="col-12">
                <img
                  src={`http://localhost:5000/uploads/${camp.campPictureCover}`}
                  alt={camp.title}
                  className="img-cover2 rounded-12"
                />
              </div>
            </div>
            <div className="row y-gap-20 justify-between items-center layout-pb-md pt-60 md:pt-30">
              <OthersInformation
                duration={camp.duration}
                groupSize={String(camp.groupSize)}
                ages={camp.ages}
                locationMaterials={camp.locationMaterials}
                campId={camp._id}
              />
            </div>

            <h2 className="text-30">Tour Overview</h2>
            <p className="mt-20">{camp.highlights}</p>

            <div className="line mt-60 mb-60"></div>

            <h2 className="text-30">What&apos;s included</h2>
            <div className="row mt-20">
              {inclusionItems.map((item, index) => (
                <div className="col-md-6" key={index}>
                  <div className="inclusion-item">
                    <span className="check-icon">&#10003;</span>
                    {item}
                  </div>
                </div>
              ))}
            </div>

            <div className="line mt-60 mb-60"></div>

            <h2 className="text-30">Camp Program/Planning</h2>
            <div className="timeline mt-30 formatted-content">
              {renderDescription(camp.description)}
            </div>

            <h2 className="text-30 mt-60 mb-30">Camping map location</h2>
            <div className="embedded-map mt-30 mb-30">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <p>Map location is not available.</p>
              )}
            </div>

            {comments.length > 0 && (
              <>
                <div className="line mt-60 mb-60"></div>
                <h2 className="text-30 pt-10">Comments</h2>
                <div className="comments y-gap-30 pt-30">
                  {visibleCommentsList.map((cmt, index) => (
                    <div className="comment" key={index}>
                      <div className="comment-header">
                        <span className="comment-author" style={{ fontSize: '18px', fontWeight: 'bold' }}>{cmt.camperFullName}{" "}</span>
                        <Rating
                          initialValue={cmt.rating}
                          size={20}
                          readonly
                          style={{ top: '-3px' }}
                        />
                      </div>
                      <div className="comment-body">
                        <p>{cmt.comment}</p>
                        <span className="comment-date" style={{ fontSize: '12px' }}>{new Date(cmt.date).toLocaleDateString()}</span>
                      </div> <div className="line mt-10 mb-10"></div>
                    </div>
                  ))}
                </div>
                {visibleComments < comments.length && (
                  <div className="row">
                    <div className="col-12"><br></br>
                      <button
                        className="button -dark-1 text-white"
                        style={{
                          backgroundColor: '#000',
                          padding: '15px 55px',
                          borderRadius: '5px'
                        }}
                        onClick={handleLoadMore}
                      >
                        Load More
                        <i className="icon-arrow-top-right text-16 ml-10"></i>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {user && user.role === 'camper' && !hasCommented && (
              <>
                <h2 className="text-30 pt-60">Rate/Leave a Reply for this Camp</h2>
                <div className="contactForm y-gap-30 pt-30">
                  <div className="row">
                    <div className="col-12">
                      <Rating onClick={handleRating} ratingValue={rating} size={40} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-input">
                        <textarea
                          placeholder="Leave your comment here"
                          required
                          rows="5"
                          value={comment}
                          onChange={handleCommentChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <button
                        className="button -md -dark-1 bg-accent-1 text-white"
                        onClick={handleSubmitComment}
                      >
                        Post Comment
                        <i className="icon-arrow-top-right text-16 ml-10"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="col-lg-4">
            <div className="d-flex justify-end js-pin-content">
              {(!user || user.role === 'camper') && <TourSingleSidebar camp={camp} user={user} />}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </section>
  );
}

SingleThree.propTypes = {
  camp: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    campPictureCover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    highlights: PropTypes.string.isRequired,
    inclusion: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    groupSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    ages: PropTypes.string.isRequired,
    locationMaterials: PropTypes.string.isRequired,
    googleMapUrl: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    prix: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    campgrpEmail: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }),
};
