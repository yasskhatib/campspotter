import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '@/components/axiosInstance'; // Ensure correct path
import LoadingSpinner3 from '../common/LoadingSpinner3'; // Ensure correct path

export default function RegisterCampgrp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: '',
    governorate: '',
    chefName: '',
    picture: null,
    creationDate: '',
    socialMediaLink: '',
    comments: '',
    password: '',
    confirmPassword: ''
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('campgrpLoggedIn');
    if (loggedIn) {
      navigate('/campgrp-dashboard'); // Redirect to dashboard if already logged in
    }
  }, [navigate]);

  const currentYear = new Date().getFullYear();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'picture') {
      setFormData({
        ...formData,
        picture: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleVerificationChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading spinner

    if (isVerificationSent) {
      // Handle verification code submission
      try {
        console.log(`Verification code submission data: ${JSON.stringify({ verificationCode, ...formData })}`);
        const formDataToSend = new FormData();
        formDataToSend.append('verificationCode', verificationCode);
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }

        const response = await axiosInstance.post('/verifyCampgrp', formDataToSend);

        setIsLoading(false); // Stop loading spinner

        if (response.status === 201) {
          console.log(`Verification response: ${JSON.stringify(response.data)}`);
          toast.success('Email verified successfully. Camping group registered.', {
            position: "bottom-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setFormData({
            name: '',
            email: '',
            telephone: '',
            governorate: '',
            chefName: '',
            picture: null,
            creationDate: '',
            socialMediaLink: '',
            comments: '',
            password: '',
            confirmPassword: ''
          });
          setVerificationCode('');
          setIsVerificationSent(false);
          setRemainingAttempts(3); // Reset attempts
          setTimeout(() => {
            navigate('/logingrp'); // Redirect to login after success
          }, 3000); // Redirect after 3 seconds
        }
      } catch (error) {
        setIsLoading(false); // Stop loading spinner
        setRemainingAttempts(prev => prev - 1);

        if (remainingAttempts <= 1) {
          toast.error('You have reached the attempts limit', {
            position: "bottom-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark", // Dark theme for toast
          });
          setFormData({
            name: '',
            email: '',
            telephone: '',
            governorate: '',
            chefName: '',
            picture: null,
            creationDate: '',
            socialMediaLink: '',
            comments: '',
            password: '',
            confirmPassword: ''
          });
          setVerificationCode('');
          setIsVerificationSent(false);
          setRemainingAttempts(3); // Reset attempts
        } else {
          console.log(`Error response data: ${JSON.stringify(error.response.data)}`);
          toast.error(error.response.data.message || 'Verification code is incorrect', {
            position: "bottom-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark", // Dark theme for toast
          });
        }
      }
    } else {
      // Handle initial registration submission
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\-_ ]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        setIsLoading(false); // Stop loading spinner
        toast.error('Password must be at least 8 characters long and include at least one letter and one number', {
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

      if (formData.password !== formData.confirmPassword) {
        setIsLoading(false); // Stop loading spinner
        toast.error('Passwords do not match', {
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

      const creationYear = parseInt(formData.creationDate, 10);
      if (creationYear < 2010 || creationYear > currentYear) {
        setIsLoading(false); // Stop loading spinner
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

      try {
        console.log(`Initial registration data: ${JSON.stringify(formData)}`);

        const response = await axiosInstance.post('/init-registerCampgrp', formData);

        setIsLoading(false); // Stop loading spinner

        if (response.status === 200) {
          console.log(`Initial registration response: ${JSON.stringify(response.data)}`);
          toast.success('Verification code sent to email.', {
            position: "bottom-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setIsVerificationSent(true);
        }
      } catch (error) {
        setIsLoading(false); // Stop loading spinner
        toast.error(error.response.data.message || 'Error initiating registration', {
          position: "bottom-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <section className="mt-header layout-pt-lg layout-pb-lg bg-img3">
      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-6 col-lg-7 col-md-9">
            <div className="text-center mb-20 md:mb-20" style={{ color: 'white' }}>
              <h1 className="text-60" style={{ color: 'white' }}>Signup for Camping Group</h1>
              <div className="mt-5" style={{ color: '#ffff' }}>
                Already have an account?{" "}
                <Link to="/logingrp" className="text-accent-1">
                  Log In!
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contactForm border-1 rounded-12 px-60 py-60 md:px-25 md:py-30" style={{ backgroundColor: 'white' }}>
              {!isVerificationSent ? (
                <>
                  <div className="form-input">
                    <input type="text" name="name" placeholder="Group Name" value={formData.name} onChange={handleChange} required />
                  </div>

                  <div className="form-input mt-30">
                    <input type="text" name="chefName" placeholder="Chef Name" value={formData.chefName} onChange={handleChange} required />
                  </div>

                  <div className="form-input mt-30">
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                  </div>

                  <div className="form-input mt-30">
                    <input type="number" name="telephone" placeholder="Telephone" value={formData.telephone} onChange={handleChange} required autoComplete="off" />
                  </div>

                  <div className="form-input mt-30" required>
                    <select name="governorate" value={formData.governorate} onChange={handleChange} required>
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

                  <div className="form-input mt-30">
                    <input type="number" name="creationDate" placeholder="Creation Year (e.g., 2010)" value={formData.creationDate} onChange={handleChange} min="2010" max={currentYear} required autoComplete="off" />
                  </div>

                  <div className="form-input mt-30">
                    <input type="text" name="socialMediaLink" placeholder="Social Media Link" value={formData.socialMediaLink} onChange={handleChange} required autoComplete="off" />
                  </div>

                  <div className="form-input mt-30">
                    <input type="text" name="comments" placeholder="Description" value={formData.comments} onChange={handleChange} required autoComplete="off" />
                  </div>

                  <div className="form-input mt-30">
                    <input type="file" name="picture" onChange={handleChange} required />
                  </div>

                  <div className="form-input mt-30">
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                  </div>

                  <div className="form-input mt-30">
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                  </div>

                  <button type="submit" className="button -md -dark-1 bg-accent-1 text-white col-12 mt-30">
                    {isLoading ? (
                      <>
                        <LoadingSpinner3 /> {/* Show loading spinner */}
                      </>
                    ) : (
                      <>
                        Register
                        <i className="icon-arrow-top-right ml-10"></i>
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                    <label htmlFor="verificationCode" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Verification code</label>

                  <div className="form-input mt-10 mb-10">
                    <input type="text" name="verificationCode" placeholder="Enter Verification Code" value={verificationCode} onChange={handleVerificationChange} required />
                  </div>
                    <small>Remaining attempts: {remainingAttempts}</small>

                  <button type="submit" className="button -md -dark-1 bg-accent-1 text-white col-12 mt-30">
                    {isLoading ? (
                      <>
                        <LoadingSpinner3 /> {/* Show loading spinner */}
                      </>
                    ) : (
                      <>
                        Verify
                        <i className="icon-arrow-top-right ml-10"></i>
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
