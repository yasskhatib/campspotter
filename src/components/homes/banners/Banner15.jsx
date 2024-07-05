import React from "react";

export default function Banner15() {
  return (
    <section className="layout-pt-xl layout-pb-xl relative">
      <div className="sectionBg">
        <img src="/img/cta/13/bg.jpg" alt="image" className="img-cover" />
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <h2
              data-aos="fade-up"
              data-aos-delay=""
              className="text-30 text-white fw-700"
            >
              Subscribe To Our Mailing List
              <br className="md:d-none" /> And Stay Up To Date
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay=""
              className="text-white mt-30"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <div
              data-aos="fade-right"
              data-aos-delay=""
              className="singleInput type-1 mt-30"
            >
              <input type="text" placeholder="Your email" />
              <button className="button -md -dark-1 bg-white">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
