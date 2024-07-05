import { featuresThree } from "@/data/features";

import React from "react";

export default function FeaturesFour() {
  return (
    <section className="layout-pt-xl">
      <div className="container">
        <div data-aos="fade-up" data-aos-delay="" className="row y-gap-30">
          {featuresThree.map((elm, i) => (
            <div key={i} className="col-lg-3 col-6">
              <div className="text-center">
                <img src={elm.icon} alt="icon" />

                <h3 className="text-40 md:text-30 lh-14 fw-700 mt-30 md:mt-15">
                  {elm.value}
                </h3>
                <p className="lh-15">{elm.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
