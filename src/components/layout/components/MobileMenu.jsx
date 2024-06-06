import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";

const socialMediaLinks = [
  { id: 1, class: "icon-facebook", href: "#" },
  { id: 2, class: "icon-twitter", href: "#" },
  { id: 3, class: "icon-instagram", href: "#" },
  { id: 4, class: "icon-linkedin", href: "#" },
];

export default function MobileMenu({ mobileMenuOpen, setMobileMenuOpen }) {
  const [activeSub, setActiveSub] = useState("");
  const { pathname } = useLocation();

  const menuData = [
    { label: "Home", href: "/" },
    { label: "Camps List", href: "/camps" },
    { label: "Group List", href: "/groups" },
    {
      label: "Sign Up",
      submenu: [
        { label: "Camp Group", href: "/registergrp" },
        { label: "Camper", href: "/register" }
      ]
    },
    {
      label: "Sign In",
      submenu: [
        { label: "Camp Group", href: "/logingrp" },
        { label: "Camper", href: "/login" }
      ]
    },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Terms", href: "/terms" },
    { label: "Help Center", href: "/help-center" },
  ];

  return (
    <div
      data-aos="fade"
      data-aos-delay=""
      className={`menu js-menu ${mobileMenuOpen ? "-is-active" : ""}`}
      style={
        mobileMenuOpen
          ? { opacity: "1", visibility: "visible" }
          : { pointerEvents: "none", visibility: "hidden" }
      }
    >
      <div onClick={() => setMobileMenuOpen(false)} className="menu__overlay js-menu-button"></div>
      <div className="menu__container">
        <div className="menu__header">
          <h4>Main Menu</h4>
          <button onClick={() => setMobileMenuOpen(false)} className="js-menu-button">
            <i className="icon-cross text-10"></i>
          </button>
        </div>

        <div className="menu__content">
          <ul className="menuNav js-navList -is-active" style={{ maxHeight: "calc(100vh - 262px)", overflowY: "auto" }}>
            {menuData.map((item, index) => (
              <li key={index} className={`menuNav__item ${item.submenu ? "-has-submenu js-has-submenu" : ""}`}>
                {item.submenu ? (
                  <a onClick={() => setActiveSub((prev) => (prev === item.label ? "" : item.label))}>
                    <span className={pathname.includes(item.href) ? "activeMenu" : ""}>{item.label}</span>
                    <i style={activeSub === item.label ? { transform: "rotate(90deg)", transition: "0.3s" } : { transform: "rotate(0deg)", transition: "0.3s" }} className="icon-chevron-right"></i>
                  </a>
                ) : (
                  <Link to={item.href}>{item.label}</Link>
                )}
                {item.submenu && (
                  <ul style={activeSub === item.label ? { maxHeight: "1200px", transition: "0.6s" } : { maxHeight: "0px", transition: "0.6s" }}>
                    {item.submenu.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <Link className={pathname.includes(sub.href) ? "activeMenu" : ""} style={{ paddingLeft: "15px", fontSize: "17px" }} to={sub.href}>
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="menu__footer">
          <i className="icon-headphone text-50"></i>
          <div className="text-20 lh-12 fw-500 mt-20">
            <div>Speak to our expert at</div>
            <div className="text-accent-1">58-627-255</div>
          </div>
          <div className="d-flex items-center x-gap-10 pt-30">
            {socialMediaLinks.map((link, i) => (
              <div key={i}>
                <a href={link.href} className="d-block">
                  <i className={link.class}></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
