import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";
import PropTypes from "prop-types";

export default function DBListing({ user }) {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  return (
    <div className={`dashboard ${sideBarOpen ? "-is-sidebar-visible" : ""} js-dashboard`}>
      <Sidebar setSideBarOpen={setSideBarOpen} />
      <div className="dashboard__content">
        <Header setSideBarOpen={setSideBarOpen} />
        <div className="dashboard__content_content">
          <h1 className="text-30">My Listings</h1>
          <p>{user ? user.fullName : 'Loading...'}: visited camps</p>
          {/* Display tours or other content here */}
          <div className="text-center pt-30">
            © Copyright Campspotter {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}

DBListing.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    governorate: PropTypes.string,
    telephone: PropTypes.string,
  }),
};
