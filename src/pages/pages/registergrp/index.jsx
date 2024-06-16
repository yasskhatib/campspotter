import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Registergrp from "@/components/pages/Registergrp";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Signup Group - Campspotter",
  description: "Signup Group - Campspotter",
};

export default function RegisterCampgrp() {

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
        <Registergrp />
        <FooterOne />
      </main>
    </>
  );
}
