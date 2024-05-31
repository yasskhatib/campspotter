import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeaderSearch({ white }) {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/camps?search=${selected}`);
    }
  };

  return (
    <div className="header__search">
      <i className="icon-search text-18"></i>
      <input
        onChange={(e) => setSelected(e.target.value)}
        onKeyDown={handleSearch}
        type="text"
        placeholder="Search for camping"
        className={`js-search ${white ? "text-white" : ""}`}
        value={selected}
      />
    </div>
  );
}
