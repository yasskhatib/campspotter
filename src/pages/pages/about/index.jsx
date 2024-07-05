import BannerOne from "@/components/homes/banners/BannerOne";
import FeaturesOne from "@/components/homes/features/FeaturesOne";
import FeturesTwo from "@/components/homes/features/FeturesTwo";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Banner from "@/components/pages/about/Banner";
import Hero from "@/components/pages/about/Hero";
import Information from "@/components/pages/about/Information";
import Team from "@/components/pages/about/Team";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "About || Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function AboutPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <Hero />
        <Information />
        <Banner />
        <FeaturesOne />
        <div className="mt-60">
          <FeturesTwo />
        </div>
        <BannerOne />
        <Team />
        <FooterOne />
      </main>
    </>
  );
}
