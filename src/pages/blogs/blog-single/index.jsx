import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Hero1 from "@/components/blogs/Hero1";
import BlogSingle from "@/components/blogs/BlogSingle";
import { blogs } from "@/data/blogs";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Blog-single || Campspotter - Adventure Made Easy!",
  description: "Campspotter - Adventure Made Easy!",
};

export default function BlogSinglePage() {
  let params = useParams();
  const id = params.id;
  const blog = blogs.find((item) => item.id == id) || blogs[0];

  return (
    <>
      <MetaComponent meta={metadata} />

      <main>
        <Header1 />
        <Hero1 blog={blog} />
        <BlogSingle />
        <FooterOne />
      </main>
    </>
  );
}
