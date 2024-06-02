import { useState } from "react";
import Sidebar from "../Sidebargrp";
import States from "./States";
import Header from "../Header";
import Table from "./Table";


export default function DBMain() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  return (
    <>
      <div
        className={`dashboard ${
          sideBarOpen ? "-is-sidebar-visible" : ""
        } js-dashboard`}
      >
        <Sidebar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            <h1 className="text-30">Dashboard</h1>
            <p className="">Here is your detailed dashboard to manage your camps</p>

            <States />

            <div className="row pt-30 y-gap-30">
              <Table />

             
            </div>

            <div className="text-center pt-30">
              © Copyright Campspotter {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
