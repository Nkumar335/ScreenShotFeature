import React from "react";
import { BiSolidRectangle } from "react-icons/bi";

function SSIcon({ togglePopover = () => {} }) {
  return (
    <>
      <div className="ss_icon" onClick={togglePopover}>
        <BiSolidRectangle />
      </div>
    </>
  );
}

export default SSIcon;
