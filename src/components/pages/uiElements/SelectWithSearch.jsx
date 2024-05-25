import { ddoptions } from "@/data/uiElements";
import { useState } from "react";

export default function SelectWithDropdown() {
  const [selectedItem, setSelectedItem] = useState("");
  const [ddActive, setDdActive] = useState(false);

  return (
    <div className="select js-select js-liveSearch" data-select-value="">
      <button
        className="select__button js-button"
        onClick={() => setDdActive((prev) => !prev)}
      >
        <span className="js-button-title">
          {selectedItem ? selectedItem : `Default`}
        </span>
        <i className="select__icon" data-feather="chevron-down"></i>
      </button>

      <div
        className={`select__dropdown js-dropdown js-form-dd ${ddActive ? "-is-visible" : ""
          }`}
      >
        <div className="select__options js-options">
          {ddoptions.map((elm, i) => (
            <div
              onClick={() => {
                setSelectedItem(elm.label);
                setDdActive(false);
              }}
              className="select__options__button"
              key={i}
            >
              {elm.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
