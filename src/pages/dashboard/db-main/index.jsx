import DBMain from "@/components/dasboard/main";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Dashboard-main || Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function DBMainPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <DBMain />
      </main>
    </>
  );
}
