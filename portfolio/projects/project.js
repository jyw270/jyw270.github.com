(function () {
  "use strict";
  // ---------------------------- IMAGE ZOOM ----------------------------

  // Zoom in on tiny image details
  // CREDITS : https://www.cssscript.com/image-zoom-pan-hover-detail-view/
  var addZoom = (target) => {
    // (A) GET CONTAINER + IMAGE SOURCE
    let container = document.getElementById(target),
      imgsrc =
        container.currentStyle || window.getComputedStyle(container, false);
    imgsrc = imgsrc.backgroundImage.slice(4, -1).replace(/"/g, "");

    // (B) LOAD IMAGE + ATTACH ZOOM
    let img = new Image();
    img.src = imgsrc;
    img.onload = () => {
      // (B1) CALCULATE ZOOM RATIO
      let ratio = img.naturalHeight / img.naturalWidth;

      // (B2) ATTACH ZOOM ON MOUSE MOVE
      container.onmousemove = (e) => {
        let rect = e.target.getBoundingClientRect(),
          xPos = e.clientX - rect.left,
          yPos = e.clientY - rect.top,
          xPercent = xPos / (container.clientWidth / 100) + "%",
          yPercent = yPos / ((container.clientWidth * ratio) / 100) + "%";

        Object.assign(container.style, {
          backgroundPosition: xPercent + " " + yPercent,
          backgroundSize: img.naturalWidth + "px",
        });
      };

      // (B3) RESET ZOOM ON MOUSE LEAVE
      container.onmouseleave = (e) => {
        Object.assign(container.style, {
          backgroundPosition: "center",
          backgroundSize: "cover",
        });
      };
    };
  };

  // (C) ATTACH FOLLOW ZOOM
  window.onload = () => {
    if (document.getElementById("ui-challenges-zoom") != null) {
      addZoom("ui-challenges-zoom");
    }
    if (document.getElementById("user-flow-zoom") != null) {
      addZoom("user-flow-zoom");
    }
    if (document.getElementById("wire-flow-zoom") != null) {
      addZoom("wire-flow-zoom");
    }
    if (document.getElementById("survey-zoom") != null) {
      addZoom("survey-zoom");
    }
  };

  // ---------------------------- MAD LIBS PROJECT ----------------------------
  const desktopView = window.matchMedia("(min-width: 900px)");
  const arrows = document.querySelectorAll("#sketches i");
  const path = window.location.pathname;
  const page = path.split("/").pop();

  // Changes arrows to right or down depending on viewport
  function changeArrows() {
    if (desktopView.matches && arrows != null) {
      arrows[0].className = "fa-solid fa-arrow-right";
      arrows[1].className = "fa-solid fa-arrow-right";
    } else {
      arrows[0].className = "fa-solid fa-arrow-down";
      arrows[1].className = "fa-solid fa-arrow-down";
    }
  }

  if (page == "madlibs.html") {
    window.addEventListener("load", changeArrows);
    window.addEventListener("resize", changeArrows);
  }
})();
