import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/style.css";
import Aos from "aos";
import HomePage1 from "./pages/homes/home-1";
import { useEffect } from "react";

import ScrollTopBehaviour from "./components/common/ScrollTopBehavier";
import ScrollToTop from "./components/common/ScrollToTop";

import TourList3 from "./pages/tour-lists/camps";

import GrpList from "./pages/tour-lists/groups";



import TourSinglePage3 from "./pages/tour-singles/tour-single-3";

import DBMainPage from "./pages/dashboard/db-main";
import DBListingPage from "./pages/dashboard/db-listing";

import DBListinggrp from "./pages/dashboard/db-listing-grp";

import DBAddTourPage from "./pages/dashboard/db-add-tour";

import DBAddBlogPage from "./pages/dashboard/db-add-blog";


import DBFavoritesPage from "./pages/dashboard/db-favorites";
import DBMessagesPage from "./pages/dashboard/db-messages";
import DBProfilePage from "./pages/dashboard/db-profile";

import BlogListPage1 from "./pages/blogs/blog";

import BlogSinglePage from "./pages/blogs/article";

import AboutPage from "./pages/pages/about";
import HelpCenterPage from "./pages/pages/help-center";
import TermsPage from "./pages/pages/terms";
import LoginPage from "./pages/pages/login";
import Logincampgrp from "./pages/pages/logingrp";

import DBCampgrpProfilePage from "./pages/dashboard/campgrp-dashboard";

import RegisterPage from "./pages/pages/register";
import RegisterCampgrp from "./pages/pages/registergrp";

import InvoicePage from "./pages/pages/invoice";
import NotFoundPage from "./pages/pages/404";
import ContactPage from "./pages/pages/contact";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<HomePage1 />} />
          <Route path="/camps" element={<TourList3 />} />

          <Route path="/groups" element={<GrpList />} />


          <Route path="/camp/:id" element={<TourSinglePage3 />} />
          <Route path="/db-main" element={<DBMainPage />} />
          <Route path="/db-listing" element={<DBListingPage />} />
          <Route path="/db-listing-grp" element={<DBListinggrp />} />
          <Route path="/db-add-tour" element={<DBAddTourPage />} />

          <Route path="/db-add-blog" element={<DBAddBlogPage />} />
          
          <Route path="/db-favorites" element={<DBFavoritesPage />} />
          <Route path="/db-messages" element={<DBMessagesPage />} />
          <Route path="/db-profile" element={<DBProfilePage />} />
          <Route path="/campgrp-dashboard" element={<DBCampgrpProfilePage />} />
          <Route path="/blog" element={<BlogListPage1 />} />


          <Route path="/article/:id" element={<BlogSinglePage />} />


          <Route path="/about" element={<AboutPage />} />
          <Route path="/help-center" element={<HelpCenterPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logingrp" element={<Logincampgrp />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/registergrp" element={<RegisterCampgrp />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>

        <ScrollTopBehaviour />
      </BrowserRouter>
      <ScrollToTop />
    </>
  );
}

export default App;
