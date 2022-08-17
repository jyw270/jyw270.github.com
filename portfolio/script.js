(function () {
  "use strict";

  // -------------------- HEADER NAVIGATION --------------------

  const navBtn = document.querySelector("header i");
  const nav = document.querySelector("header .submenu");
  const transparent_bg = document.querySelector("#transparent-background");
  const right_arrow = document.querySelector("header .submenu .fa-arrow-right");
  const navOptions = document.querySelectorAll("header .submenu li");

  // When hamburger nav icon is clicked, slide in navigation menu
  navBtn.addEventListener("click", function () {
    document.body.style.overflow = "hidden";
    document.querySelector("html").style.overflow = "hidden";
    nav.style.right = "0";
    setTimeout(function () {
      transparent_bg.style.transition = "all 0.5s ease";
      transparent_bg.className = "showing";
    }, 2000);
  });

  // When transparent background is clicked, close the nav menu
  transparent_bg.addEventListener("click", function () {
    document.body.style.overflow = "initial";
    document.querySelector("html").style.overflow = "initial";
    transparent_bg.className = "hidden";
    setTimeout(function () {
      nav.style.right = "-9999px";
    }, 500);
  });

  // When back arrow icon from hamburger menun is clicked, close the nav menu
  right_arrow.addEventListener("click", function () {
    document.body.style.overflow = "initial";
    document.querySelector("html").style.overflow = "initial";
    transparent_bg.className = "hidden";
    setTimeout(function () {
      nav.style.right = "-9999px";
    }, 500);
  });

  // For each nav option in hamburger menu clicked, close the nav menu
  navOptions.forEach(function (eachOption) {
    eachOption.addEventListener("click", function () {
      document.body.style.overflow = "initial";
      document.querySelector("html").style.overflow = "initial";
      transparent_bg.style.transition = "all 0.1s ease";
      transparent_bg.className = "hidden";
      nav.style.right = "-9999px";
    });
  });

  // -------------------- HOME PAGE --------------------
  const allProjectsBtn = document.querySelector("#all-projects-btn");
  const submenuItems = document.querySelectorAll("#allprojects .submenu li");

  // When the all projects drop down menu is clicked, open or close drop down
  allProjectsBtn.addEventListener("click", function () {
    if (submenuItems[0].style.top != "41.25px") {
      submenuItems[0].style.top = "41.25px";
      submenuItems[1].style.top = "80.9px";
    } else {
      submenuItems[0].style.top = "0";
      submenuItems[1].style.top = "0";
    }
  });

  // const navBtn = document.querySelector("header i");
  // const content = document.querySelector(".content");
  // const allProjectsBtn = document.getElementById("all-projects-btn");
  // const devBtn = document.getElementById("dev-btn");
  // const uxBtn = document.getElementById("ux-btn");
  // const uxProjectsOnly = document.querySelectorAll(".ux-ui-only");
  // let previousBtn = allProjectsBtn;

  // navBtn.addEventListener("mouseover", function () {
  //   content.style.position = "relative";
  //   setTimeout(function () {
  //     document.querySelector("header").style.boxShadow = "none";
  //   }, 1000);
  // });

  // navBtn.addEventListener("mouseleave", function () {
  //   content.style.position = "static";
  //   setTimeout(function () {
  //     document.querySelector("header").style.boxShadow =
  //       "0px 4px 5px rgba(160, 160, 160, 0.2)";
  //   }, 100);
  // });

  // allProjectsBtn.addEventListener("click", function () {
  //   // changes all projects btn to highlighted btn
  //   highlightBtn(allProjectsBtn);
  //   previousBtn = allProjectsBtn;
  // });

  // devBtn.addEventListener("click", function () {
  //   // changes dev btn to highlighted btn
  //   highlightBtn(devBtn);
  //   previousBtn = devBtn;
  // });

  // uxBtn.addEventListener("click", function () {
  //   // changes ux btn to highlighted btn
  //   highlightBtn(uxBtn);
  //   previousBtn = uxBtn;
  // });

  // // FUNCTION: changes clicked btn to highlighted btn and removes it from the previous btn
  // function highlightBtn(activatedBtn) {
  //   if (window.innerWidth >= 750) {
  //     activatedBtn.style.border = "none";
  //     activatedBtn.style.color = "#fff";
  //     activatedBtn.style.backgroundColor = "#f2acac";

  //     previousBtn.style.border = "2px solid #e5e5e5";
  //     previousBtn.style.color = "#f2acac";
  //     previousBtn.style.backgroundColor = "#fff";
  //   }

  //   if (activatedBtn == devBtn) {
  //     uxProjectsOnly.forEach(function (eachproject) {
  //       eachproject.style.display = "none";
  //     });
  //   } else {
  //     uxProjectsOnly.forEach(function (eachproject) {
  //       eachproject.style.display = "initial";
  //     });
  //   }
  // }

  // // ABOUT PAGE
  // const h3categories = document.querySelectorAll("#categories h3");
  // const aboutBtns = document.querySelectorAll("#categories button");
  // let prevActiveBtn = 0;
  // const categories = document.querySelectorAll("#about .category");
  // const schools = document.querySelectorAll("#about .school");

  // for (let i = 0; i < aboutBtns.length; i++) {
  //   aboutBtns[i].addEventListener("click", function () {
  //     // hide/reset initial button content
  //     categories[prevActiveBtn].className = "category hidden";
  //     h3categories[prevActiveBtn].style.color = "#b1b1b1";
  //     h3categories[prevActiveBtn].style.fontWeight = "400";
  //     if (prevActiveBtn == 1) {
  //       schools[0].className = "school hidden";
  //       schools[1].className = "school hidden";
  //     }

  //     // display clicked button content
  //     categories[i].className = "category showing";
  //     h3categories[i].style.color = "#f2acac";
  //     h3categories[i].style.fontWeight = "500";
  //     if (i === 1) {
  //       schools[0].className = "school showing";
  //       schools[1].className = "school showing";
  //     }

  //     prevActiveBtn = i;
  //   });
  // }

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
