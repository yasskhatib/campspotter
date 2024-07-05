import { featuresTwo } from "@/data/features";

import { Link } from "react-router-dom";
import React from "react";

export default function Features5() {
  return (
    <section className="layout-pt-xl layout-pb-xl relative">
      <div className="container">
        <div className="sectionBg">
          <img src="/img/about/2/bg.jpg" alt="image" className="img-ratio" />
        </div>

        <div className="row y-gap-30 justify-between items-center">
          <div className="col-lg-4 col-md-6">
            <h2
              data-aos="fade-up"
              data-aos-delay=""
              className="text-40 lh-13 text-white"
            >
              We Make
              <br className="md:d-none" />
              World Travel Easy
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay=""
              className="text-white mt-10"
            >
              Traveling under your own power and at your own pace, you'll
              connect more meaningfully with your destination and have more fun!
            </p>

            <button
              data-aos="fade-right"
              data-aos-delay=""
              className="button -md -dark-1 bg-white text-accent-1 mt-60 md:mt-30"
            >
              <Link to={"/tour-list-1"}>
                Explore Our Tours
                <i className="icon-arrow-top-right ml-10"></i>
              </Link>
            </button>
          </div>

          <div className="col-md-6">
            <div data-aos="fade-up" data-aos-delay="" className="featuresGrid">
              {featuresTwo.map((elm, i) => (
                <div
                  key={i}
                  className="featuresGrid__item px-40 py-40 text-center bg-white rounded-12"
                >
                  <img src={elm.iconSrc} alt="icon" />
                  <div className="text-40 fw-700 text-accent-1 mt-20 lh-14">
                    {elm.value}
                  </div>
                  <div>{elm.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
