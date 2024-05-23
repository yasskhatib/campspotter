import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import PageHeader from "@/components/tours/PageHeader";
import TourList2 from "@/components/tours/TourList2";
import TourTypes from "@/components/tours/TourTypes";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Tour-list-2 || Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function TourListPage2() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <PageHeader />

        <TourList2 />
        <FooterOne />
      </main>
    </>
  );
}
