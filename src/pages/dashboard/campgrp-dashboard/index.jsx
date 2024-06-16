import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CampgrpProfile from "@/components/dasboard/Profilegrp";
import MetaComponent from "@/components/common/MetaComponent";
import axiosInstance from '@/components/axiosInstance'; // Import the Axios instance

export default function DBCampgrpProfilePage() {
    const [campgrpInfo, setCampgrpInfo] = useState({
        name: "",
        email: "",
        telephone: "",
        governorate: "",
        chefName: "",
        picture: "",
        creationDate: "",
        socialMediaLink: "",
        comments: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = localStorage.getItem('campgrpLoggedIn');
        if (!loggedIn) {
            navigate('/logingrp');
        } else {
            const email = localStorage.getItem('campgrpEmail');
            fetchCampgrpInfo(email);
        }
    }, [navigate]);

    const fetchCampgrpInfo = async (email) => {
        try {
            const response = await axiosInstance.get(`/campgrpInfo?email=${email}`);
            if (response.status === 200) {
                const data = response.data;
                setCampgrpInfo({
                    name: data.name,
                    email: data.email,
                    telephone: data.telephone,
                    governorate: data.governorate,
                    chefName: data.chefName,
                    picture: data.picture,
                    creationDate: data.creationDate,
                    socialMediaLink: data.socialMediaLink,
                    comments: data.comments
                });
            } else {
                console.error('Failed to fetch camping group info');
            }
        } catch (error) {
            console.error('Error fetching camping group info:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('campgrpLoggedIn');
        localStorage.removeItem('loggedIn');

        localStorage.removeItem('campgrpEmail');
        navigate('/logingrp');
    };


    const metadata = {
        title: `${campgrpInfo.name} Dashboard - Campspotter`,
        description: "Campspotter - Adventure Made Easy!",
    };

    return (
        <>
            <MetaComponent meta={metadata} />
            <main>
                <CampgrpProfile campgrpInfo={campgrpInfo} onLogout={handleLogout} />
            </main>
        </>
    );
}
