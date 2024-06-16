import React from "react";

export default function Hero1({ blog }) {
  return (
    <section className="hero -type-1 -min-2">
      <div className="hero__bg">
        <img src="/img/hero/1.jpg" alt="image" />
        <img
          style={{ height: "auto" }}
          src="/img/hero/1/shape.svg"
          alt="image"
        />
      </div>

    </section>
  );
}
