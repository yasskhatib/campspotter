import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner2 from '../common/LoadingSpinner2'; // Ensure the path is correct
import axiosInstance from '@/components/axiosInstance'; // Ensure correct path

export default function Profile({ onLogout }) {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [loading, setLoading] = useState(true); // Add loading state
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    governorate: "",
    telephone: ""
  });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    fetchUserInfo(email);
  }, []);

  const fetchUserInfo = async (email) => {
    try {
      const response = await axiosInstance.get(`/userinfo?email=${email}`);
      if (response.status === 200) {
        const data = response.data;
        setUserInfo({
          fullName: data.fullName,
          email: data.email,
          governorate: data.governorate,
          telephone: data.telephone
        });
      } else {
        toast.error('Failed to fetch user info');
      }
    } catch (error) {
      toast.error('Error fetching user info');
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value
    });
  };

  const handleSaveChanges = async () => {
    setLoading(true); // Set loading to true when saving changes
    try {
      const response = await axiosInstance.post(`/updateProfile`, userInfo);
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

  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwords;
    if (newPassword !== confirmPassword) {
      toast.info('New passwords do not match');
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za\d]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      toast.error('Password must be at least 8 characters long and include at least one letter and one number');
      return;
    }
    setLoading(true); // Set loading to true when changing password
    try {
      const response = await axiosInstance.post(`/changePassword`, {
        email: userInfo.email,
        oldPassword,
        newPassword
      });
      if (response.status === 200) {
        toast.success('Password changed successfully');
        setPasswords({
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      } else {
        toast.error('Password change failed: The old password is incorrect.');
      }
    } catch (error) {
      toast.error('Error changing password');
    } finally {
      setLoading(false); // Set loading to false after the operation
    }
  };

  return (
    <div className={`dashboard ${sideBarOpen ? "-is-sidebar-visible" : ""} js-dashboard`}>
      <Sidebar setSideBarOpen={setSideBarOpen} onLogout={onLogout} />
      <div className="dashboard__content">
        <Header setSideBarOpen={setSideBarOpen} />
        <div className="dashboard__content_content">
          <h1 className="text-30">Hi {userInfo.fullName}</h1>
          <p>Feel free to modify your profile information in the forms below:</p>
          <div className="mt-50 rounded-12 bg-white shadow-2 px-40 pt-40 pb-30">
            {loading ? (
              <div className="spinner-section">
                <LoadingSpinner2 />
              </div>
            ) : (
              <>
                <h5 className="text-20 fw-500 mb-30">Profile Details</h5>
                <div className="contactForm row y-gap-30">
                  <div className="col-md-6">
                    <div className="form-input">
                      <input disabled placeholder="Fullname" type="text" name="fullName" value={userInfo.fullName} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-input">
                      <input placeholder="Email" type="email" name="email" value={userInfo.email} onChange={handleChange} required disabled />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-input">
                      <select name="governorate" value={userInfo.governorate} onChange={handleChange} required>
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
                      <input placeholder="Phone" type="text" name="telephone" value={userInfo.telephone} onChange={handleChange} required />
                    </div>
                  </div>
                </div>
                <button className="button -md -dark-1 bg-green-2 text-white mt-30" onClick={handleSaveChanges} style={{ width: '100%' }}>
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
              
              <div className="row">
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

Profile.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
