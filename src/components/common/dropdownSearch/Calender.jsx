import { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

export default function Calender() {
  const [dates, setDates] = useState([
    new DateObject().setDay(5),
    new DateObject().setDay(7).add(0, "month"),
  ]);
  return (
    <DatePicker
      inputClass="custom_input-picker"
      containerClassName="custom_container-picker"
      value={dates}
      onChange={setDates}
      numberOfMonths={2}
      offsetY={10}
      range
      // className="yellow"
      rangeHover
      format="MMMM DD"
    />
  );
}
