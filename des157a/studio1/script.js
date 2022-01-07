(function () {
  "use strict";

  const myForm = document.querySelector("#myform");
  const madlib = document.querySelector("#madlib");
  const resetBtn = document.querySelector("#reset-btn");

  const formData = document.querySelectorAll("input[type=text]");
  const inputFields = document.querySelectorAll("input");
  const imgTag = document.querySelectorAll("img");

  const happenings = document.querySelectorAll(".happenings");
  const happeningsBTags = document.querySelectorAll(".happenings b");
  const rightPage = document.querySelectorAll(".right-page");
  const rightPageBTags = document.querySelectorAll(".right-page b");

  // RESET BUTTON ACTION
  resetBtn.addEventListener("click", function (event) {
    event.preventDefault();
    madlib.style.display = "none";
    imgTag[2].className = "hidden";

    for (let i = 0; i < happenings.length; i++) {
      happenings[i].style.display = "none";
    }
    for (let i = 0; i < rightPage.length; i++) {
      rightPage[i].style.display = "none";
    }

    for (let eachField of inputFields) {
      eachField.className = "grey";
    }

    setTimeout(function () {
      imgTag[1].className = "showing";
    }, 1000);
    setTimeout(function () {
      myForm.style.display = "block";
    }, 1500);

    for (let eachWord of formData) {
      eachWord.value = "";
    }
  });

  // SUBMIT BUTTON ACTION
  myForm.addEventListener("submit", function (event) {
    event.preventDefault();
    processData(formData);
  });

  // PROCESS DATA FUNCTION
  // USAGE: takes in an array of all of the inputs and checks if there are any empty fields and
  // incorrect month input; then sends an array of the user's inputs to makeMadLib function
  function processData(formData) {
    let emptyFields = 0;
    let words = [];

    for (let eachWord of formData) {
      if (eachWord.value) {
        words.push(eachWord.value);
      } else {
        emptyFields++;
      }
    }

    if (emptyFields > 0 && emptyFields < 11) {
      alert("Please fill out all of the fields.");
    } else {
      if (emptyFields == 11) {
        words = [
          "January",
          "smoothie",
          "small",
          "bunnies",
          "Hawaii",
          "cookies",
          "The Book Thief",
          "Rhyme",
          "picnic day",
          "lights",
          "danced",
        ];

        for (let eachField of inputFields) {
          eachField.className = "black";
        }
      }

      setTimeout(function () {
        changeImg();
      }, 160);
    }

    function changeImg() {
      const month = words[0].toString().toLowerCase();

      // checks if month input is a valid month; if it is, display month's bullet journal image, else send an alert to the user
      switch (month) {
        case "january":
        case "1":
          imgTag[2].setAttribute("src", "images/january.svg");
          break;
        case "february":
        case "2":
          imgTag[2].setAttribute("src", "images/february.svg");
          break;
        case "march":
        case "3":
          imgTag[2].setAttribute("src", "images/march.svg");
          break;
        case "april":
        case "4":
          imgTag[2].setAttribute("src", "images/april.svg");
          break;
        case "may":
        case "5":
          imgTag[2].setAttribute("src", "images/may.svg");
          break;
        case "june":
        case "6":
          imgTag[2].setAttribute("src", "images/june.svg");
          break;
        case "july":
        case "7":
          imgTag[2].setAttribute("src", "images/july.svg");
          break;
        case "august":
        case "8":
          imgTag[2].setAttribute("src", "images/august.svg");
          break;
        case "september":
        case "9":
          imgTag[2].setAttribute("src", "images/september.svg");
          break;
        case "october":
        case "10":
          imgTag[2].setAttribute("src", "images/october.svg");
          break;
        case "november":
        case "11":
          imgTag[2].setAttribute("src", "images/november.svg");
          break;
        case "december":
        case "12":
          imgTag[2].setAttribute("src", "images/december.svg");
          break;
        default:
          alert("Please enter a valid month.");
          return;
      }

      imgTag[1].className = "hidden";
      setTimeout(function () {
        imgTag[2].style.transitionProperty = "visibility, opacity";
        imgTag[2].style.transitionDuration = "1.5s";
        imgTag[2].style.transitionTimingFunction = "ease";
        imgTag[2].className = "showing";
      }, 1000);

      makeMadLib(words);
    }
  }

  // CAPITALIZE WORDS FUNCTION
  // USAGE: takes in an arrays of words and stores certain words to capitalize in 'inputs' array;
  // capitalizes each word's first letter in each phrase, then stores it back in 'inputs' array
  // to return
  function captilizeWords(wordsArray) {
    let words;
    const inputs = [
      wordsArray[4],
      wordsArray[6],
      wordsArray[7],
      wordsArray[8],
      wordsArray[9],
    ];
    for (let i = 0; i < inputs.length; i++) {
      words = inputs[i].split(" ");
      for (let j = 0; j < words.length; j++) {
        words[j] = words[j][0].toString().toUpperCase() + words[j].slice(1);
      }
      inputs[i] = words.join(" ");
    }
    return inputs;
  }

  // ADD USER'S INPUT FUNCTION
  // USAGE: takes in an array of words, capitalized words, and b tags for a specific month's poem, along
  // with 4 specific words that need to be arranged in a certain order; will add user's input to certain
  // b tags within the html
  function addUserInput(
    wordsArray,
    capsWords,
    poemBTags,
    month,
    item1,
    item2,
    item3,
    item4
  ) {
    poemBTags[0].textContent = `${month}`; // poem: month
    poemBTags[1].textContent = `${item1}`; // poem
    poemBTags[2].textContent = `${item2}`; // poem
    poemBTags[3].textContent = `${item3}`; // poem
    happeningsBTags[0].textContent = `${capsWords[0]}`; // happenings-going: travel place
    happeningsBTags[1].textContent = `${item4}`; // happenings-eating: food or drink
    happeningsBTags[2].textContent = `${capsWords[1]}`; // happenings-reading: book title
    rightPageBTags[0].textContent = `${capsWords[2]}`; // important dates: name
    rightPageBTags[1].textContent = `${capsWords[3]}`; // important dates: event
    rightPageBTags[2].textContent = `${capsWords[4]}`; // note to self: plural noun
    rightPageBTags[3].textContent = `${wordsArray[10]}`; // note to self: past tense verb
  }

  function makeMadLib(wordsArray) {
    myForm.style.display = "none";
    madlib.style.display = "block";

    // displays 'happenings' content
    for (let i = 0; i < happenings.length; i++) {
      setTimeout(function () {
        happenings[i].style.display = "block";
      }, 1000);
    }

    // displays right page of bullet journal content
    for (let i = 0; i < rightPage.length; i++) {
      setTimeout(function () {
        rightPage[i].style.display = "block";
      }, 1000);
    }

    // hides all poems
    const poem = document.querySelectorAll(".poem");
    for (let i = 0; i < poem.length; i++) {
      poem[i].style.display = "none";
    }

    const capsWords = captilizeWords(wordsArray);

    const eatingList1 = document.querySelector("#eating li");
    const importantDates = document.getElementById("important-dates");
    const importantDatesLists = document.querySelectorAll(
      "#important-dates li"
    );
    const month = wordsArray[0].toString().toLowerCase();

    let poemBTags;
    switch (month) {
      case "january":
      case "1":
        // JANUARY BULLET JOURNAL
        setTimeout(function () {
          poem[0].style.display = "block";
        }, 1000);

        poemBTags = document.querySelectorAll("#januaryPoem b");

        addUserInput(
          wordsArray,
          capsWords,
          poemBTags,
          "January",
          wordsArray[1],
          wordsArray[2],
          wordsArray[3],
          wordsArray[5]
        );

        eatingList1.textContent = "s'mores :)";

        importantDates.style.right = "74px";
        importantDatesLists[0].textContent = "New Year's Day";
        importantDatesLists[1].textContent = "Doctor's Appt";
        importantDatesLists[2].textContent = "Chemistry Exam";

        break;
      case "february":
      case "2":
        // FEBRUARY BULLET JOURNAL
        setTimeout(function () {
          poem[1].style.display = "block";
        }, 1000);

        poemBTags = document.querySelectorAll("#februaryPoem b");

        addUserInput(
          wordsArray,
          capsWords,
          poemBTags,
          "February",
          wordsArray[3],
          wordsArray[5],
          wordsArray[2],
          wordsArray[1]
        );

        eatingList1.textContent = "heart chocolates :)";

        importantDates.style.right = "67px";
        importantDatesLists[0].textContent = "Calc quiz";
        importantDatesLists[1].textContent = "Carnival";
        importantDatesLists[2].textContent = "Valentine's Day";

        break;
      case "march":
      case "3":
        // MARCH BULLET JOURNAL
        setTimeout(function () {
          poem[2].style.display = "block";
        }, 1000);

        poemBTags = document.querySelectorAll("#marchPoem b");

        addUserInput(
          wordsArray,
          capsWords,
          poemBTags,
          "March",
          wordsArray[3],
          wordsArray[2],
          wordsArray[5],
          wordsArray[1]
        );

        eatingList1.textContent = "rice krispie treats :)";

        importantDates.style.right = "67px";
        importantDatesLists[0].textContent = "English Midterm";
        importantDatesLists[1].textContent = "Dentist Appt";
        importantDatesLists[2].textContent = "St. Patrick's Day";

        break;
      case "april":
      case "4":
        // APRIL BULLET JOURNAL
        setTimeout(function () {
          poem[3].style.display = "block";
        }, 1000);

        poemBTags = document.querySelectorAll("#aprilPoem b");

        addUserInput(
          wordsArray,
          capsWords,
          poemBTags,
          "April",
          wordsArray[3],
          wordsArray[2],
          wordsArray[1],
          wordsArray[5]
        );

        eatingList1.textContent = "marshmallows :)";

        importantDates.style.right = "65px";
        importantDatesLists[0].textContent = "Easter Sunday";
        importantDatesLists[1].textContent = "Statistics Exam";
        importantDatesLists[2].textContent = "Earth Day";

        break;
      case "may":
      case "5":
        // MAY BULLET JOURNAL
        setTimeout(function () {
          poem[4].style.display = "block";
        }, 1000);

        poemBTags = document.querySelectorAll("#mayPoem b");

        addUserInput(
          wordsArray,
          capsWords,
          poemBTags,
          "May",
          wordsArray[3],
          wordsArray[2],
          wordsArray[5],
          wordsArray[1]
        );

        eatingList1.textContent = "frozen yogurt :)";

        importantDates.style.right = "65px";
        importantDatesLists[0].textContent = "Return Books";
        importantDatesLists[1].textContent = "Mother's Day";
        importantDatesLists[2].textContent = "Dance Practice";

        break;
      case "june":
      case "6":
        //  JUNE BULLET JOURNAL
        setTimeout(function () {
          poem[5].style.display = "block";
        }, 1000);

        poemBTags = document.querySelectorAll("#junePoem b");

        addUserInput(
          wordsArray,
          capsWords,
          poemBTags,
          "June",
          wordsArray[2],
          wordsArray[5],
          wordsArray[3],
          wordsArray[1]
        );

        eatingList1.textContent = "ice cream :)";

        importantDates.style.right = "65px";
        importantDatesLists[0].textContent = "Return Books";
        importantDatesLists[1].textContent = "Last Day of School";
        importantDatesLists[2].textContent = "Father's Day";

        break;
      case "july":
      case "7":
        // JULY BULLET JOURNAL
        setTimeout(function () {
          poem[6].style.display = "block";
        }, 1000);

        poemBTags = document.querySelectorAll("#julyPoem b");

        addUserInput(
          wordsArray,
          capsWords,
          poemBTags,
          "July",
          wordsArray[3],
          wordsArray[2],
          wordsArray[5],
          wordsArray[1]
        );

        eatingList1.textContent = "frozen yogurt :)";

        importantDates.style.right = "67px";
        importantDatesLists[0].textContent = "4th of July";
        importantDatesLists[1].textContent = "Picnic Day";
        importantDatesLists[2].textContent = "Disneyland Day!";

        break;
      case "august":
      case "8":
        // AUGUST BULLET JOURNAL
        setTimeout(function () {
          poem[7].style.display = "block";
        }, 1000);

        poemBTags = document.querySelectorAll("#augustPoem b");

        addUserInput(
          wordsArray,
          capsWords,
          poemBTags,
          "August",
          wordsArray[3],
          wordsArray[5],
          wordsArray[2],
          wordsArray[1]
        );

        eatingList1.textContent = "snow cone :)";

        importantDates.style.right = "71px";
        importantDatesLists[0].textContent = "Beach Day";
        importantDatesLists[1].textContent = "School Orientation";
        importantDatesLists[2].textContent = "Buy school supplies";

        break;
      case "september":
      case "9":
        // SEPTEMBER BULLET JOURNAL
        setTimeout(function () {
          poem[8].style.display = "block";
        }, 1000);

        poemBTags = document.querySelectorAll("#septemberPoem b");

        addUserInput(
          wordsArray,
          capsWords,
          poemBTags,
          "September",
          wordsArray[3],
          wordsArray[5],
          wordsArray[2],
          wordsArray[1]
        );

        eatingList1.textContent = "sushi :)";

        importantDates.style.right = "68px";
        importantDatesLists[0].textContent = "Beach Day";
        importantDatesLists[1].textContent = "Move-In Day";
        importantDatesLists[2].textContent = "First Day of School";

        break;
      case "october":
      case "10":
        // OCTOBER BULLET JOURNAL
        setTimeout(function () {
          poem[9].style.display = "block";
        }, 1000);

        poemBTags = document.querySelectorAll("#octoberPoem b");

        addUserInput(
          wordsArray,
          capsWords,
          poemBTags,
          "October",
          wordsArray[3],
          wordsArray[5],
          wordsArray[2],
          wordsArray[1]
        );

        eatingList1.textContent = "pumpkin pie :)";

        importantDates.style.right = "68px";
        importantDatesLists[0].textContent = "Math Exam";
        importantDatesLists[1].textContent = "Project Due";
        importantDatesLists[2].textContent = "Homework #2 Due";

        break;
      case "november":
      case "11":
        // NOVEMBER BULLET JOURNAL
        setTimeout(function () {
          poem[10].style.display = "block";
        }, 1000);

        poemBTags = document.querySelectorAll("#novemberPoem b");

        addUserInput(
          wordsArray,
          capsWords,
          poemBTags,
          "November",
          wordsArray[2],
          wordsArray[3],
          wordsArray[5],
          wordsArray[1]
        );

        eatingList1.textContent = "mashed potatoes :)";

        importantDates.style.right = "68px";
        importantDatesLists[0].textContent = "Math Exam";
        importantDatesLists[1].textContent = "Veteran's Day";
        importantDatesLists[2].textContent = "Thanksgiving";

        break;
      default:
        // DECEMBER BULLET JOURNAL
        setTimeout(function () {
          poem[11].style.display = "block";
        }, 1000);

        poemBTags = document.querySelectorAll("#decemberPoem b");

        addUserInput(
          wordsArray,
          capsWords,
          poemBTags,
          "December",
          wordsArray[1],
          wordsArray[2],
          wordsArray[3],
          wordsArray[5]
        );

        eatingList1.textContent = "sugar cookies :)";

        importantDates.style.right = "66px";
        importantDatesLists[0].textContent = "Final Project Due";
        importantDatesLists[1].textContent = "Final Exam";
        importantDatesLists[2].textContent = "Christmas Day";
    }
  }
})();
