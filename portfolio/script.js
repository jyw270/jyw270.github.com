(function () {
  "use strict";

  AOS.init();
  // ---------------------------- HEADER NAVIGATION ----------------------------

  const navBtn = document.querySelector("header i");
  const nav = document.querySelector("header .submenu");
  const transparent_bg = document.querySelector("#transparent-background");
  const right_arrow = document.querySelector("header .submenu .fa-arrow-right");
  const navOptions = document.querySelectorAll("header .submenu li");
  const allprojects = document.querySelectorAll("#allprojects article");

  // Listens for scrolling and adds or removes shadow from header nav
  window.onscroll = function () {
    document.querySelector("header").style.boxShadow =
      "0px 4px 5px rgba(160, 160, 160, 0.2)";
    if (document.documentElement.scrollTop == 0) {
      document.querySelector("header").style.boxShadow = "none";
    }
  };

  // When hamburger nav icon is clicked, slide in navigation menu
  navBtn.addEventListener("click", function () {
    document.body.style.overflow = "hidden";
    document.querySelector("html").style.overflow = "hidden";
    if (document.querySelector("#allprojects nav > ul > li") != null) {
      document.querySelector("#allprojects nav > ul > li").style.zIndex = -1;
    }

    nav.style.right = 0;
    setTimeout(function () {
      transparent_bg.style.transition = "all 0.5s ease";
      transparent_bg.className = "showing";
    }, 2000);

    // Sets each project's z-index to -3 so it hides behind the nav menu
    allprojects.forEach(function (eachproject) {
      eachproject.style.zIndex = -3;
    });
  });

  // When transparent background is clicked, close the nav menu
  transparent_bg.addEventListener("click", function () {
    document.body.style.overflow = "initial";
    document.querySelector("html").style.overflow = "initial";
    if (document.querySelector("#allprojects nav > ul > li") != null) {
      document.querySelector("#allprojects nav > ul > li").style.zIndex = 0;
    }

    transparent_bg.className = "hidden";
    setTimeout(function () {
      nav.style.right = "-9999px";
    }, 500);

    // Sets each project's z-index to 0 so each is clickable
    allprojects.forEach(function (eachproject) {
      eachproject.style.zIndex = 0;
    });
  });

  // When back arrow icon from hamburger menun is clicked, close the nav menu
  right_arrow.addEventListener("click", function () {
    document.body.style.overflow = "initial";
    document.querySelector("html").style.overflow = "initial";
    if (document.querySelector("#allprojects nav > ul > li") != null) {
      document.querySelector("#allprojects nav > ul > li").style.zIndex = 0;
    }
    transparent_bg.className = "hidden";
    setTimeout(function () {
      nav.style.right = "-9999px";
    }, 500);

    // Sets each project's z-index to 0 so each is clickable
    allprojects.forEach(function (eachproject) {
      eachproject.style.zIndex = 0;
    });
  });

  // For each nav option in hamburger menu clicked, close the nav menu
  navOptions.forEach(function (eachOption) {
    eachOption.addEventListener("click", function () {
      document.body.style.overflow = "initial";
      document.querySelector("html").style.overflow = "initial";
      if (document.querySelector("#allprojects nav > ul > li") != null) {
        document.querySelector("#allprojects nav > ul > li").style.zIndex = 0;
      }
      transparent_bg.style.transition = "all 0.1s ease";
      transparent_bg.className = "hidden";
      nav.style.right = "-9999px";
    });

    // Sets each project's z-index to 0 so each is clickable
    allprojects.forEach(function (eachproject) {
      eachproject.style.zIndex = 0;
    });
  });

  // ---------------------------- HOME PAGE ----------------------------

  const mobileView = window.matchMedia("(max-width: 599px)");
  const selectedBtn = document.querySelector("#selected-btn");
  const submenuItems = document.querySelectorAll("#allprojects .submenu li");
  const allButtons = document.querySelectorAll("#allprojects nav button");
  let currentButton = allButtons[0];
  let buttonNumber = 0;

  // Open and closes the all projects drop down menu
  function dropDownMenu() {
    selectedBtn.style.pointerEvents = "none";
    allprojects[0].style.zIndex = -3;

    if (submenuItems[0].style.top != "41.25px") {
      setTimeout(function () {
        submenuItems[0].style.top = "41.25px";
        submenuItems[1].style.top = "80.8px";

        setTimeout(function () {
          submenuItems[0].style.zIndex = 0;
          submenuItems[1].style.zIndex = 0;
        }, 1000);
      }, 250);
    } else {
      submenuItems[0].style.zIndex = -1;
      submenuItems[1].style.zIndex = -2;
      setTimeout(function () {
        submenuItems[0].style.top = "0";
        submenuItems[1].style.top = "0";
        setTimeout(function () {
          allprojects[0].style.zIndex = 0;
        }, 200);
      }, 300);
    }
    setTimeout(function () {
      selectedBtn.style.pointerEvents = "auto";
    }, 80);
  }

  // Displays projects in the category that user selected
  function displayProjects(devProjectsBtn) {
    // For each project set the class name to hidden, then showing to create fading effect
    allprojects.forEach(function (eachProject) {
      // If the project class name includes ux-ui-only or dev-only
      if (eachProject.className.length > 7) {
        eachProject.removeAttribute("data-aos");
        eachProject.classList.remove("aos-init");
        // Checks if 'hidden' and/or showing' is in the project's class name before adding 'hidden'
        if (!eachProject.className.includes("hidden")) {
          eachProject.className.includes("showing")
            ? (eachProject.className = eachProject.className.replace(
                "showing",
                "hidden"
              ))
            : (eachProject.className = `${eachProject.className} hidden`);
        }

        // Waits a few seconds and then sets the project class name to showing
        setTimeout(function () {
          // If devProjectsBtn is selected, then will hide the UX only projects
          if (devProjectsBtn && eachProject.className.includes("ux-ui-only")) {
            eachProject.removeAttribute("data-aos");
            eachProject.style.display = "none";
          } else {
            eachProject.setAttribute("data-aos", "zoom-in");
            eachProject.style.removeProperty("display");
          }
          eachProject.className = eachProject.className.replace(
            "hidden",
            "showing"
          );
        }, 750);

        // If the project is a ux-ui and dev project
      } else {
        eachProject.className = "hidden";
        setTimeout(function () {
          eachProject.className = "showing";
        }, 750);
      }
    });
  }

  // Changes the all projects nav and displays the matching content for mobile view
  function allProjectsMobileNav(event) {
    // Checks if the selected button is 'development' , set the button number to 1, else means the the selected button is 'ux /ui' , so set to 2
    event.target.textContent == allButtons[1].textContent
      ? (buttonNumber = 1)
      : (buttonNumber = 2);

    // Stores the original selectedBtn in currentButton
    currentButton = selectedBtn.textContent;

    // For whichever submenu button that is clicked, replaces the newly selected button text with the selectedBtn text and closes the drop down menu
    if (allButtons[buttonNumber].textContent == "all projects") {
      selectedBtn.textContent = "all projects";
      displayProjects(false);
      // If the user selected development
    } else if (allButtons[buttonNumber].textContent == "development") {
      selectedBtn.textContent = "development";
      displayProjects(true);
      // If the user selected UX / UI
    } else {
      selectedBtn.textContent = "UX / UI";
      displayProjects(false);
    }

    // Takes the previous selected button text and places it's new spot
    allButtons[buttonNumber].textContent = currentButton;
    setTimeout(dropDownMenu, 100);
  }

  // Changes the all projects nav and displays the matching content for desktop view
  function allProjectsDesktopNav(event) {
    // Checks the selected button text and sets the buttonNumber to match
    if (event.target.textContent == "all projects") {
      buttonNumber = 0;
    } else if (event.target.textContent == "development") {
      buttonNumber = 1;
    } else {
      buttonNumber = 2;
    }

    // Removes the black highlight on the previous button and adds it to the newly selected button
    allButtons[buttonNumber].style.backgroundColor = "#000";
    allButtons[buttonNumber].style.color = "#fff";
    currentButton.style.backgroundColor = "#fff";
    currentButton.style.color = "#000";

    // Updates the currentButton and checks which category was selected and displays it
    currentButton = allButtons[buttonNumber];
    if (currentButton.textContent == "all projects") {
      displayProjects(false);
      // If the user selected development
    } else if (currentButton.textContent == "development") {
      displayProjects(true);
      // If the user selected UX / UI
    } else {
      displayProjects(false);
    }
  }

  // Checks whether the viewport is in mobile or desktop and changes the all projects nav and displays the matching content
  function allProjectsNav() {
    if (mobileView.matches) {
      submenuItems[0].style.zIndex = -1;
      submenuItems[1].style.zIndex = -2;

      // Sets the selectedBtn to the currentButton (that was from the desktop version) and checks if the currentButton from the desktop version is development or ux/ui, so that it can switch 'all projects' (which is the selectedBtn) with it
      selectedBtn.textContent = currentButton.textContent;
      if (currentButton.textContent == "development") {
        allButtons[1].textContent = "all projects";
      } else if (currentButton.textContent == "UX / UI") {
        allButtons[2].textContent = "all projects";
      }

      // Removes the black highlight on the currentButton that was from the desktop version
      if (currentButton != null) {
        currentButton.style.backgroundColor = "#fff";
        currentButton.style.color = "#000";
      }

      // Removes the event listeners from the desktop version
      for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].removeEventListener("click", allProjectsDesktopNav);
      }

      // When the selector button in the all projects section is clicked, open or close drop down
      if (selectedBtn != null) {
        allButtons[0].addEventListener("click", dropDownMenu);
      }
      // For each submenu button that is clicked, switches the text with the selector button text and closes the drop down menu
      for (let i = 1; i < allButtons.length; i++) {
        allButtons[i].addEventListener("click", allProjectsMobileNav);
      }
    } else {
      submenuItems[0].style.zIndex = 0;
      submenuItems[1].style.zIndex = 0;

      // Removes the event listeners from the mobile version
      allButtons[0].removeEventListener("click", dropDownMenu);
      for (let i = 1; i < allButtons.length; i++) {
        allButtons[i].removeEventListener("click", allProjectsMobileNav);
      }

      // Checks what is the selectedBtn text from mobile version and sets the currentButton to match for the desktop version
      if (selectedBtn.textContent == "all projects") {
        currentButton = allButtons[0];
      } else if (selectedBtn.textContent == "development") {
        currentButton = allButtons[1];
      } else if (selectedBtn.textContent == "UX / UI") {
        currentButton = allButtons[2];
      }

      // Sets the black highlight on the current button and sets each button's text content to it's proper text for the desktop version
      currentButton.style.backgroundColor = "#000";
      currentButton.style.color = "#fff";
      selectedBtn.textContent = "all projects";
      allButtons[1].textContent = "development";
      allButtons[2].textContent = "UX / UI";

      // For each submenu button that is clicked, switches the text with the selector button text and closes the drop down menu
      for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener("click", allProjectsDesktopNav);
      }
    }
  }

  if (allButtons.length != 0) {
    allProjectsNav();
    mobileView.addEventListener("change", function () {
      allProjectsNav();
    });
  }

  // ---------------------------- ABOUT PAGE ----------------------------
  let prevActiveBtn = 0;
  const categorySelectionBtns = document.querySelectorAll(
    "#category-selections button"
  );
  const categories = document.querySelectorAll("#experience .category");

  if (categories.length != 0) {
    categories[1].style.display = "none";
    categories[2].style.display = "none";
  }

  for (let i = 0; i < categorySelectionBtns.length; i++) {
    categorySelectionBtns[i].addEventListener("click", function () {
      // Hides previous selected content and unhighlights the button
      categories[prevActiveBtn].style.display = "none";
      categorySelectionBtns[prevActiveBtn].style.background = "none";

      // Displays selected button content by removing the inline style display none and highlights button in blue
      categories[i].style.removeProperty("display");
      categorySelectionBtns[i].style.backgroundColor = "#d9fbf7";
      prevActiveBtn = i;
    });
  }

  // ---------------------------- PROJECT PAGE ----------------------------

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
  };
})();
