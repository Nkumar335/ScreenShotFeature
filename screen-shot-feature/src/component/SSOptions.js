import React, { useState } from "react";
import html2canvas from "html2canvas";

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


    function handleFullScreenSS() {
        const options = document.getElementById("options");
        if (options) {
            options.classList.add("hidden");
        }
        var canvasPromise = html2canvas(containerRef.current, {
            useCORS: true
        });
        canvasPromise.then((canvas) => {
            var dataURL = canvas.toDataURL("image/png");
            var img = new Image();
            img.src = dataURL;
            img.download = dataURL;
            setImageUrl(img.src);
            setShowModal(true);
        });
        if (options) {
            options.classList.remove("hidden");
        }
    }



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
