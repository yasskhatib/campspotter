import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './form.css'; // Import the custom CSS file
import LoadingSpinner2 from "@/components/common/LoadingSpinner2"; // Ensure the path is correct

export default function TourSingleSidebar({ camp, user }) {
  const [extras, setExtras] = useState({ materialRent: false, autoBaggageTransfer: false });
  const [totalPrice, setTotalPrice] = useState(camp ? camp.prix : 0);
  const [comments, setComments] = useState('');
  const [formDisabled, setFormDisabled] = useState(false);
  const [selectedGovernorate, setSelectedGovernorate] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [remainingPlaces, setRemainingPlaces] = useState(null);
  const [governorates] = useState(['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte', 'Gabes']);
  const [alreadyReserved, setAlreadyReserved] = useState(false);
  const [campExpired, setCampExpired] = useState(false);
  const [campCanceled, setCampCanceled] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const checkReservationStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/check-reservation', {
          params: { campId: camp._id, userEmail: user.email }
        });
        if (response.data.reserved) {
          setAlreadyReserved(true);
          setFormDisabled(true);
        }
      } catch (error) {
        console.error('Error checking reservation status:', error);
      }
    };

    const fetchRemainingPlaces = async () => {
      try {
        const response = await axios.get('http://localhost:5000/camp-reservations', {
          params: { campId: camp._id }
        });
        setRemainingPlaces(camp.groupSize - response.data.reservations);
        if (response.data.reservations >= camp.groupSize) {
          setFormDisabled(true);
        }
      } catch (error) {
        console.error('Error fetching remaining places:', error);
      }
    };

    if (user && user.email) {
      checkReservationStatus();
    }
    fetchRemainingPlaces();

    // Check if the camp date is expired or status is canceled
    const today = new Date();
    const campDate = new Date(camp.date);
    if (campDate <= today) {
      setCampExpired(true);
      setFormDisabled(true);
    }
    if (camp.status === 'Canceled') {
      setCampCanceled(true);
      setFormDisabled(true);
    }

    setLoading(false); // Set loading to false once data is fetched
  }, [camp, user]);

  useEffect(() => {
    if (camp) {
      let extrasTotal = 0;
      if (extras.materialRent) extrasTotal += 20;
      if (extras.autoBaggageTransfer) extrasTotal += 10;
      setTotalPrice(camp.prix + extrasTotal);
    }
  }, [extras, camp]);

  const handleReservation = async () => {
    const reservationPromise = axios.post('http://localhost:5000/reserve', {
      reservationId: new Date().getTime(),
      campId: camp._id,
      campName: camp.title,
      date: camp.date,
      name: user.fullName,
      email: user.email,
      reservationDate: new Date(),
      totalPrice,
      selectedExtras: extras,
      comments,
    });

    toast.promise(reservationPromise, {
      pending: 'Processing your reservation...',
      success: `Reservation confirmed, ${user.fullName}!`,
      error: 'Reservation failed',
    }, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: true,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme: "colored",
      transition: Bounce,
    }).then(response => {
      if (response.status === 201) {
        setShowConfirmModal(false);
        setFormDisabled(true);
        setAlreadyReserved(true);

        const reservedCamps = JSON.parse(localStorage.getItem('reservedCamps')) || {};
        reservedCamps[camp._id] = true;
        localStorage.setItem('reservedCamps', JSON.stringify(reservedCamps));
      }
    }).catch(error => {
      console.error('Error making reservation:', error);
    });
  };

  const confirmReservation = () => {
    if (!user || user.role !== 'camper') {
      toast.error('Please log in first', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        newestOnTop: true,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    if (!selectedGovernorate) {
      toast.error('Please select a governorate', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        newestOnTop: true,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmYes = () => {
    setShowConfirmModal(false);
    handleReservation();
  };

  const handleConfirmNo = () => {
    setShowConfirmModal(false);
  };

  if (loading) {
    return <LoadingSpinner2 />;
  }

  return (
    <div className="tourSingleSidebar">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <div className="sidebar-header">
        <h3>{camp.title}</h3>
      </div>
      <hr></hr>
      <br></br>
      <div className="sidebar-header d-flex align-items-center">
        <div className="text-20 fw-500">Price from: <b>{camp.prix} TND</b></div>
        <br></br>
        <div>
          {new Date(camp.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>
      <div className="searchForm mt-20">
        <div className="searchForm__form">
          <div className="form-group">
            <span className="text-16 fw-500">Pick-up Governorate</span>
            <select
              className="form-control"
              value={selectedGovernorate}
              onChange={(e) => setSelectedGovernorate(e.target.value)}
              disabled={formDisabled}
              required
              style={{ marginTop: '10px' }}  // Corrected from 'margintop' to 'marginTop'
            >
              <option value="" disabled>Select your governorate</option>
              {governorates.map((gov, index) => (
                <option key={index} value={gov}>{gov}</option>
              ))}
            </select>


          </div>
          <hr></hr>
          <span className="text-16 fw-500">Extras</span>
          <div className="form-group form-checkbox">
            <input
              type="checkbox"
              id="materialRent"
              checked={extras.materialRent}
              onChange={() => setExtras({ ...extras, materialRent: !extras.materialRent })}
              disabled={formDisabled}
            />
            <label htmlFor="materialRent">Material Rent <b>(20 TND)</b></label>
          </div>

          <div className="form-group form-checkbox">
            <input
              type="checkbox"
              id="autoBaggageTransfer"
              checked={extras.autoBaggageTransfer}
              onChange={() => setExtras({ ...extras, autoBaggageTransfer: !extras.autoBaggageTransfer })}
              disabled={formDisabled}
            />
            <label htmlFor="autoBaggageTransfer">Auto Baggage Transfer <b>(10 TND)</b></label>
          </div>
          <hr></hr>
          <div className="form-group">
            <label>Comments</label>
            <textarea
              className="form-control"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows="5"
              disabled={formDisabled}
            />
          </div>

          <div className="total-price text-24 fw-500 mt-15">Total: <b>{totalPrice} TND</b></div>

          <button
            className={`btn ${formDisabled ? 'btn-disabled' : 'btn-reserve'} col-12 mt-20`}
            onClick={confirmReservation}
            disabled={formDisabled}
          >
            {campCanceled ? 'Camp Canceled' : campExpired ? 'Camp Expired' : alreadyReserved ? 'Already Reserved' : remainingPlaces === 0 ? 'Reservation Full' : 'Reserve Now'}
          </button>
        </div>
      </div>

      <div className={`modal ${showConfirmModal ? 'show' : ''}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Confirm Reservation</h4>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to confirm this reservation?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleConfirmNo}>No</button>
              <button type="button" className="btn btn-primary" onClick={handleConfirmYes}>Yes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TourSingleSidebar.propTypes = {
  camp: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    prix: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    groupSize: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }),
};
