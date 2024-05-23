import AddTour from "@/components/dasboard/AddTour";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Dashboard-add-tour || Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function DBAddTourPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <AddTour />
      </main>
    </>
  );
}
