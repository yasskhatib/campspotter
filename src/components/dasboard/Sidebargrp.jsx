                import {sidebarItems} from "@/data/dashboardGrp";
                import {Link, useLocation} from "react-router-dom";
                import PropTypes from "prop-types";

                export default function Sidebar({setSideBarOpen, onLogout}) {
  const {pathname} = useLocation();
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
                      <div
                        key={i}
                        className={`sidebar__item ${pathname === elm.href ? "-is-active" : ""}`}
                      >
                        {elm.id === 7 ? (
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
                    ))}
                  </div>
                </div>
                );
}

                Sidebar.propTypes = {
                  setSideBarOpen: PropTypes.func.isRequired,
                onLogout: PropTypes.func.isRequired,
};
