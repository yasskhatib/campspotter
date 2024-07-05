import Favorites from "@/components/dasboard/Fevorite";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Dashboard-favorites || Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function DBFavoritesPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Favorites />
      </main>
    </>
  );
}
