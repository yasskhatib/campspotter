import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Hero1 from "@/components/blogs/Hero1";
import BlogList1 from "@/components/blogs/BlogList1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Blogs - Campspotter",
  description: "Campspotter - Adventure Made Easy!",
};

export default function BlogListPage1() {
  return (
    <>
      <MetaComponent meta={metadata} />

      <main>
        <Header1 />
        <Hero1 />
        <BlogList1 />
        <FooterOne />
      </main>
    </>
  );
}
