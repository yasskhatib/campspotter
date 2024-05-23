import Profile from "@/components/dasboard/Profile";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Dashboard-my-profile || Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function DBProfilePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Profile />
      </main>
    </>
  );
}
