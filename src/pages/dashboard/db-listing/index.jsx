import DBListing from "@/components/dasboard/DBListing";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Dashboard-listing || Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function DBListingPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <DBListing />
      </main>
    </>
  );
}
