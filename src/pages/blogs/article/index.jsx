import { useState, useEffect } from 'react';
import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import BlogSingle from "@/components/blogs/BlogSingle";
import MetaComponent from "@/components/common/MetaComponent";

export default function BlogSinglePage() {
  const [blogTitle, setBlogTitle] = useState('Campspotter - Adventure Made Easy!');

  useEffect(() => {
    document.title = `${blogTitle} || Campspotter - Adventure Made Easy!`;
  }, [blogTitle]);

  return (
    <>
      <MetaComponent meta={{ title: blogTitle, description: "Discover the adventure with Campspotter!" }} />
      <main>
        <Header1 />
        <BlogSingle setBlogTitle={setBlogTitle} />
        <FooterOne />
      </main>
    </>
  );
}
