import React, { useState } from "react";

export default function HeaderSearch({ white }) {
  const [selected, setSelected] = useState("");

  return (
    <div className="header__search">
      <i className="icon-search text-18"></i>
      <input
        onChange={(e) => setSelected(e.target.value)}
        type="text"
        placeholder="Search for camping"
        className={`js-search ${white ? "text-white" : ""}`}
        value={selected}
      />
    </div>
  );
}
