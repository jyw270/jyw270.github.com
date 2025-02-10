(function () {
  "use strict";

  AOS.init();
  // ---------------------------- HEADER NAVIGATION ----------------------------
  const navBar = document.querySelector("header");
  const submenu = document.querySelector("header .submenu");

  // When nav bar is clicked, display/close navigation menu
  navBar.addEventListener("click", function () {
    submenu.style.top == "-9999px"
      ? (submenu.style.top = "85px")
      : (submenu.style.top = "-9999px");
  });

  // ---------------------------- HOME PAGE: PROJECTS ----------------------------

  const mobileView = window.matchMedia("(max-width: 670px)");
  const projNavBtn = document.querySelector("#allprojects #first-btn");
  const projNavSubmenu = document.querySelector("#allprojects .submenu");
  const allprojects = document.querySelectorAll("#allprojects article");
  const selectedBtn = document.querySelector("#first-btn-name");
  const allButtons = document.querySelectorAll("#allprojects nav button");
  const allBtnsGreenLines = document.querySelectorAll(
    "#allprojects .green-line"
  );
  let currentButton = allButtons[0];
  let currentBtnNum = 0;
  let buttonNumber = 0;

  // Displays initial UX/UI Projects on initial page
  displayProjects(false);

  // When project nav button is clicked, display/close navigation menu
  if (projNavBtn != null) {
    projNavBtn.addEventListener("click", function () {
      projNavSubmenu.style.top == "-9999px"
        ? (projNavSubmenu.style.top = "35px")
        : (projNavSubmenu.style.top = "-9999px");
    });
  }

  // Displays projects in the category that user selected
  function displayProjects(devProjectsBtn) {
    // For each project set the class name to hidden, then showing to create fading effect
    allprojects.forEach(function (eachProject) {
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
        eachProject.style.removeProperty("display");
        eachProject.setAttribute("data-aos", "zoom-in");

        // If devProjectsBtn is selected, then will only hide ux-ui projects
        if (devProjectsBtn && eachProject.className.includes("ux-ui-only")) {
          eachProject.style.display = "none";
          // If UXProjectsBtn is selected, then will only hide dev projects
        } else if (
          !devProjectsBtn &&
          eachProject.className.includes("dev-only")
        ) {
          eachProject.style.display = "none";
        }
        eachProject.className = eachProject.className.replace(
          "hidden",
          "showing"
        );
        AOS.init();
      }, 750);
    });
  }

  // Changes the all projects nav and displays the matching content for mobile view
  function allProjectsMobileNav(event) {
    // Closes the drop down menu
    projNavSubmenu.style.top = "-9999px";

    // For whichever submenu button that is clicked, replaces the newly selected button text with the selectedBtn text, re-adjusts the other buttons, and displays the projects
    if (event.target.textContent == "UX / UI") {
      selectedBtn.textContent = "UX / UI";
      allButtons[1].textContent = "development";
      displayProjects(false);
    } else if (event.target.textContent == "development") {
      selectedBtn.textContent = "development";
      allButtons[1].textContent = "UX / UI";
      displayProjects(true);
    }
  }

  // Changes the all projects nav and displays the matching content for desktop view
  function allProjectsDesktopNav(event) {
    // Checks the selected button text, sets the buttonNumber to match, and displays projects
    if (event.target.textContent == "UX / UI") {
      buttonNumber = 0;
      displayProjects(false);
    } else if (event.target.textContent == "development") {
      buttonNumber = 1;
      displayProjects(true);
    }

    // Removes the black highlight on the previous button and adds it to the newly selected button
    allBtnsGreenLines[currentBtnNum].style.height = "0";
    allButtons[currentBtnNum].style.fontWeight = "400";
    allButtons[buttonNumber].style.fontWeight = "500";
    allBtnsGreenLines[buttonNumber].style.height = "4px";

    // Updates the currentButton info
    currentButton = allButtons[buttonNumber];
    currentBtnNum = buttonNumber;
  }

  // Checks whether the viewport is in mobile or desktop and changes the all projects nav and displays the matching content
  function allProjectsNav() {
    if (mobileView.matches) {
      projNavSubmenu.style.top = "-9999px";

      // Sets the selectedBtn to the currentButton (that was from the desktop version) and checks if the currentButton from the desktop version is development or ux/ui, so that it can switch 'all projects' (which is the selectedBtn) with it
      selectedBtn.textContent = currentButton.textContent;
      if (currentButton.textContent == "development") {
        allButtons[1].textContent = "UX / UI";
      } else if (currentButton.textContent == "UX / UI") {
        allButtons[1].textContent = "development";
      }

      // Removes the black highlight on the currentButton that was from the desktop version
      if (currentButton != null) {
        allBtnsGreenLines[currentBtnNum].style.height = "0";
        allButtons[currentBtnNum].style.fontWeight = "400";
      }

      // Removes the event listeners from the desktop version
      for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].removeEventListener("click", allProjectsDesktopNav);
      }

      // When the selector button in the all projects section is clicked, open or close drop down
      if (selectedBtn != null) {
        allButtons[0].addEventListener("click", function () {
          projNavSubmenu.style.top = "35px";
        });
      }
      // For each submenu button that is clicked, switches the text with the selector button text and closes the drop down menu
      for (let i = 1; i < allButtons.length; i++) {
        allButtons[i].addEventListener("click", allProjectsMobileNav);
      }
    } else {
      // Removes the event listeners from the mobile version
      allButtons[0].removeEventListener("click", function () {
        projNavSubmenu.style.top = "0";
      });
      for (let i = 1; i < allButtons.length; i++) {
        allButtons[i].removeEventListener("click", allProjectsMobileNav);
      }

      // Checks what is the selectedBtn text from mobile version and sets the currentButton to match for the desktop version
      if (selectedBtn.textContent == "UX / UI") {
        currentButton = allButtons[0];
        currentBtnNum = 0;
      } else if (selectedBtn.textContent == "development") {
        currentButton = allButtons[1];
        currentBtnNum = 1;
      }

      // Sets the black highlight on the current button and sets each button's text content to it's proper text for the desktop version
      allBtnsGreenLines[currentBtnNum].style.height = "4px";
      allButtons[currentBtnNum].style.fontWeight = "500";
      selectedBtn.textContent = "UX / UI";
      allButtons[1].textContent = "development";

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
  const contactStarters = document.querySelectorAll(".contact-starter");
  const categorySelectionBtns = document.querySelectorAll(
    "#category-selections button"
  );
  const categoryGreenLines = document.querySelectorAll(
    "#resume-content .green-line"
  );
  const categories = document.querySelectorAll("#resume-content .category");
  const skills = document.querySelectorAll("#skills .icons");
  const messages = document.querySelectorAll("#skills .message");
  const showEvents = ["mouseenter", "focus"];
  const hideEvents = ["mouseleave", "blur"];
  let popperInstances = {};
  popperInstances[0] = Popper.createPopper(skills[0], messages[0], {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: () => [-5, mobileView.matches ? -94 : -105],
        },
      },
    ],
  });

  // Create dynamic variables for popperInstance
  for (let i = 1; i < skills.length; i++) {
    popperInstances[i] = Popper.createPopper(skills[i], messages[i], {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: () => [-5, mobileView.matches ? -90 : -100],
          },
        },
      ],
    });
  }

  // POPPER REFERENCE: https://popper.js.org/docs/v2/tutorial/
  function show(i, popperInstance) {
    // Make the tooltip visible
    messages[i].setAttribute("data-show", "");

    // Enable the event listeners
    popperInstance.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: "eventListeners", enabled: true },
      ],
    }));

    // Update its position
    popperInstance.update();
  }

  function hide(i, popperInstance) {
    // Hide the tooltip
    messages[i].removeAttribute("data-show");

    // Disable the event listeners
    popperInstance.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: "eventListeners", enabled: false },
      ],
    }));
  }

  showEvents.forEach((event) => {
    for (let i = 0; i < skills.length; i++) {
      skills[i].addEventListener(event, show.bind(null, i, popperInstances[i]));
    }
  });

  hideEvents.forEach((event) => {
    for (let i = 0; i < skills.length; i++) {
      skills[i].addEventListener(event, hide.bind(null, i, popperInstances[i]));
    }
  });

  if (categories.length != 0) {
    categories[1].style.display = "none";
  }

  for (let i = 0; i < categorySelectionBtns.length; i++) {
    categorySelectionBtns[i].addEventListener("click", function () {
      // Hides previous selected content and removes the underline
      categories[prevActiveBtn].style.display = "none";
      categoryGreenLines[prevActiveBtn].style.height = "0";

      // Displays selected button content by removing the inline style display none and displays the underline
      categories[i].style.removeProperty("display");
      categoryGreenLines[i].style.height = "4px";

      // Moves id contact-starter to displayed resume content category
      if (i == 0) {
        contactStarters[0].id = "contact-starter";
        contactStarters[1].removeAttribute("id");
      } else {
        contactStarters[1].id = "contact-starter";
        contactStarters[0].removeAttribute("id");
      }
      prevActiveBtn = i;
    });
  }
})();
