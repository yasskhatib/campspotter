import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Login from "@/components/pages/Login";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Login - Campspotter",
  description: "Login - Campspotter",
};

export default function LoginPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <Login />
        <FooterOne />
      </main>
    </>
  );
}
