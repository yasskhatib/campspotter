import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import PageHeader from "@/components/tours/PageHeader";
import TourList3 from "@/components/tours/TourList3";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Camps List - Campspotter",
  description: "Campspotter - Adventure Made Easy!",
};

export default function TourListPage4() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <PageHeader />
        <TourList3 />
        <FooterOne />
      </main>
    </>
  );
}
