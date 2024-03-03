import React, { useState } from "react";
import html2canvas from "html2canvas";

function SSOptions({
    containerRef,
    handleCustomArea,
    setImageUrl,
    setShowModal,
    setShowScreenShotOptions,
    isIconVisible,
    setIconVisible,
}) {
    const [active, setActive] = useState(false);
    const handleCustomAreaClick = () => {
        setActive(true);
        handleCustomArea();
    };

    async function handleFullScreenSS() {
        const options = document.querySelector(".options");
        
        try {
            if (options) {
                options.style.display = "none";
            }
            setIconVisible(!isIconVisible);

            const waitForDOMChanges = () => new Promise(resolve => setTimeout(resolve, 0));
            await waitForDOMChanges();
    
            const canvas = await html2canvas(containerRef.current, {
                useCORS: true,
            });
    
            const dataURL = canvas.toDataURL("image/png");
            const img = new Image();
            img.src = dataURL;
            img.download = dataURL;
            setImageUrl(img.src);
            setShowModal(true);
        } catch (error) {
            console.error("Error capturing screenshot:", error);
        } finally {
    
            if (options) {
                options.style.display = "block"; 
            }
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
