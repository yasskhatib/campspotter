import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import PageHeader from "@/components/tourSingle/PageHeader";
import TourSlider from "@/components/tourSingle/TourSlider";
import SingleThree from "@/components/tourSingle/pages/SingleThree";
import MetaComponent from "@/components/common/MetaComponent";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "@/components/common/LoadingSpinner2"; // Ensure the path is correct

const truncateTitle = (title, wordLimit = 10) => {
  const words = title.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return title;
};

export default function TourSinglePage3() {
  const { id } = useParams();
  const [camp, setCamp] = useState(null);
  const [pageTitle, setPageTitle] = useState(" -Campspotter");
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const camperLoggedIn = localStorage.getItem('loggedIn');
    const campgrpLoggedIn = localStorage.getItem('campgrpLoggedIn');

    if (camperLoggedIn) {
      const fullName = localStorage.getItem('fullName');
      const userEmail = localStorage.getItem('userEmail');
      setUser({ fullName, email: userEmail, role: 'camper' });
    } else if (campgrpLoggedIn) {
      const campgrpEmail = localStorage.getItem('campgrpEmail');
      try {
        const response = await axios.get(`http://localhost:5000/campgrpInfo?email=${campgrpEmail}`);
        if (response.data) {
          const { name } = response.data;
          setUser({ fullName: name, email: campgrpEmail, role: 'campgrp' });
        }
      } catch (error) {
        console.error('Error fetching camping group info:', error);
      }
    }
  };

  useEffect(() => {
    const fetchCamp = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/camp/${id}`);
        setCamp(response.data);
        const truncatedTitle = truncateTitle(response.data.title);
        setPageTitle(`${truncatedTitle} -Campspotter`);
      } catch (error) {
        console.error("Error fetching camp:", error);
      }
    };

    fetchCamp();
    fetchUser();
  }, [id]);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  if (!camp) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <MetaComponent meta={{ title: pageTitle, description: "Campspotter - Adventure Made Easy!" }} />
      <main>
        <Header1 />
        <PageHeader />
        <SingleThree camp={camp} user={user} />
        <TourSlider />
        <FooterOne />
      </main>
    </>
  );
}
