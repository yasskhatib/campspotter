import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "@/components/dasboard/Profile";
import MetaComponent from "@/components/common/MetaComponent";

export default function DBProfilePage() {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    governorate: "",
    telephone: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
      navigate('/login');
    } else {
      const email = localStorage.getItem('userEmail');
      fetchUserInfo(email);
    }
  }, [navigate]);

  const fetchUserInfo = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/userinfo?email=${email}`);
      if (response.ok) {
        const data = await response.json();
        setUserInfo({
          fullName: data.fullName,
          email: data.email,
          governorate: data.governorate,
          telephone: data.telephone
        });
        // Display alert with user information
        alert(`Full Name: ${data.fullName}\nEmail: ${data.email}\nGovernorate: ${data.governorate}\nTelephone: ${data.telephone}`);
      } else {
        console.error('Failed to fetch user info');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('fullName');
    localStorage.removeItem('governorate');
    localStorage.removeItem('telephone');
    navigate('/login');
  };

  const metadata = {
    title: `${userInfo.fullName} Dashboard || Campspotter - Adventure Made Easy!`,
    description: "Campspotter - Adventure Made Easy!",
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Profile onLogout={handleLogout} />
      </main>
    </>
  );
}
