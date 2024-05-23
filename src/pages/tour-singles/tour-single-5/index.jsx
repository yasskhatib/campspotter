import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import PageHeader from "@/components/tourSingle/PageHeader";
import TourSlider from "@/components/tourSingle/TourSlider";
import SingleFive from "@/components/tourSingle/pages/SingleFive";
import { allTour } from "@/data/tours";
import { useParams } from "react-router-dom";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Tour-single-5 || Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function TourSinglePage5() {
  let params = useParams();
  const id = params.id;
  const tour = allTour.find((item) => item.id == id) || allTour[0];

  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <PageHeader />

        <SingleFive tour={tour} />
        <TourSlider />
        <FooterOne />
      </main>
    </>
  );
}
