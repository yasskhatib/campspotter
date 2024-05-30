import DBListinggrp from "@/components/dasboard/DBListinggrp";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Camps List - Campspotter",
  description: "Campspotter - Adventure Made Easy!",
};

export default function DBListingPage() {
  const handleLogout = () => {
    // Logic to handle logout
    localStorage.removeItem('campgrpLoggedIn');
    localStorage.removeItem('campgrpEmail');
    localStorage.removeItem('campgrpName');
    window.location.href = '/logingrp';
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <DBListinggrp onLogout={handleLogout} />
      </main>
    </>
  );
}
