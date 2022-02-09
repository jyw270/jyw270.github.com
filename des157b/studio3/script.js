Parse.initialize(
  "LZT9xCfra7XYiPTUkKsb0YsNU1C5JO5DO0EG9yu9",
  "psymDutTByeWIxEQ2uMTRsMMNNOXD0P0Y2QJASAV"
);
Parse.serverURL = "https://parseapi.back4app.com/";

(function () {
  "use strict";

  // VARIABLES
  // Used in displayCards() and displayExperienceOverlay()
  let swiper;
  let cardID;
  let allCards;

  const sharebtn = document.getElementById("sharebtn");
  const closebtn = document.querySelectorAll(".close-btn");
  const form = document.querySelector(".form");
  const studentCard = document.querySelector("#experience-overlay");
  const slider = document.querySelector(".swiper-wrapper");

  // FUNCTIONS
  // displayCards(): Gets experiences from database and displays them on the page
  async function displayCards() {
    const experiences = Parse.Object.extend("Experiences");
    const query = new Parse.Query(experiences);
    let card;
    let words;
    let response_preview;
    let total_length;

    try {
      const results = await query.ascending("name").find();

      results.forEach(function (eachExperience) {
        eachExperience.get("question") != ""
          ? (words = eachExperience.get("thoughts").split(" "))
          : (words = eachExperience.get("ratingresponse").split(" "));

        total_length = 0;

        // Creating response preview by slicing rating response or thoughts text
        for (let i = 0; i < words.length; i++) {
          if (total_length < 25) {
            total_length += words[i].length;
            eachExperience.get("question") != ""
              ? (response_preview = eachExperience
                  .get("thoughts")
                  .slice(0, total_length + i))
              : (response_preview = eachExperience
                  .get("ratingresponse")
                  .slice(0, total_length + i));
          } else {
            break;
          }
        }

        // Adds content to card and appends to slider on page
        card = document.createElement("div");
        card.setAttribute("class", "swiper-slide");
        card.setAttribute("data-swiper-autoplay", "2000");
        card.setAttribute("id", `r-${eachExperience.id}`);
        card.innerHTML = `
          <h2>${eachExperience.get("name")}</h2>
          <h3>${eachExperience.get("year")}</h3>
          <p>${response_preview}...</p>`;

        slider.append(card);
      });

      // Swiper API initialization
      swiper = new Swiper(".swiper", {
        direction: "vertical",
        loop: true,

        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        slidesPerView: 3,
        spaceBetween: 30,
      });

      swiper.mousewheel.enable();

      // Adds click event listener on all of the cards on the page and passes the card id to display overlay function
      allCards = document.querySelectorAll(".swiper-slide");
      allCards.forEach(function (eachCard) {
        eachCard.addEventListener("click", function () {
          cardID = eachCard.getAttribute("id").slice(2);
          displayExperienceOverlay(cardID);
        });
      });
    } catch (error) {
      console.error("Error while fetching experiences", error);
    }
  }

  displayCards();

  // displayExperienceOverlay(): Takes in the card ID and displays that card's content from the database
  async function displayExperienceOverlay(cardID) {
    const experiences = Parse.Object.extend("Experiences");
    const query = new Parse.Query(experiences);
    query.equalTo("objectId", cardID);
    try {
      const results = await query.find();
      results.forEach(function (thisExperience) {
        document.querySelector(
          "#experience-overlay div h2"
        ).textContent = `${thisExperience.get("name")}`;
        document.querySelector(
          "#experience-overlay div h3"
        ).textContent = `${thisExperience.get("year")}`;
        document
          .querySelector("#experience-overlay div img")
          .setAttribute("src", `images/${thisExperience.get("rating")}.svg`);
        document.querySelector(
          "#myexperience"
        ).textContent = `${thisExperience.get("rating")}`;
        if (
          thisExperience.get("rating") == "terrible" ||
          thisExperience.get("rating") == "amazing"
        ) {
          document.querySelector("#myexperience").style.left = "9%";
        } else {
          document.querySelector("#myexperience").style.left = "10%";
        }
        document.querySelector(
          "#rating"
        ).textContent = `How was your experience ${thisExperience.get(
          "rating"
        )}?`;
        document.querySelector(
          "#ratingresponse"
        ).textContent = `${thisExperience.get("ratingresponse")}`;
        if (thisExperience.get("question") != "") {
          document.querySelector(
            "#question"
          ).textContent = `${thisExperience.get("question")}`;
          document.querySelector(
            "#thoughts"
          ).textContent = `${thisExperience.get("thoughts")}`;
        } else {
          document.querySelector("#question").textContent = "";
          document.querySelector("#thoughts").textContent = "";
        }
      });

      swiper.autoplay.stop();
      studentCard.className = "showing";
    } catch (error) {
      console.error("Error while fetching experiences", error);
    }
  }

  // addExperience(): Adds user's experience to database
  async function addExperience(newExperience) {
    const newExperienceData = new Parse.Object("Experiences");
    newExperienceData.set("name", newExperience.name);
    newExperienceData.set("password", newExperience.password);
    newExperienceData.set("year", newExperience.schoolyear[0]);
    newExperienceData.set("rating", newExperience.rating[0]);
    newExperienceData.set("ratingresponse", newExperience.ratingresponse);
    newExperienceData.set("question", newExperience.question[0]);
    if (newExperience.question[0] != "") {
      newExperienceData.set("thoughts", newExperience.thoughts);
    }

    try {
      await newExperienceData.save();
      // displayCards();
    } catch (error) {
      console.error("Error while creating experience", error);
    }
  }

  // CONVERSATIONAL FORMS
  window.onload = function () {
    // SHARE EXPERIENCE FORM: Conversational Form API initialization
    let se_conversationalForm =
      window.cf.ConversationalForm.startTheConversation({
        formEl: document.getElementById("share-experience-form"),
        context: document.getElementById("share-exp-form-context"),
        showProgressBar: true,
        submitCallback: function () {
          // WHEN SHARE EXPERIENCE FORM IS SUBMITTED
          const formData = se_conversationalForm.getFormData(true);
          let words = formData.name.split(" ");

          // Capitalizes name properly
          for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toString().toUpperCase() + words[i].slice(1);
          }
          formData.name = words.join(" ");

          // Capitalizes first letter rating response
          words = formData.ratingresponse.split(" ");
          words[0] = words[0][0].toString().toUpperCase() + words[0].slice(1);
          formData.ratingresponse = words.join(" ");

          addExperience(formData);

          se_conversationalForm.addRobotChatResponse(
            "Thank you for sharing! Your experience has been added to the page."
          );

          // Hides conversational form when done filling out form and starts autoplay on slides
          setTimeout(function () {
            form.className = "form hidden";
          }, 1500);
          setTimeout(function () {
            location.reload();
          }, 3000);
        },
      });
  };

  // EVENT LISTENERS
  // When 'Share Your Experience' btn clicked, shows form and stops slide autoplay
  sharebtn.addEventListener("click", function () {
    form.className = "form showing";
    swiper.autoplay.stop();
  });

  // When X button clicked, hides form and starts slide autoplay
  closebtn.forEach(function (eachbtn) {
    eachbtn.addEventListener("click", function () {
      form.className == "form showing"
        ? (form.className = "form hidden")
        : (studentCard.className = "hidden");

      swiper.autoplay.start();
    });
  });

  // When 'esc' key pressed when an overlay is showing, hides overlay and starts slide autoplay
  document.addEventListener("keydown", function (event) {
    if (
      (form.className == "form showing" && event.key === "Escape") ||
      (studentCard.className == "form showing" && event.key === "Escape")
    ) {
      form.className == "form showing"
        ? (form.className = "form hidden")
        : (studentCard.className = "hidden");
      swiper.autoplay.start();
    }
  });
})();
