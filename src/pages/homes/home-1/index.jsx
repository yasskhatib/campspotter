import ArticlesThree from "@/components/homes/articles/Articlestwo";
import Banner from "@/components/homes/banners/Bannerfour";
import DestinationsOne from "@/components/homes/destinations/DestinationsOne";
import FeaturesOne from "@/components/homes/features/FeaturesOne";
import Hero1 from "@/components/homes/heros/Hero1";
import Testimonialstwo from "@/components/homes/testimonials/TestimonialsTwo";
import Tour1 from "@/components/homes/tours/Tour1";
import TourSlderOne from "@/components/homes/tours/TourSlderOne";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function HomePage1() {
  return (
    <main>
      <MetaComponent meta={metadata} />
      <Header1 />
      <Hero1 />
      <FeaturesOne />
      <DestinationsOne />
      <Tour1 />
      <Banner />
      <br></br>
      <TourSlderOne />
      <br></br>
      <Testimonialstwo />
      <br></br>
      <ArticlesThree />
      <br></br>
      <FooterOne />
    </main>
  );
}
