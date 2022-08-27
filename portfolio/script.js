(function () {
  "use strict";

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

  const selectedBtn = document.querySelector("#selected-btn");
  const submenuItems = document.querySelectorAll("#allprojects .submenu li");
  const submenuButtons = document.querySelectorAll(
    "#allprojects .submenu button"
  );
  let temp;

  // Open and closes the all projects drop down menu
  function dropDownMenu() {
    selectedBtn.style.pointerEvents = "none";
    if (submenuItems[0].style.top != "41.25px") {
      submenuItems[0].style.top = "41.25px";
      submenuItems[1].style.top = "80.9px";
      setTimeout(function () {
        submenuItems[0].style.zIndex = 0;
        submenuItems[1].style.zIndex = 0;
      }, 1000);
    } else {
      submenuItems[0].style.zIndex = -1;
      submenuItems[1].style.zIndex = -2;
      setTimeout(function () {
        submenuItems[0].style.top = "0";
        submenuItems[1].style.top = "0";
      }, 300);
    }
    setTimeout(function () {
      selectedBtn.style.pointerEvents = "auto";
    }, 100);
  }

  // Displays projects in the category that user selected
  function displayProjects(devProjectsBtn) {
    // For each project set the class name to hidden, then showing to create fading effect
    allprojects.forEach(function (eachProject) {
      // If the project class name includes ux-ui-only or dev-only
      if (eachProject.className.length > 7) {
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
            eachProject.style.display = "none";
          } else {
            eachProject.style.display = "block";
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

  // When the selector button in the all projects section is clicked, open or close drop down
  if (selectedBtn != null) {
    selectedBtn.addEventListener("click", function () {
      dropDownMenu();
    });
  }

  // For each submenu button that is clicked, switches the text with the selector button text and closes the drop down menu
  submenuButtons.forEach(function (eachButton) {
    eachButton.addEventListener("click", function () {
      temp = selectedBtn.textContent;
      // If the user selected all projects
      if (eachButton.textContent == "all projects") {
        selectedBtn.textContent = "all projects";
        displayProjects(false);

        // If the user selected development
      } else if (eachButton.textContent == "development") {
        selectedBtn.textContent = "development";
        displayProjects(true);

        // If the user selected UX / UI
      } else {
        selectedBtn.textContent = "UX / UI";
        displayProjects(false);
      }

      eachButton.textContent = temp;
      setTimeout(function () {
        dropDownMenu();
      }, 100);
    });
  });

  // ---------------------------- ABOUT PAGE ----------------------------
  let prevActiveBtn = 0;
  const categorySelectionBtns = document.querySelectorAll(
    "#category-selections button"
  );
  const categories = document.querySelectorAll("#experience .category");

  for (let i = 0; i < categorySelectionBtns.length; i++) {
    categorySelectionBtns[i].addEventListener("click", function () {
      // hides previous selected content and unhighlights the button
      categories[prevActiveBtn].style.display = "none";
      categorySelectionBtns[prevActiveBtn].style.background = "none";

      // displays selected button content and highlights button in blue
      categories[i].style.display = "block";
      categorySelectionBtns[i].style.backgroundColor = "#d9fbf7";
      prevActiveBtn = i;
    });
  }

  // // MOBILE / DESKTOP IMAGES
  // const images = document.querySelectorAll(".image");

  // window.addEventListener("load", function () {
  //   changeImageSrc();
  // });
  // window.addEventListener("resize", function () {
  //   changeImageSrc();
  // });

  // function changeImageSrc() {
  //   if (window.innerWidth > 1020 && images[0].src.includes("mobile")) {
  //     images.forEach(function (eachImage) {
  //       if (
  //         eachImage.src.includes("travel-planner/testing-2") ||
  //         eachImage.src.includes("travel-planner/testing-4")
  //       ) {
  //         eachImage.style.display = "none";
  //       } else {
  //         eachImage.src = `${eachImage.src.replace("mobile", "desktop")}`;
  //       }
  //     });
  //   } else if (window.innerWidth < 1020 && images[0].src.includes("desktop")) {
  //     images.forEach(function (eachImage) {
  //       if (
  //         eachImage.src.includes("travel-planner/testing-2") ||
  //         eachImage.src.includes("travel-planner/testing-4")
  //       ) {
  //         eachImage.style.display = "initial";
  //       } else {
  //         eachImage.src = `${eachImage.src.replace("desktop", "mobile")}`;
  //       }
  //     });
  //   }
  // }
})();
