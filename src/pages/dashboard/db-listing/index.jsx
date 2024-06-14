import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DBListing from "@/components/dasboard/DBListing";
import MetaComponent from "@/components/common/MetaComponent";

export default function DBListingPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      const email = localStorage.getItem('userEmail');
      try {
        const response = await fetch(`http://localhost:5000/userinfo?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const metadata = {
    title: user ? `${user.fullName} Camps List || Campspotter - Adventure Made Easy!` : 'Camps List || Campspotter - Adventure Made Easy!',
    description: "Campspotter - Adventure Made Easy!",
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('fullName');
    localStorage.removeItem('governorate');
    localStorage.removeItem('telephone');
    navigate('/login');
  };


  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <DBListing user={user} onLogout={handleLogout} />
      </main>
    </>
  );
}
