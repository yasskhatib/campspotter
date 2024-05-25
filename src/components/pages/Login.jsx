import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) {
      navigate('/db-profile');
    }
  }, [navigate]);

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
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.indexOf('application/json') !== -1) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (response.ok) {
        if (typeof data === 'string') {
          // Handle plain text response
          localStorage.setItem('fullName', formData.email); // Use email as a fallback
        } else {
          // Handle JSON response
          localStorage.setItem('fullName', data.fullName);
        }

        toast.success('Login successful', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        localStorage.setItem('loggedIn', true);
        localStorage.setItem('userEmail', formData.email);
        navigate('/db-profile');
      } else {
        if (typeof data === 'string') {
          // Handle plain text error response
          toast.error(data, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          // Handle JSON error response
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
      }
    } catch (error) {
      toast.error('Error: ' + error.message, {
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
    <section className="mt-header layout-pt-lg layout-pb-lg bg-img">
      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-6 col-lg-7 col-md-9">
            <div className="text-center mb-60 md:mb-30" style={{ color: 'white' }}>
              <h1 className="text-60" style={{ color: 'white' }}>Log In</h1>
              <div className="mt-5">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="text-accent-1" style={{ color: '#ffff' }}>
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
                <label className="lh-1 text-16 text-light-1">Email Address</label>
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
                <label className="lh-1 text-16 text-light-1">Password</label>
              </div>

              <div className="row y-ga-10 justify-between items-center pt-30">
                <div className="col-auto">
                  <div className="d-flex items-center">
                    <div className="form-checkbox">
                      <input type="checkbox" name="remember" />
                      <div className="form-checkbox__mark">
                        <div className="form-checkbox__icon">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.29082 0.971021C9.01235 0.692189 8.56018 0.692365 8.28134 0.971021L3.73802 5.51452L1.71871 3.49523C1.43988 3.21639 0.987896 3.21639 0.709063 3.49523C0.430231 3.77406 0.430231 4.22604 0.709063 4.50487L3.23309 7.0289C3.37242 7.16823 3.55512 7.23807 3.73783 7.23807C3.92054 7.23807 4.10341 7.16841 4.24274 7.0289L9.29082 1.98065C9.56965 1.70201 9.56965 1.24984 9.29082 0.971021Z" fill="white" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="lh-11 ml-10">Remember me</div>
                  </div>
                </div>

                <div className="col-auto">
                  <a href="#">Lost your password?</a>
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
