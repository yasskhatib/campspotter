import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';

export default function MainInformation2({ camp }) {
  const navigate = useNavigate();
  const [campRating, setCampRating] = useState(0);

  useEffect(() => {
    const fetchCampRating = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/campComments/rating/${camp._id}`);
        setCampRating(response.data.rating.toFixed(1)); // Round rating to one decimal place
      } catch (error) {
        console.error('Error fetching camp rating:', error);
      }
    };

    fetchCampRating();
  }, [camp._id]);

  const handleGoBack = () => {
    navigate('/camps/');
  };

  return (
    <div className="">
      <div className="row x-gap-10 y-gap-10 items-center">
        <div className="col-auto">
          <button
            className="button -accent-1 text-14 py-5 px-15 bg-light-1 rounded-200 d-flex align-items-center"
            onClick={handleGoBack}
          >
            <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }} />
            All Camps
          </button>
        </div>
      </div>

      <h2 className="text-40 sm:text-30 lh-14 mt-20">
        {camp?.title}
      </h2>

      <div className="row y-gap-20 justify-between pt-20">
        <div className="col-auto">
          <div className="row x-gap-20 y-gap-20 items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <i className="icon-pin text-16 mr-5"></i>
                {camp?.emplacement}
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center">
                <i className="icon-clock text-16 mr-5"></i>
                {camp?.date ? camp.date.substring(0, 10) : ''}
              </div>
            </div>

           

            <div className="col-auto">
              <div className="d-flex items-center">
                <i className="icon-user text-16 mr-5"></i>
                Group: {camp?.campGroupName}
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="d-flex x-gap-5 pr-10">
                  <Rating initialValue={parseFloat(campRating)} size={20} readonly style={{ top: '-3px' }} />
                </div>
                ({campRating} Reviews)
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

MainInformation2.propTypes = {
  camp: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    emplacement: PropTypes.string.isRequired,
    campGroupName: PropTypes.string,
  }).isRequired,
};
