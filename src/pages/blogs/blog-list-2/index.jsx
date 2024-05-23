import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Hero1 from "@/components/blogs/Hero1";
import BlogList2 from "@/components/blogs/BlogList2";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Blog-list-2 || Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function BlogListPage2() {
  return (
    <>
      <MetaComponent meta={metadata} />

      <main>
        <Header1 />
        <Hero1 />
        <BlogList2 />
        <FooterOne />
      </main>
    </>
  );
}
