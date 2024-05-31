import PropTypes from 'prop-types';
import Stars from "@/components/common/Stars";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function MainInformation2({ camp }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/camps/');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: camp?.title,
        text: `Check out this camp: ${camp?.title}`,
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      alert('Web Share API is not supported in your browser. Please copy the URL to share.');
    }
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
                <div className="d-flex x-gap-5 pr-10">
                  <Stars star={camp?.reviewScore} font={12} />
                </div>
                ({camp?.reviewScore} Reviews)
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center">
                <i className="icon-user text-16 mr-5"></i>
                Created by: {camp?.campGroupName}
              </div>
            </div>
          </div>
        </div>

        <div className="col-auto">
          <div className="col-auto">
            <div className="d-flex x-gap-30 y-gap-10">
              <button onClick={handleShare} className="d-flex items-center">
                <i className="icon-share flex-center text-16 mr-10"></i>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

MainInformation2.propTypes = {
  camp: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    reviewScore: PropTypes.number.isRequired,
    reviewCount: PropTypes.number,
    emplacement: PropTypes.string.isRequired,
    description: PropTypes.string,
    duration: PropTypes.number,
    prix: PropTypes.number,
    campGroupName: PropTypes.string,
  }).isRequired,
};
