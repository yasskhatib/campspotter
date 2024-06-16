import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../../axiosInstance'; // Import the Axios instance
import HeaderSerch from "../components/HeaderSerch";
import MobileMenu from "../components/MobileMenu";

export default function Header1() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addClass, setAddClass] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [dashboardLink, setDashboardLink] = useState("");

  const pageNavigate = (pageName) => {
    navigate(pageName);
  };

  // Add a class to the element when scrolled 50px
  const handleScroll = () => {
    if (window.scrollY >= 50) {
      setAddClass(true);
    } else {
      setAddClass(false);
    }
  };

  const fetchCampgrpName = async (email) => {
    try {
      const response = await axiosInstance.get(`/campgrpInfo?email=${email}`);
      if (response.status === 200) { // Check if the response status is 200
        const data = response.data;
        localStorage.setItem('campgrpName', data.name);
        return data.name;
      } else {
        console.error('Failed to fetch camping group info');
        return null;
      }
    } catch (error) {
      console.error('Error fetching camping group info:', error);
      return null;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Check if either a camper or a campgrp is logged in
    const camperLoggedIn = localStorage.getItem('loggedIn');
    const campgrpLoggedIn = localStorage.getItem('campgrpLoggedIn');

    if (camperLoggedIn || campgrpLoggedIn) {
      setIsLoggedIn(true);

      if (camperLoggedIn) {
        const fullName = localStorage.getItem('fullName');
        setUsername(fullName || "User");
        setDashboardLink('/db-profile');
      } else if (campgrpLoggedIn) {
        const campgrpEmail = localStorage.getItem('campgrpEmail');
        fetchCampgrpName(campgrpEmail).then(campgrpName => {
          setUsername(campgrpName || "Group");
          setDashboardLink('/campgrp-dashboard');
        });
      }
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    if (localStorage.getItem('loggedIn')) {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('fullName');
      localStorage.removeItem('userEmail');
    } else if (localStorage.getItem('campgrpLoggedIn')) {
      localStorage.removeItem('campgrpLoggedIn');
      localStorage.removeItem('campgrpName');
      localStorage.removeItem('campgrpEmail');
    }
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleMobileProfileClick = () => {
    if (localStorage.getItem('loggedIn')) {
      navigate('/db-profile');
    } else if (localStorage.getItem('campgrpLoggedIn')) {
      navigate('/campgrp-dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <header
        className={`header -type-1 js-header ${addClass ? "-is-sticky" : ""}`}
      >
        <div className="header__container container">
          <div className="headerMobile__left">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="header__menuBtn js-menu-button"
            >
              <i className="icon-main-menu"></i>
            </button>
          </div>

          <div className="header__logo">
            <Link to="/" className="header__logo">
              <img src="/img/general/logo-1.svg" alt="logo icon" />
            </Link>

            <div className="xl:d-none ml-30">
              <HeaderSerch />
            </div>
          </div>

          <div className="headerMobile__right">
            <button
              onClick={() => pageNavigate("/tour-list-1")}
              className="d-flex"
            >
              <i className="icon-search text-18"></i>
            </button>

            <button
              onClick={handleMobileProfileClick}
              className="d-flex ml-20"
            >
              <i className="icon-person text-18"></i>
            </button>
          </div>

          <div className="header__right">
            <Link to="/" className="ml-30">
              Home
            </Link>
            <Link to="/camps" className="ml-30">
              Camping list
            </Link>
            <Link to="/groups" className="ml-30">
              Group list
            </Link>

            {!isLoggedIn ? (
              <>
                <Link to="/register" className="ml-30">
                  Join as Camper
                </Link>
                <Link
                  to="/registergrp"
                  className="ml-30"
                  style={{ fontWeight: 'bold' }}
                >
                  Join as Group
                </Link>
                <Link
                  to="/login"
                  className="button -sm -dark-1 bg-green-3 rounded-200 text-white ml-40"
                >
                  Log in
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate(dashboardLink)}
                  className="button -sm -dark-1 bg-blue-1 rounded-200 text-white ml-30"
                >
                  Hi {username}
                </button>
                <button
                  onClick={handleLogout}
                  className="button -sm -dark-1 bg-green-3 rounded-200 text-white ml-10"
                >
                  Logout
                </button>
              </>
            )}

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="header__menuBtn ml-30 js-menu-button"
            >
              <i className="icon-main-menu"></i>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}
