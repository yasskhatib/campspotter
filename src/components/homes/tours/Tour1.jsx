import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Stars from '@/components/common/Stars';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import LoadingSpinner2 from '@/components/common/LoadingSpinner2'; // Ensure the path is correct

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export default function Tour1() {
  const [latestCamps, setLatestCamps] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchLatestCamps = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allCamps');
        let camps = response.data;
        // Fetch ratings for each camp and assign it to the camp object
        await Promise.all(camps.map(camp =>
          axios.get(`http://localhost:5000/campComments/rating/${camp._id}`)
            .then(ratingResponse => {
              camp.rating = ratingResponse.data.rating ? ratingResponse.data.rating.toFixed(1) : "0.0"; // Assign default if no rating
            })
            .catch(() => {
              camp.rating = "0.0"; // Assign default if fetch fails
            })
        ));

        const sortedCamps = camps.sort((a, b) => new Date(b.date) - new Date(a.date));
        setLatestCamps(sortedCamps.slice(0, 8));
      } catch (error) {
        console.error('Error fetching latest camps:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchLatestCamps();
  }, []);

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
    <section className="layout-pt-xl layout-pb-xl tour-section">
      <div className="container">
        <div className="row justify-between items-end y-gap-10">
          <div className="col-auto">
            <h2 data-aos="fade-right" className="text-30 md:text-24">
              Find Popular Camps
            </h2>
          </div>
          <div className="col-auto">
            <Link
              to="/camps"
              data-aos="fade-left"
              className="buttonArrow d-flex items-center"
            >
              <span>See all</span>
              <i className="icon-arrow-top-right text-16 ml-10"></i>
            </Link>
          </div>
        </div>

        <div className="row y-gap-30 justify-between pt-40 sm:pt-20 mobile-css-slider -w-300">
          {loading ? (
            <div className="spinner-section">
              <LoadingSpinner2 />
            </div>
          ) : (
            latestCamps.map((camp, i) => (
              <div key={i} className="col-lg-3 col-md-6">
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
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
