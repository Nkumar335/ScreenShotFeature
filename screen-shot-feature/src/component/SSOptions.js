import React, { useState } from "react";
import html2canvas from "html2canvas";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SSOptions({
  containerRef,
  handleCustomArea,
  setImageUrl,
  setShowModal,
  setShowScreenShotOptions,
  setIconVisible,
}) {
  const [active, setActive] = useState(false);

  const handleCustomAreaClick = () => {
    setActive(true);
    handleCustomArea();
  };

  const handleFullScreenSS = async () => {
    try {
      const canvas = await html2canvas(containerRef.current, {
        useCORS: true,
      });
      const image = canvas.toDataURL("image/png");
      setImageUrl(image);
      setShowModal(true);
    } catch (error) {
      toast.warn('Error capturing full-screen screenshot', { position: 'top-center' });
    }
  };

  const handleClose = () => {
    setShowScreenShotOptions(false);
    setIconVisible(true);
  };

  return (
    <div className="options">
      <button
        className={active ? "active" : ""}
        onClick={handleCustomAreaClick}
      >
        Custom Area
      </button>
      <button onClick={() => handleFullScreenSS()}>Full Screen</button>
      <button onClick={() => handleClose()}>Close</button>
    </div>
  );
}

export default SSOptions;
