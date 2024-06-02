import DBMain from "@/components/dasboard/main";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Main Dashboard - Campspotter",
  description: "Campspotter - Adventure Made Easy!",
};

 
export default function DBMainPage() {
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
        <DBMain onLogout={handleLogout} />
      </main>
    </>
  );
}
