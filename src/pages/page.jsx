import React from "react";
import Firstpage from "./(homes)/home-1/page";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function page() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Firstpage />
    </>
  );
}
