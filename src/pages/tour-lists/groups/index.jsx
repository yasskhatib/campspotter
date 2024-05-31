import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import PageHeader2 from "@/components/tours/PageHeader2";
import CampGrpList from "@/components/tours/CampGrpList";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Camp Groups - Campspotter",
  description: "Campspotter - Adventure Made Easy!",
};

export default function CampGrpListPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <PageHeader2 />
        <CampGrpList />
        <FooterOne />
      </main>
    </>
  );
}
