import React, { useEffect, useState } from "react";

export default function Stars2({ star, font }) {
  const [rating, setRating] = useState([]);

  useEffect(() => {
    setRating([]);
    for (let i = Math.round(star); i >= 1; i--) {
      setRating((prev) => [...prev, "star"]);
    }
  }, [star]);

  return (
    <>
      {rating.map((elm, i) => (
        <div key={i}>
          <i className={`icon-star text-${font ? font : "10"} text-yellow-2`}></i>
        </div>
      ))}
    </>
  );
}
