(function () {
  "use strict";

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
})();
