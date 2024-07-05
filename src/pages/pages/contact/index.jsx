import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import ContactForm from "@/components/pages/contact/ContactForm";
import Locations from "@/components/pages/contact/Locations";
import Map from "@/components/pages/contact/Map";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Contact || Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function ContactPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <Map />
        <Locations />
        <ContactForm />

        <FooterOne />
      </main>
    </>
  );
}
