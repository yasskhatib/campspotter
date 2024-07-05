import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '@/components/axiosInstance'; // Import the Axios instance

export default function Logingrp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/loginCampgrp', formData);

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('campgrpLoggedIn', true);
        localStorage.setItem('campgrpEmail', formData.email);

        toast.success('Login successful', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        navigate('/campgrp-dashboard');
      } else {
        toast.error('Authentication failed, please check your credentials.', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error('Login failed: ' + (error.response?.data?.message || 'Network Error'), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast.error('Please enter your email address first.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const response = await axiosInstance.get(`/forgotPasswordCampgrp?email=${formData.email}`);
      const data = response.data;

      if (response.status === 200) {
        toast.success(data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error('Failed to send reset link: ' + (error.response?.data?.message || 'Network Error'), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <section className="mt-header layout-pt-lg layout-pb-lg bg-img3">
      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-6 col-lg-7 col-md-9">
            <div className="text-center mb-20 md:mb-20" style={{ color: 'white' }}>
              <h1 className="text-60" style={{ color: 'white' }}>Log In for Camping Group</h1>
              <div className="mt-5">
                Don&apos;t have an account?{" "}
                <Link to="/registergrp" className="text-accent-1" style={{ color: '#ffff' }}>
                  Sign Up!
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contactForm border-1 rounded-12 px-60 py-60 md:px-25 md:py-30" style={{ backgroundColor: 'white' }}>
              <div className="form-input">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-input mt-30">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row y-ga-10 justify-between items-center pt-30">
                <div className="col-auto">
                  <a href="#" onClick={handleForgotPassword}>Lost your password?</a>
                </div>
              </div>

              <button type="submit" className="button -md -dark-1 bg-accent-1 text-white col-12 mt-30">
                Log In
                <i className="icon-arrow-top-right ml-10"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
