(function () {
  "use strict";

  const video = document.querySelector("video");
  const loading = document.querySelector(".fa-leaf");
  const poemlines = document.querySelectorAll("#poem p");
  const times = {
    start: [0, 7, 13, 20],
    stop: [5, 11, 18, 24],
  };
  const poemInterval = setInterval(checkTime, 1000); // displays each poem line at their given time
  const grayscaleInterval = setInterval(filterVideo, 1000); // changes the video filter

  video.addEventListener("playing", function () {
    loading.style.display = "none";
  });

  for (let i = 0; i < poemlines.length; i++) {
    poemlines[i].style.transition = "all 2.5s";
  }

  function checkTime() {
    for (let i = 0; i < poemlines.length; i++) {
      // prints out poem line in between it's start and stop time
      if (
        times.start[i] < video.currentTime &&
        video.currentTime < times.stop[i]
      ) {
        poemlines[i].className = "showing";
      } else {
        poemlines[i].className = "hidden";
      }
    }
  }

  function filterVideo() {
    // when the video is at a certain second between 0 and 25, i (the second) will be mutliplied by 4 and deducted from 100 in order to adjust to it's corresponding greyscale filter
    for (let i = 0; i <= 25; i++) {
      if (video.currentTime > i && video.currentTime < i + 1) {
        video.style.filter = `grayscale(${100 - i * 4}%)`;
      }
    }
  }
})();
