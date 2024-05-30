import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUsers, faBirthdayCake, faFire } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function OthersInformation({ duration, groupSize, ages, locationMaterials, campId }) {
  const [remainingPlaces, setRemainingPlaces] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/camp-reservations', {
          params: { campId }
        });
        setRemainingPlaces(groupSize - response.data.reservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [campId, groupSize]);

  return (
    <>
      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <FontAwesomeIcon icon={faClock} className="text-20" style={{ stroke: "black", strokeWidth: "2px" }} />
          </div>
          <div className="ml-10">
            <div className="lh-16">Duration</div>
            <div className="text-14 text-light-2 lh-16">{duration} Days</div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <FontAwesomeIcon icon={faUsers} className="text-20" style={{ stroke: "black", strokeWidth: "2px" }} />
          </div>
          <div className="ml-10">
            <div className="lh-16">Group Size</div>
            <div className="text-14 text-light-2 lh-16">{groupSize} People</div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <FontAwesomeIcon icon={faBirthdayCake} className="text-20" style={{ stroke: "black", strokeWidth: "2px" }} />
          </div>
          <div className="ml-10">
            <div className="lh-16">Ages</div>
            <div className="text-14 text-light-2 lh-16">{ages} Years</div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <FontAwesomeIcon icon={faFire} className="text-20" style={{ stroke: "black", strokeWidth: "2px" }} />
          </div>
          <div className="ml-10">
            <div className="lh-16">Reservation</div>
            <div className="text-14 text-light-2 lh-16">
              {remainingPlaces !== null ? `${remainingPlaces} remaining` : 'Loading...'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

OthersInformation.propTypes = {
  duration: PropTypes.string.isRequired,
  groupSize: PropTypes.string.isRequired,
  ages: PropTypes.string.isRequired,
  locationMaterials: PropTypes.string.isRequired,
  campId: PropTypes.string.isRequired,
};
