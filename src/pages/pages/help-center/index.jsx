import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Activity from "@/components/pages/helpCenter/Activity";
import Faq from "@/components/pages/helpCenter/Faq";
import Hero from "@/components/pages/helpCenter/Hero";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Help center || Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function HelpCenterPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
       
        <FooterOne />
      </main>
    </>
  );
}
