import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "@/components/dasboard/Profile";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Dashboard-my-profile || Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function DBProfilePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/login');
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
