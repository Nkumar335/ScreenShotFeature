import React from "react";
import { IoClose } from "react-icons/io5";

function PopOverDiv({
  handleClickTakeScreenShot = () => {},
  togglePopover = () => {},
}) {
  return (
    <div>
      <div className="pop_over">
        <h3>Facing Problem ?</h3>
        <p>
          Our Support Team is here to help. Fill Free to reach out any question
          or issue you are facing.
        </p>
        <h5>Raise Ticket</h5>
        <button onClick={handleClickTakeScreenShot}>Take a ScreenShot</button>
      </div>
      <div className="close_ticket" onClick={togglePopover}>
        <IoClose />
      </div>
    </div>
  );
}

export default PopOverDiv;
