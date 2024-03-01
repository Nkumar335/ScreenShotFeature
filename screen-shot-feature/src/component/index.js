import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import SSIcon from "./SSIcon";
import PopOverDiv from "./PopOverDiv";
import SSOptions from "./SSOptions";
import ModalContainer from "./ModalContainer";
import "./styles.css";

const ScreenShotFeature = () => {
  const [isIconVisible, setIconVisible] = useState(true);
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [showScreenShotOptions, setShowScreenShotOptions] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [customAreaSelected, setCustomAreaSelected] = useState(false);
  const [stopDragging, setStopDragging] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const containerRef = useRef(null);

  const togglePopover = () => {
    setPopoverVisible(!isPopoverVisible);
  };

  const handleClickTakeScreenShot = () => {
    setShowScreenShotOptions(true);
    setPopoverVisible(!isPopoverVisible);
    setIconVisible(!isIconVisible);
  };

  const handleCustomArea = () => {
    setCustomMode(true);
  };

  const handleSave = async () => {
    try {
      const fullCanvas = await html2canvas(containerRef.current, {
        useCORS: true,
      });
      const fullImg = new Image();
      fullImg.src = fullCanvas.toDataURL("image/png");
      const x = Math.min(startPoint.x, endPoint.x);
      const y = Math.min(startPoint.y, endPoint.y);
      const width = Math.abs(startPoint.x - endPoint.x);
      const height = Math.abs(startPoint.y - endPoint.y);

      const croppedCanvas = document.createElement("canvas");
      croppedCanvas.width = width;
      croppedCanvas.height = height;
      const ctx = croppedCanvas.getContext("2d");
      ctx.drawImage(fullImg, x, y, width, height, 0, 0, width, height);

      const croppedImage = croppedCanvas.toDataURL("image/png");
      setImageUrl(croppedImage);

      setCustomAreaSelected(false);
      setCustomMode(false);
      setShowModal(true);
      setIconVisible(true);
    } catch (error) {
      console.error("Error capturing selected area screenshot:", error);
    }
  };

  const handleRetake = () => {
    setShowScreenShotOptions(true);
    setCustomAreaSelected(false);
    setCustomMode(false);
  };

  const handleClose = () => {
    setIconVisible(true);
    setCustomMode(false);
    setCustomAreaSelected(false);
  };

  const handleMouseDown = (e) => {
    if (customMode) {
      setStartPoint({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e) => {
    if (customMode && stopDragging) {
      setEndPoint({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    if (customMode) {
      setCustomAreaSelected(true);
      setShowScreenShotOptions(false);
      setStopDragging(!stopDragging);
    }
  };

  console.log("imageUrl", imageUrl);

  return (
    <div
      className="main_container"
      ref={containerRef}
      onMouseDown={customMode ? handleMouseDown : undefined}
      onMouseMove={customMode ? handleMouseMove : undefined}
      onMouseUp={customMode ? handleMouseUp : undefined}
    >
      {isIconVisible && <SSIcon togglePopover={togglePopover} />}

      {isPopoverVisible && (
        <PopOverDiv
          handleClickTakeScreenShot={handleClickTakeScreenShot}
          togglePopover={togglePopover}
        />
      )}

      {showScreenShotOptions && (
        <SSOptions
          containerRef={containerRef}
          handleCustomArea={handleCustomArea}
          setImageUrl={setImageUrl}
          setShowModal={setShowModal}
          setShowScreenShotOptions={setShowScreenShotOptions}
          setIconVisible={setIconVisible}
        />
      )}

      {customMode && (
        <div>
          <div
            style={{
              position: "fixed",
              top: Math.min(startPoint.y, endPoint.y),
              left: Math.min(startPoint.x, endPoint.x),
              width: Math.abs(startPoint.x - endPoint.x),
              height: Math.abs(startPoint.y - endPoint.y),
              border: "2px dashed #00f",
              pointerEvents: "none",
            }}
          ></div>
          {customAreaSelected && (
            <div className="options">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleRetake}>Retake</button>
              <button onClick={handleClose}>Close</button>
            </div>
          )}
        </div>
      )}

      {showModal && imageUrl && (
        <ModalContainer
          showModal={showModal}
          imageUrl={imageUrl}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default ScreenShotFeature;
