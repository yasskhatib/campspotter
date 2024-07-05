import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Login from "@/components/pages/Login";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Login - Campspotter",
  description: "Login - Campspotter",
};

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const camperLoggedIn = localStorage.getItem('loggedIn');
    const campgrpLoggedIn = localStorage.getItem('campgrpLoggedIn');

    if (camperLoggedIn) {
      navigate('/db-profile');
    } else if (campgrpLoggedIn) {
      navigate('/campgrp-dashboard');
    }
  }, [navigate]);

  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <Login />
        <FooterOne />
      </main>
    </>
  );
}
