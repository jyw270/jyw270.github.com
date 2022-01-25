(function () {
  "use strict";

  const timestamp = document.getElementById("timestamp");
  const totaloz = document.getElementById("totaloz");
  const bars = document.querySelectorAll(".bar");
  const barinfo = document.querySelectorAll(".bar p");
  const timePtags = document.querySelectorAll("#time p");
  const slider = document.querySelector("input");
  let timedata = [];
  let waterdata = [];
  let totalwater = [];
  let x = 15;

  // when the slider button moves will change cup of water content
  slider.addEventListener("change", function (event) {
    event.preventDefault();
    const index = event.target.value;

    document.querySelector("img").src = `images/${totalwater[index]}oz.svg`;
    timestamp.textContent = `${timedata[index]}`;
    totaloz.textContent = `${totalwater[index]}oz`;
  });

  // displays the bars and times at its correct spot
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.top = `${415 - x}px`;
    timePtags[i].style.top = `${410 - x}px`;
    x += 55;
  }

  // gets data from json file and stores content in array
  async function getData() {
    let i = 0;
    const waterIntake = await fetch("data/data.json");
    const data = await waterIntake.json();

    for (let key in data) {
      timedata.push(key);
      waterdata.push(data[key]);
      i == 0
        ? totalwater.push(data[key])
        : totalwater.push(data[key] + totalwater[i - 1]);
      i++;
    }

    outputData();
  }

  function outputData() {
    // outputs the bar graph info
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.width = `${waterdata[i] * 10 - 2.5}%`;
      barinfo[i].textContent = `${waterdata[i]}oz`;
      timePtags[i].textContent = `${timedata[i]}`;
    }

    // outputs time and oz info for left section (water graphics and slider)
    const sliderarea = document.querySelectorAll("#sliderarea p");
    sliderarea[0].textContent = `${timedata[0]}`;
    sliderarea[1].textContent = `${timedata[timedata.length - 1]}`;
    timestamp.textContent = `${timedata[0]}`;
    totaloz.textContent = `${totalwater[0]}oz`;
  }

  getData();
})();
