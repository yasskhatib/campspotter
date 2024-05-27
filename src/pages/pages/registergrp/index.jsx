import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Registergrp from "@/components/pages/Registergrp";
//import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Signup Group - Campspotter",
  description: "Signup Group - Campspotter",
};

export default function RegisterCampgrp() {
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
