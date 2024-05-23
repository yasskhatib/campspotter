import Header1 from "@/components/layout/header/Header1";
import TourList6 from "@/components/tours/TourList6";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Tour-list-8 || Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function TourListPage8() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <TourList6 />
      </main>
    </>
  );
}
