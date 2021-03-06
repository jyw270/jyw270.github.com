(function () {
  "use strict";

  const button = document.querySelector("button");
  const body = document.querySelector("body");
  const container = document.querySelector("#container");
  const banner = document.querySelector("#banner");
  const bannerimg = document.querySelector("img");
  const sections = document.querySelectorAll("section");
  const flowers = document.querySelectorAll(".hide-flower");
  let mode = "dark";

  for (let i = 0; i < sections.length; i++) {
    sections[i].addEventListener("mouseover", function () {
      flowers[i].className = "show-flower";
      if (i == 1) {
        flowers[0].className = "show-flower";
      }
    });

    sections[i].addEventListener("mouseleave", function () {
      flowers[i].className = "hide-flower";
      if (i == 1) {
        flowers[0].className = "hide-flower";
      }
    });
  }

  button.addEventListener("click", function () {
    if (mode === "dark") {
      body.className = "switch";
      container.className = "switch";
      banner.className = "switch";
      button.className = "switch";
      for (const section of sections) {
        section.className = "switch";
      }
      mode = "light";

      bannerimg.src = "images/dark-banner.svg";
    } else {
      body.removeAttribute("class");
      container.removeAttribute("class");
      banner.removeAttribute("class");
      button.removeAttribute("class");
      for (const section of sections) {
        section.removeAttribute("class");
      }
      mode = "dark";

      bannerimg.src = "images/light-banner.svg";
    }
  });
})();
