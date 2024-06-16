import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Register from "@/components/pages/Register";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Signup Camper - Campspotter",
  description: "Signup Camper - Campspotter",
};

export default function RegisterPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const camperLoggedIn = localStorage.getItem('loggedIn');
    const campgrpLoggedIn = localStorage.getItem('campgrpLoggedIn');



    if (campgrpLoggedIn) {
      navigate('/campgrp-dashboard');
    } else if (camperLoggedIn) {
      navigate('/db-profile');
    }
  }, [navigate]);
  
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <Register />
        <FooterOne />
      </main>
    </>
  );
}
