import ArticlesOne from "@/components/homes/articles/ArticlesOne";
import SpacialOffer from "@/components/homes/others/SpacialOffer";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Hero from "@/components/pages/destinations/Hero";
import Information from "@/components/pages/destinations/Information";
import TourList1 from "@/components/pages/destinations/TourList";
import TourSlider from "@/components/pages/destinations/TourSlider";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Destinations || Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function DestinationsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <Hero />
        <SpacialOffer />
        <TourSlider />
        <TourList1 />
        <Information />
        <ArticlesOne />
        <FooterOne />
      </main>
    </>
  );
}
