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

import BookingPage from "./pages/pages/booking-pages";
import DBMainPage from "./pages/dashboard/db-main";
import DBBookingPage from "./pages/dashboard/db-booking";
import DBListingPage from "./pages/dashboard/db-listing";

import DBListinggrp from "./pages/dashboard/db-listing-grp";

import DBAddTourPage from "./pages/dashboard/db-add-tour";
import DBFavoritesPage from "./pages/dashboard/db-favorites";
import DBMessagesPage from "./pages/dashboard/db-messages";
import DBProfilePage from "./pages/dashboard/db-profile";

import BlogListPage1 from "./pages/blogs/blog-list-1";
import BlogListPage2 from "./pages/blogs/blog-list-2";
import BlogListPage3 from "./pages/blogs/blog-list-3";
import BlogSinglePage from "./pages/blogs/blog-single";
import DestinationsPage from "./pages/pages/destinations";
import AboutPage from "./pages/pages/about";
import HelpCenterPage from "./pages/pages/help-center";
import TermsPage from "./pages/pages/terms";
import LoginPage from "./pages/pages/login";
import Logincampgrp from "./pages/pages/logingrp";

import DBCampgrpProfilePage from "./pages/dashboard/campgrp-dashboard";

import RegisterPage from "./pages/pages/register";
import RegisterCampgrp from "./pages/pages/registergrp";

import InvoicePage from "./pages/pages/invoice";
import UIElementsPage from "./pages/pages/ui-elements";
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
          <Route path="/booking-pages" element={<BookingPage />} />
          <Route path="/db-main" element={<DBMainPage />} />
          <Route path="/db-booking" element={<DBBookingPage />} />
          <Route path="/db-listing" element={<DBListingPage />} />
          <Route path="/db-listing-grp" element={<DBListinggrp />} />
          <Route path="/db-add-tour" element={<DBAddTourPage />} />
          <Route path="/db-favorites" element={<DBFavoritesPage />} />
          <Route path="/db-messages" element={<DBMessagesPage />} />
          <Route path="/db-profile" element={<DBProfilePage />} />
          <Route path="/campgrp-dashboard" element={<DBCampgrpProfilePage />} />
          <Route path="/blog-list-1" element={<BlogListPage1 />} />
          <Route path="/blog-list-2" element={<BlogListPage2 />} />
          <Route path="/blog-list-3" element={<BlogListPage3 />} />
          <Route path="/blog-single/:id" element={<BlogSinglePage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/help-center" element={<HelpCenterPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logingrp" element={<Logincampgrp />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/registergrp" element={<RegisterCampgrp />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/ui-elements" element={<UIElementsPage />} />
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
