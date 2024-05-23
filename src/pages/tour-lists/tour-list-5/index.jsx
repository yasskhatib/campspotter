import Hero1 from "@/components/homes/heros/Hero1";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import TourList4 from "@/components/tours/TourList4";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Tour-list-5 || Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function TourListPage5() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <Hero1 />

        <div className="mt-50">
          <TourList4 />
        </div>

        <FooterOne />
      </main>
    </>
  );
}
