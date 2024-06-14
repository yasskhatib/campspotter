import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function Sidebar({ setSideBarOpen, onLogout }) {
  const { pathname } = useLocation();

  const sidebarItems = [
    {
      id: 1,
      href: "/",
      iconClass: "icon-home text-26",
      label: "Home Page",
    },
    {
      id: 2,
      href: "/camps",
      iconClass: "icon-menu text-26",
      label: "Camp list",
    },
    {
      id: 3,
      href: "/db-main",
      iconClass: "icon-dashboard text-26",
      label: "Dashboard",
    },
    {
      id: 4,
      href: "/db-listing-grp",
      iconClass: "icon-heart text-26",
      label: "My Listings",
    },
    {
      id: 5,
      href: "/db-add-tour",
      iconClass: "icon-clipboard text-26",
      label: "Add Tour",
    },
    {
      id: 6,
      href: "/campgrp-dashboard",
      iconClass: "icon-account text-26",
      label: "My Profile",
    },
    {
      id: 7,
      href: "/db-add-blog",
      iconClass: "icon-pencil text-26",
      label: "Blog",
    },
    {
      id: 8,
      href: "#",
      iconClass: "icon-logout text-26",
      label: "Logout",
    }
  ];

  return (
    <div className="dashboard__sidebar2 js-dashboard-sidebar">
      <div className="dashboard__sidebar_header">
        <span
          onClick={() => setSideBarOpen(false)}
          className="text-white closeSidebar"
        >
          &times;
        </span>
        <Link to={"/"}>
          <img src="/img/general/logo-light.svg" alt="logo icon" />
        </Link>
      </div>

      <div className="sidebar -dashboard">
        {sidebarItems.map((elm, i) => (
          <div key={i}>
            <div
              className={`sidebar__item ${pathname === elm.href ? "-is-active" : ""}`}
            >
              {elm.id === 8 ? (
                <a onClick={onLogout} className="sidebar__link" style={{ cursor: 'pointer' }}>
                  <i className={elm.iconClass}></i>
                  <span className="ml-10">{elm.label}</span>
                </a>
              ) : (
                <Link to={elm.href}>
                  <i className={elm.iconClass}></i>
                  <span className="ml-10">{elm.label}</span>
                </Link>
              )}
            </div>
            {elm.id === 2 && <hr style={{ marginBottom: '15px' }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  setSideBarOpen: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};
