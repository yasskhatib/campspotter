import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Sidebargrp from "./Sidebargrp";
import Header from "./Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import LoadingSpinner2 from '../common/LoadingSpinner2'; // Ensure the path is correct
import axiosInstance from '@/components/axiosInstance'; // Import the Axios instance

export default function CampDashboard({ onLogout }) {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [loading, setLoading] = useState(true); // Add loading state
  const [campgrpInfo, setCampgrpInfo] = useState({
    name: "",
    email: "",
    governorate: "",
    telephone: "",
    chefName: "",
    picture: "",
    creationDate: "",
    socialMediaLink: "",
    comments: ""
  });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('campgrpLoggedIn');
    if (!loggedIn) {
      navigate('/logingrp');
    } else {
      const email = localStorage.getItem('campgrpEmail');
      fetchCampgrpInfo(email);
    }
  }, [navigate]);

  const fetchCampgrpInfo = async (email) => {
    try {
      const response = await axiosInstance.get(`/campgrpInfo?email=${email}`);
      if (response.status === 200) {
        const data = response.data;
        setCampgrpInfo({
          name: data.name,
          email: data.email,
          governorate: data.governorate,
          telephone: data.telephone,
          chefName: data.chefName,
          picture: data.picture,
          creationDate: data.creationDate,
          socialMediaLink: data.socialMediaLink,
          comments: data.comments
        });
      } else {
        toast.error('Failed to fetch camping group info');
      }
    } catch (error) {
      toast.error('Error fetching camping group info');
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setCampgrpInfo({
      ...campgrpInfo,
      [name]: files ? files[0] : value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwords;

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\-_ ]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      toast.error('Password must be at least 8 characters long and include at least one letter and one number');
      return;
    }

    try {
      const response = await axiosInstance.post('/updatePasswordgrp', {
        email: campgrpInfo.email,
        oldPassword,
        newPassword,
      });

      if (response.status === 200) {
        toast.success('Password updated successfully');
      } else {
        toast.error(response.data.message || 'Failed to update password');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error updating password');
      }
    }
  };

  const currentYear = new Date().getFullYear();

  const handleSaveChanges = async () => {
    // Validation for creationDate
    const creationYear = parseInt(campgrpInfo.creationDate, 10);
    if (creationYear < 2010 || creationYear > currentYear) {
      toast.error(`Creation year must be between 2010 and ${currentYear}`, {
        position: "bottom-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setLoading(true); // Set loading to true when saving changes
    try {
      const formDataToSend = new FormData();
      for (const key in campgrpInfo) {
        formDataToSend.append(key, campgrpInfo[key]);
      }

      const response = await axiosInstance.post('/updateCampgrpinfos', formDataToSend);

      if (response.status === 200) {
        toast.success('Profile updated successfully');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      toast.error('Error updating profile');
    } finally {
      setLoading(false); // Set loading to false after the operation
    }
  };

  return (
    <div className={`dashboard ${sideBarOpen ? "-is-sidebar-visible" : ""} js-dashboard`}>
      <Sidebargrp setSideBarOpen={setSideBarOpen} onLogout={onLogout} />
      <div className="dashboard__content">
        <Header setSideBarOpen={setSideBarOpen} />
        <div className="dashboard__content_content">
          <h1 className="text-30">Hi {campgrpInfo.chefName}</h1>
          <p>Feel free to modify your camping group information in the forms below:</p>
          <div className="mt-50 rounded-12 bg-white shadow-2 px-40 pt-40 pb-30">
            {loading ? (
              <div className="spinner-section">
                <LoadingSpinner2 />
              </div>
            ) : (
              <>
                <h5 className="text-20 fw-500 mb-30">Camping Group Details</h5>
                {campgrpInfo.picture && (
                  <div className="image-preview">
                    <img
                      src={campgrpInfo.picture}
                      alt="Profile"
                      className="img-thumbnail"
                    />
                  </div>
                )}
                <div className="contactForm row y-gap-30">
                  <div className="col-md-6">
                    <div className="form-input">
                      <input placeholder="Group Name" type="text" name="name" value={campgrpInfo.name} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-input">
                      <input placeholder="Email" type="email" name="email" value={campgrpInfo.email} onChange={handleChange} disabled required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-input">
                      <select name="governorate" value={campgrpInfo.governorate} onChange={handleChange} required>
                        <option value="" disabled>Select Your Governorate</option>
                        <option value="Ariana">Ariana</option>
                        <option value="Beja">Beja</option>
                        <option value="Ben Arous">Ben Arous</option>
                        <option value="Bizerte">Bizerte</option>
                        <option value="Gabes">Gabes</option>
                        <option value="Gafsa">Gafsa</option>
                        <option value="Jendouba">Jendouba</option>
                        <option value="Kairouan">Kairouan</option>
                        <option value="Kasserine">Kasserine</option>
                        <option value="Kebili">Kebili</option>
                        <option value="Kef">Kef</option>
                        <option value="Mahdia">Mahdia</option>
                        <option value="Manouba">Manouba</option>
                        <option value="Medenine">Medenine</option>
                        <option value="Monastir">Monastir</option>
                        <option value="Nabeul">Nabeul</option>
                        <option value="Sfax">Sfax</option>
                        <option value="Sidi Bouzid">Sidi Bouzid</option>
                        <option value="Siliana">Siliana</option>
                        <option value="Sousse">Sousse</option>
                        <option value="Tataouine">Tataouine</option>
                        <option value="Tozeur">Tozeur</option>
                        <option value="Tunis">Tunis</option>
                        <option value="Zaghouan">Zaghouan</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-input">
                      <input placeholder="Phone" type="text" name="telephone" value={campgrpInfo.telephone} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-input">
                      <input placeholder="Chef Name" type="text" name="chefName" value={campgrpInfo.chefName} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-input">
                      <input placeholder="Picture" type="file" name="picture" onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-input">
                      <input placeholder="Creation Year (e.g., 2010)" type="number" name="creationDate" value={campgrpInfo.creationDate} onChange={handleChange} min="2010" max={currentYear} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-input">
                      <input placeholder="Social Media Link" type="text" name="socialMediaLink" value={campgrpInfo.socialMediaLink} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-input">
                      <textarea placeholder="Comments" rows="4" name="comments" value={campgrpInfo.comments} onChange={handleChange} required></textarea>
                    </div>
                  </div>
                </div>
                <button className="button -md -dark-1 bg-accent-1 text-white mt-30" onClick={handleSaveChanges}>
                  Save Changes
                  <i className="icon-arrow-top-right ml-10"></i>
                </button>
              </>
            )}
          </div>
          <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 mt-30">
            <h5 className="text-20 fw-500 mb-30">Change Password</h5>
            <div className="contactForm y-gap-30">
              <div className="row y-gap-30">
                <div className="col-md-12">
                  <div className="form-input">
                    <input placeholder="Old password" type="password" name="oldPassword" value={passwords.oldPassword} onChange={handlePasswordChange} required />
                  </div>
                </div>
              </div>
              <div className="row y-gap-30">
                <div className="col-md-6">
                  <div className="form-input">
                    <input placeholder="New password" type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} required />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input">
                    <input placeholder="Confirm new password" type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} required />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button className="button -md -dark-1 bg-green-3 text-white" onClick={handleChangePassword} style={{ width: '100%' }}>
                    Save Changes
                    <i className="icon-arrow-top-right text-16 ml-10"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center pt-30">
            © Copyright Campspotter {new Date().getFullYear()}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

CampDashboard.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
