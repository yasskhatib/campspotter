import React from "react";
import FooterLinks from "../components/FooterLinks";
import Socials from "../components/Socials";

export default function FooterOne() {
  return (
    <footer className="footer -type-1">
      <div className="footer__main">
        <div className="footer__bg">
          <img src="/img/footer/1/bg.svg" alt="image" />
        </div>

        <div className="container">
          

          <div className="footer__content">
            <div className="row y-gap-40 justify-between">
              <div className="col-lg-4 col-md-6">
                <h4 className="text-20 fw-500">Contact</h4>

                <div className="y-gap-10 mt-20">
                  <a className="d-block" href="#">
                   Iben Khaldoun Street, Jemmel, Monastir,
                    Tunisia.
                  </a>
                  <a className="d-block" href="#">
                    campspotterteam@gmail.com
                  </a>
                </div>
              </div>

              <FooterLinks />

              <div className="col-lg-3 col-md-6">
                <h4 className="text-20 fw-500">Newsletter</h4>
                <p className="mt-20">
                  Subscribe to newsletter to stay up to date
                </p>

                <div className="footer__newsletter">
                  <input type="Email" placeholder="Your email address" />
                  <button>Send</button>
                </div>

              </div>
            </div>
          </div>
          <div className="footer__info">
            <div className="row y-gap-20 justify-between">
              <div className="col-auto">
                <div className="row y-gap-20 items-center">
                  <div className="col-auto">
                    <i className="icon-headphone text-50"></i>
                  </div>

                  <div className="col-auto">
                    <div className="text-20 fw-500">
                      Speak to our commercial agent:
                      <span className="text-accent-1"> 58-627-255</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-auto">
                <div className="footerSocials">
                  <div className="footerSocials__title">Follow Us</div>

                  <div className="footerSocials__icons">
                    <Socials />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="footer__bottom">
          <div className="row y-gap-5 justify-between items-center">
            <div className="col-auto">
              <div>© Copyright CampSpotter {new Date().getFullYear()}</div>
            </div>

           
          </div>
        </div>
      </div>
    </footer>
  );
}
