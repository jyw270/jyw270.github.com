(function () {
  "use strict";

  //   Graphics Variables
  const plant01 = document.getElementById("plant01");
  const plant02 = document.getElementById("plant02");
  const plant03 = document.getElementById("plant03");
  const all_plants = [plant01, plant02, plant03];
  const mia = document.getElementById("mia");
  const bday_cake = document.getElementById("cake");
  const jenny = document.getElementById("jenny");
  const jenny_clicker = document.getElementById("jenny-clicker");

  // Letter Gift Variables
  const envelope = document.getElementById("envelope");
  const letter_overlay = document.getElementById("letter-overlay");
  const letter_exit_btn = document.querySelector(".close-btn");

  // Plant Message Overlay Variables
  const plant_msg_overlay = document.getElementById("plant-msg-overlay");
  const plant_msg_img = document.querySelector("#plant-msg-overlay img");
  const plant_msg = document.querySelector("#plant-msg-overlay textarea");
  const save_btn = document.getElementById("save-btn");
  const clear_btn = document.getElementById("clear-btn");
  const plant_exit_btn = document.querySelectorAll(".close-btn")[1];
  let og_msg = "";
  let plant_display_num = 0;

  //   Sounds
  const bday_melody = new Audio("sounds/bday-melody.mp3");
  bday_melody.volume = 0.2;
  bday_melody.loop = true;
  const sound_btn = document.getElementById("cake-btn");

  const bday_song = new Audio("sounds/bday-song.mp3");
  bday_song.volume = 0.7;

  //  Cake Sound Interactions
  //   If spacebar is pressed, checks if music is paused and plays/pauses sound and displays matching icon
  document.addEventListener("keydown", function (event) {
    if (event.key === " ") {
      if (bday_melody.paused) {
        bday_melody.play();
        sound_btn.className = "fa-solid fa-pause showing";
        setTimeout(function () {
          sound_btn.className = "fa-solid fa-pause hidden";
        }, 1000);
      } else {
        bday_melody.pause();
        sound_btn.className = "fa-solid fa-play showing";
        setTimeout(function () {
          sound_btn.className = "fa-solid fa-play hidden";
        }, 1000);
      }
    }
  });

  //   If bday cake is clicked, checks if music is paused and plays/pauses sound and displays matching icon
  bday_cake.addEventListener("click", function () {
    if (bday_melody.paused) {
      bday_melody.play();
      sound_btn.className = "fa-solid fa-pause showing";
    } else {
      bday_melody.pause();
      sound_btn.className = "fa-solid fa-play showing";
    }
  });

  //   When mouse hovering over cake checks if music is paused and displays matching icon
  bday_cake.addEventListener("mouseover", function () {
    bday_melody.paused
      ? (sound_btn.className = "fa-solid fa-play showing")
      : (sound_btn.className = "fa-solid fa-pause showing");
  });

  //   When mouse not hovering over cake checks if music is paused and hides matching icon
  bday_cake.addEventListener("mouseout", function () {
    bday_melody.paused
      ? (sound_btn.className = "fa-solid fa-play hidden")
      : (sound_btn.className = "fa-solid fa-pause hidden");
  });

  //   Functions
  function animateGraphic(name, graphic, sec) {
    setInterval(function () {
      graphic.src.includes(`graphics/${name}.svg`)
        ? (graphic.src = `graphics/${name}-cl.svg`)
        : (graphic.src = `graphics/${name}.svg`);
    }, sec);
  }

  function graphic_delay(name) {
    setTimeout(function () {
      jenny.src = `graphics/${name}.svg`;
    }, 1000);
  }

  //   Blinking effect for plants
  animateGraphic("plant01", plant01, 2000);
  animateGraphic("plant02", plant02, 5000);
  animateGraphic("plant03", plant03, 3000);

  //   Blinking effect for Mia
  mia.addEventListener("mouseover", function () {
    mia.src = "graphics/mia-cl.svg";
  });

  mia.addEventListener("mouseout", function () {
    mia.src = "graphics/mia.svg";
  });

  //   Animation and song effect interaction for Jenny

  jenny_clicker.addEventListener("click", function () {
    if (jenny.src.includes("graphics/jenny.svg")) {
      jenny.src = "graphics/jenny-2-cl.svg";
      bday_song.play();
    } else {
      bday_song.pause();
      jenny.src = "graphics/jenny-cl.svg";
      graphic_delay("jenny");
    }
  });

  //   If bday song has ended, will change grahpic back to original
  bday_song.addEventListener("ended", function () {
    bday_song.currentTime = 0;
    jenny.src = "graphics/jenny-cl.svg";
    graphic_delay("jenny");
  });

  //   Envelope Gift Overlay
  envelope.addEventListener("click", function () {
    letter_overlay.className = "overlay showing";
  });

  letter_exit_btn.addEventListener("click", function () {
    letter_overlay.className = "overlay hidden";
  });

  // 'ecs' key event listener for close button in overlay
  document.addEventListener("keydown", function (event) {
    if (
      letter_overlay.className == "overlay showing" &&
      event.key === "Escape"
    ) {
      letter_overlay.className = "overlay hidden";
    } else if (
      plant_msg_overlay.className == "overlay showing" &&
      event.key === "Escape"
    ) {
      plant_msg_overlay.className = "overlay hidden";
    }
  });

  //   Plant Message Overlay
  //   Listens for click on each plant and displays selected plant image and corresponding message on overlay
  for (let i in all_plants) {
    all_plants[i].addEventListener("click", function () {
      plant_msg_overlay.className = "overlay showing";
      plant_msg_img.src = all_plants[i].src;
      plant_display_num = Number(i) + 1;

      og_msg = localStorage.getItem(`plant0${plant_display_num}`);
      og_msg != null ? (plant_msg.value = og_msg) : (plant_msg.value = "");
    });
  }

  //   Saves overlay message to local storage
  save_btn.addEventListener("click", function () {
    localStorage.setItem(`plant0${plant_display_num}`, plant_msg.value);
    setTimeout(function () {
      alert("Saved successfully!");
      //   setTimeout(function () {
      //     plant_msg_overlay.className = "overlay hidden";
      //   }, 650);
    }, 500);
  });

  clear_btn.addEventListener("click", function () {
    plant_msg.value = "";
    localStorage.removeItem(`plant0${plant_display_num}`);
    setTimeout(function () {
      alert("Changes saved!");
    }, 500);
  });

  plant_exit_btn.addEventListener("click", function () {
    plant_msg_overlay.className = "overlay hidden";
  });

  //   Candle flame microphone interaction

  //  SOURCE CODE FROM: https://codepen.io/jsonyeung/pen/BvZmPR

  ////////////////////
  //// AUDIO CODE ////
  ////////////////////
  let audioContext;
  let microphone, meter;

  // Get request for microphone usage
  const requestAudioAccess = () => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => setAudioStream(stream))
        .catch(
          (err) => console.log(err)
          //   alert("This pen requires a microphone to work properly.")
        );
    } else alert("Your browser does not support required microphone access.");
  };

  // Set up to record volume
  const setAudioStream = (stream) => {
    audioContext = new AudioContext();
    microphone = audioContext.createMediaStreamSource(stream);
    meter = createAudioMeter(audioContext);

    const filter = audioContext.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 400;

    microphone.connect(filter);
    filter.connect(meter);
  };

  // Check if is blowing
  let lowpass = 0;
  const ALPHA = 0.5,
    THRESHOLD = 0.09;
  const isBlowing = () => {
    lowpass = ALPHA * meter.volume + (1.0 - ALPHA) * lowpass;
    return lowpass > THRESHOLD;
  };

  requestAudioAccess();

  /////////////////////
  //// CANDLE CODE ////
  /////////////////////
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const cw = (canvas.width = 100);
  const ch = (canvas.height = 120);

  const particles = [];
  const MAX_PART_COUNT = 100;

  const REIGNITE_RATE = 2; // rate at which flame will recover
  const MAX_PART_DOWNTIME = 25; // max limit at which smothered flame will recover

  const rand = (min, max) => min + Math.random() * (max - min);

  // Fire Particle
  class FlameParticle {
    constructor(x = cw / 2, y = ch / 2) {
      this.radius = 15;
      this.speed = { x: rand(-0.5, 0.5), y: 2.5 };
      this.life = rand(50, 100);
      this.alpha = 0.5;

      this.x = x;
      this.y = y;
      this.curAlpha = this.alpha;
      this.curLife = this.life;
    }

    update = () => {
      if (this.curLife <= 90) {
        this.radius -= Math.min(this.radius, 0.25);
        this.curAlpha -= 0.005;
      }

      if (microphone && isBlowing())
        this.x += rand(-meter.volume, meter.volume) * 50;

      this.curLife -= this.speed.y;
      this.y -= this.speed.y;
      this.draw();
    };

    draw = () => {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
      ctx.fillStyle = `rgba(254, 252, 207, ${this.curAlpha})`;
      ctx.fill();
      ctx.closePath();
    };
  }

  // Flame Base
  class FlameBase {
    update = (this.draw = () => {
      ctx.beginPath();
      ctx.arc(cw / 2, ch / 2, 14, Math.PI * 2, false);
      ctx.fillStyle = "rgba(185, 125, 45, 0.4)";
      ctx.fill();
      ctx.closePath();
    });
  }

  ////////////////////
  let base = new FlameBase();
  let particleCount = MAX_PART_COUNT;

  const updateParticles = () => {
    for (let i = 0; i < particleCount; i++) {
      if (particles[i] != null) {
        if (particles[i].curLife < 0) particles[i] = new FlameParticle();
        particles[i].update();
      }
    }
  };

  const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, cw, ch);

    // Smother flame if user is blowing
    if (microphone && isBlowing())
      if (particleCount > -MAX_PART_DOWNTIME) particleCount -= 1;

    // draw flame
    updateParticles();

    // draw base
    base.update();
  };

  // Initial particle generation
  for (let i = 0; i < MAX_PART_COUNT; i++) particles.push(new FlameParticle());

  // Interval to recover flames if smothered
  setInterval(() => {
    if (particleCount < MAX_PART_COUNT) particleCount += REIGNITE_RATE;
  }, 200);

  animate();
})();
