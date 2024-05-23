import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Content from "@/components/pages/terms/Content";
import PageHeader from "@/components/pages/terms/PageHeader";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Terms || Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function TermsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <PageHeader />
        <Content />
        <FooterOne />
      </main>
    </>
  );
}
