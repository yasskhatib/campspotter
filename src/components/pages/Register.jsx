import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '@/components/axiosInstance'; // Ensure correct path
import LoadingSpinner3 from '../common/LoadingSpinner3'; // Ensure correct path

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    telephone: '',
    governorate: '',
    password: '',
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) {
      navigate('/db-profile'); // Redirect to profile or dashboard page if already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
        const response = await axiosInstance.post('/verify', {
          verificationCode,
          fullName: formData.fullName,
          email: formData.email,
          telephone: formData.telephone,
          governorate: formData.governorate,
          password: formData.password
        });

        setIsLoading(false); // Stop loading spinner

        if (response.status === 201) {
          console.log(`Verification response: ${JSON.stringify(response.data)}`);
          toast.success('Email verified successfully. User registered.', {
            position: "bottom-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // Reset form
          setFormData({
            fullName: '',
            email: '',
            telephone: '',
            governorate: '',
            password: '',
          });
          setVerificationCode('');
          setIsVerificationSent(false);
          setRemainingAttempts(3); // Reset attempts
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
          // Reset form
          setFormData({
            fullName: '',
            email: '',
            telephone: '',
            governorate: '',
            password: '',
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

      try {
        console.log(`Initial registration data: ${JSON.stringify(formData)}`);

        const response = await axiosInstance.post('/init-register', formData);

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
    <section className="mt-header layout-pt-lg layout-pb-lg bg-img2">
      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-6 col-lg-7 col-md-9">
            <div className="text-center mb-20 md:mb-20" style={{ color: 'white' }}>
              <h1 className="text-60" style={{ color: 'white' }}>Signup for Camper</h1>
              <div className="mt-5" style={{ color: '#ffff' }}>
                Already have an account?{" "}
                <Link to="/login" className="text-accent-1">
                  Log In!
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contactForm border-1 rounded-12 px-60 py-60 md:px-25 md:py-30" style={{ backgroundColor: 'white' }}>
              {!isVerificationSent ? (
                <>
                  <div className="form-input">
                    <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                  </div>

                  <div className="form-input mt-30">
                    <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                  </div>

                  <div className="form-input mt-30">
                    <input type="number" name="telephone" placeholder="Telephone" value={formData.telephone} onChange={handleChange} required />
                  </div>

                  <div className="form-input mt-30">
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
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                  </div>
                </>
              ) : (
                <>
                  <label htmlFor="verificationCode" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Verification code</label>
                    <div className="form-input mt-10 mb-10">
                    <input id="verificationCode" type="text" placeholder="Enter the verification code" value={verificationCode} onChange={handleVerificationChange} required />
                  </div>
                  <small>Remaining attempts: {remainingAttempts}</small>
                </>
              )}

              <button className="button -md -dark-1 bg-accent-1 text-white col-12 mt-30" style={{ height: '48px' }} disabled={isLoading}>
                {isLoading ? <LoadingSpinner3 /> : (isVerificationSent ? 'Verify Code' : 'Register')}
                {!isLoading && <i className="icon-arrow-top-right ml-10"></i>}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
