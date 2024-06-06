import { useState } from "react";
import Sidebar from "../Sidebargrp";
import States from "./States";
import Statistics from "./Statistics";
import Header from "../Header";
import Table from "./Table";
import PropTypes from 'prop-types';

export default function DBMain({ onLogout }) {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  return (
    <>
      <div className={`dashboard ${sideBarOpen ? "-is-sidebar-visible" : ""} js-dashboard`}>
        <Sidebar setSideBarOpen={setSideBarOpen} onLogout={onLogout} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            <h1 className="text-30">Dashboard</h1>
            <p>Here is your detailed dashboard to manage your camps</p>


            
            <States />
<br></br>
              <Table />
            <br></br>
            <Statistics />
            <div className="text-center pt-30">
              © Copyright Campspotter {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

DBMain.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
