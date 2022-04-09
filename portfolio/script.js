(function () {
  "use strict";

  // HOME PAGE
  const devBtn = document.getElementById("dev-btn");
  const uxBtn = document.getElementById("ux-btn");
  const navBtn = document.querySelector("header i");
  const content = document.querySelector(".content");

  navBtn.addEventListener("mouseover", function () {
    content.style.position = "relative";
    setTimeout(function () {
      document.querySelector("header").style.boxShadow = "none";
    }, 1000);
  });

  navBtn.addEventListener("mouseleave", function () {
    content.style.position = "static";
    setTimeout(function () {
      document.querySelector("header").style.boxShadow =
        "0px 4px 5px rgba(160, 160, 160, 0.2)";
    }, 100);
  });

  // ABOUT PAGE
  const h3categories = document.querySelectorAll("#categories h3");
  const aboutBtns = document.querySelectorAll("#categories button");
  let prevActiveBtn = 0;
  const categories = document.querySelectorAll("#about .category");
  const schools = document.querySelectorAll("#about .school");

  for (let i = 0; i < aboutBtns.length; i++) {
    aboutBtns[i].addEventListener("click", function () {
      // hide/reset initial button content
      categories[prevActiveBtn].className = "category hidden";
      h3categories[prevActiveBtn].style.color = "#b1b1b1";
      h3categories[prevActiveBtn].style.fontWeight = "400";
      if (prevActiveBtn == 1) {
        schools[0].className = "school hidden";
        schools[1].className = "school hidden";
      }

      // display clicked button content
      categories[i].className = "category showing";
      h3categories[i].style.color = "#f2acac";
      h3categories[i].style.fontWeight = "500";
      if (i === 1) {
        schools[0].className = "school showing";
        schools[1].className = "school showing";
      }

      prevActiveBtn = i;
    });
  }

  // MOBILE / DESKTOP IMAGES
  const images = document.querySelectorAll(".image");

  window.addEventListener("load", function () {
    changeImageSrc();
  });
  window.addEventListener("resize", function () {
    changeImageSrc();
  });

  function changeImageSrc() {
    if (window.innerWidth > 1020 && images[0].src.includes("mobile")) {
      images.forEach(function (eachImage) {
        if (
          eachImage.src.includes("travel-planner/testing-2") ||
          eachImage.src.includes("travel-planner/testing-4")
        ) {
          eachImage.style.display = "none";
        } else {
          eachImage.src = `${eachImage.src.replace("mobile", "desktop")}`;
        }
      });
    } else if (window.innerWidth < 1020 && images[0].src.includes("desktop")) {
      images.forEach(function (eachImage) {
        if (
          eachImage.src.includes("travel-planner/testing-2") ||
          eachImage.src.includes("travel-planner/testing-4")
        ) {
          eachImage.style.display = "initial";
        } else {
          eachImage.src = `${eachImage.src.replace("desktop", "mobile")}`;
        }
      });
    }
  }
})();
