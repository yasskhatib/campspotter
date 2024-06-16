import { Link, useNavigate } from "react-router-dom";
import  { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '@/components/axiosInstance'; // Ensure correct path

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    telephone: '',
    governorate: '',
    password: '',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
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
      const response = await axiosInstance.post('/register', formData);
      if (response.status === 200) {
        toast.success('User registered successfully', {
          position: "bottom-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFormData({
          fullName: '',
          email: '',
          telephone: '',
          governorate: '',
          password: '',
        });
      } else {
        toast.error(response.data.message, {
          position: "bottom-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error('Error: ' + error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
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

              <button className="button -md -dark-1 bg-accent-1 text-white col-12 mt-30">
                Register
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
