import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import UiElements from "@/components/pages/uiElements";
import PageHeader from "@/components/pages/uiElements/PageHeader";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "UI-elements || Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function UIElementsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <PageHeader />
        <UiElements />
        <FooterOne />
      </main>
    </>
  );
}
