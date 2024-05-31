import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import PageHeader from "@/components/tours/PageHeader2";
import GrpList from "@/components/tours/GrpList";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Camp Groups List - Campspotter",
  description: "Campspotter - Adventure Made Easy!",
};

export default function Grplistpage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <PageHeader />
        <GrpList />
        <FooterOne />
      </main>
    </>
  );
}
