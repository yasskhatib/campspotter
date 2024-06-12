import AddBlog from "@/components/dasboard/AddBlog";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Add Article - Campspotter",
  description: "Campspotter - Adventure Made Easy!",
};

export default function DBAddBlogPage() {
  const handleLogout = () => {
    // Logic to handle logout
    localStorage.removeItem('campgrpLoggedIn');
    localStorage.removeItem('campgrpEmail');
    localStorage.removeItem('campgrpName');
    window.location.href = '/logingrp';
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <AddBlog onLogout={handleLogout} />
      </main>
    </>
  );
}
