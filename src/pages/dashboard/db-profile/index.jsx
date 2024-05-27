/* eslint-disable no-unused-vars */
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
      } else {
        console.error('Failed to fetch user info');
        navigate('/login'); // Redirect to loginCampgrp if no camp group user is logged in

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
    title: `${userInfo.fullName} Dashboard - Campspotter`,
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
