Parse.initialize(
	"H2YRuCmKc8rIRzwcAUHNomzPtjKlwb2FQicjGV9t",
	"xFnT8tgOuksTxhBlLFjTuGlHq11jRAdyeUpdKN3d"
);
Parse.serverURL = "https://parseapi.back4app.com/";

(function () {
	AOS.init();
	("use strict");

	const title = document.querySelector("header h2");
	const header = document.querySelector("header");
	const message = document.querySelectorAll(".message");
	const participateBtn = document.querySelector("#welcome-btns button");
	const galleryBtn = document.querySelectorAll("#welcome-btns button")[1];
	const continueBtnIntro = document.querySelectorAll(".quotes > button")[0];
	const prevBtns = document.querySelectorAll(".prev-btn");
	const nextBtns = document.querySelectorAll(".next-btn");
	const submitBtn = document.querySelector("#submit-btn");
	const viewGalleryBtn = document.querySelectorAll(".quotes > button")[1];

	const welcomeSection = document.querySelector("#welcome");
	const quotes = document.querySelectorAll(".quotes");
	const questions = document.querySelector("#questions");
	const forms = document.querySelectorAll("form");
	const inputs = document.querySelectorAll(".responses");
	const gallerySection = document.querySelector("#gallery");

	let galleryQuotes;
	let cardID;
	let itemNumber;

	const newResponseBtn = document.querySelector("#add-btn");
	const exitFormBtn = document.querySelector("#exit-form");

	let fromWelcome = true;

	let count = 0;

	//   OVERLAY
	const overlayBg = document.querySelector("#overlay-background");
	const overlay = document.querySelector("#overlay");
	const overlayXbtn = document.querySelector("#overlay .fa-rectangle-xmark");
	overlayNavBtns = document.querySelectorAll("#overlay .nav");
	const timeTags = document.querySelectorAll("#time p");
	const wordTags = document.querySelectorAll(".description p");
	const paragraphTag = document.querySelector("#paragraph");

	let main;

	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const volumeIcon = document.querySelector("header i");
	const music = new Audio("media/music.mp3");

	/**** VOLUME CONTROL ****/
	volumeIcon.addEventListener("click", function () {
		if (volumeIcon.className === "fa-solid fa-volume-high") {
			volumeIcon.className = "fa-solid fa-volume-xmark";
			music.pause();
		} else {
			volumeIcon.className = "fa-solid fa-volume-high";
			music.play();
		}
	});


	/****  RESET TO LANDING PAGE VIEW ****/
	title.addEventListener("click", function () {
		welcomeSection.style.display = "flex";
		fromWelcome = true;
		main.style.display = "block";

		overlay.className = "hide";
		overlayBg.className = "hide";

		quotes[0].style.display = "none";
		questions.style.display = "none";

		gallerySection.style.display = "none";
		newResponseBtn.style.display = "none";

		resetFormFields();

		forms.forEach(function (eachForm) {
			eachForm.style.display = "none";
		});
		count = 0;
	});

	/****  SCROLL TO THE TOP WHEN TOP OF SCREEN IS CLICKED ****/
	header.addEventListener("click", scrollToTop);

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}

	/****  CONVERT DATE ****/
	function convertDate(givenDate) {
		const date = new Date(givenDate);

		const pst = date.toLocaleString("en-US", {
			timeZone: "America/Los_Angeles",
		});

		const pstDateArr = pst.split(",");
		const pstDate = pstDateArr[0].split("/");
		const pstTime = pstDateArr[1].split(":");
		const pstTime2 = pstDateArr[1].split(" ");

		const currDate = `${months[pstDate[0] - 1]} ${pstDate[1]}, ${pstDate[2]} `;
		const currTime = `${pstTime[0]}:${pstTime[1]} ${
      pstTime2[pstTime2.length - 1]
    }`;

		return [currDate, currTime];
	}

	window.addEventListener("load", function () {
		main = document.querySelector("main");
		setTimeout(function () {
			message[0].className = "message show";
			message[1].className = "message show";
		}, 1000);
		setTimeout(function () {
			message[0].className = "message hide";
			message[1].className = "message hide";
		}, 5000);
	});

	window.addEventListener("resize", function () {
		resizeGallery();
		if (galleryQuotes != null) {
			resizeGalleryQuotes();
		}
	});

	/****  ADD NEW RESPONSE ONCE ON GALLERY PAGE ****/
	newResponseBtn.addEventListener("click", function () {
		console.log(forms[0]);
		questions.style.display = "flex";
		forms[0].style.display = "block";
		gallerySection.style.display = "none";
		newResponseBtn.style.display = "none";
		inputs[0].focus();
		fromWelcome = false;
		main.style.display = "block";
	});

	exitFormBtn.addEventListener("click", function () {
		questions.style.display = "none";

		if (fromWelcome) {
			welcomeSection.style.display = "flex";
			main.style.display = "block";
		} else {
			displayGallery();
		}

		resetFormFields();

		forms.forEach(function (eachForm) {
			eachForm.style.display = "none";
		});

		count = 0;
	});


	galleryBtn.addEventListener("click", function () {
		welcomeSection.style.display = "none";
		displayGallery();
	});

	participateBtn.addEventListener("click", function () {
		welcomeSection.style.display = "none";
		quotes[0].style.display = "flex";
	});

	continueBtnIntro.addEventListener("click", function () {
		quotes[0].style.display = "none";
		questions.style.display = "flex";
		forms[0].style.display = "block";
		inputs[0].focus();

		forms[0].className = "showing";
	});

	/****  SHOW PREVIOUS FORM QUESTION ****/
	for (let i = 0; i < prevBtns.length; i++) {
		prevBtns[i].addEventListener("click", function (event) {
			event.preventDefault();
			forms[i + 1].style.display = "none";
			forms[i].style.display = "block";

			// NEW
			forms[i + 1].removeAttribute("class");
			forms[i].className = "showing";
			count--;
		});
	}

	/****  SHOW NEXT FORM QUESTION ****/
	for (let i = 0; i < nextBtns.length; i++) {
		nextBtns[i].addEventListener("click", function (event) {
			event.preventDefault();
			if (inputs[i].value == "") {
				alert("Please input your response");
				return;
			}
			forms[i].style.display = "none";
			forms[i + 1].style.display = "block";
			inputs[i + 1].focus();

			// NEW
			forms[i].removeAttribute("class");
			forms[i + 1].className = "showing";
			count++;
		});
	}

	submitBtn.addEventListener("click", function (event) {
		event.preventDefault();
		if (inputs[4].value == "") {
			alert("Please input your response");
			return;
		} else {
			forms[4].style.display = "none";
			questions.style.display = "none";
			quotes[1].style.display = "flex";
			forms[4].removeAttribute("class");
		}
	});

	viewGalleryBtn.addEventListener("click", function (event) {
		event.preventDefault();
		addResponse();
	});

	/****  SHOW NEXT FORM QUESTION WHEN ENTER BUTTON IS CLICKED ****/
	document.addEventListener("keydown", function (event) {
		if (forms[count].className === "showing" && event.key === "Enter") {
			event.preventDefault();
			if (inputs[count].value != "") {
				forms[count].style.display = "none";
				forms[count].removeAttribute("class");
				if (count < 4) {
					forms[count + 1].style.display = "block";
					forms[count + 1].className = "showing";
					count++;
					inputs[count].focus();
				} else {
					questions.style.display = "none";
					quotes[1].style.display = "flex";
					count = 0;
				}
			} else {
				alert("Please input your response");
			}
		}
	});

	/**** ADD TO DATABASE ****/
	async function addResponse() {
		const newResponse = {};

		for (let i = 0; i < inputs.length; i++) {
			let key = inputs[i].getAttribute("name");
			let value = inputs[i].value;
			newResponse[key] = value;
		}

		const newResponseData = new Parse.Object("Responses");
		newResponseData.set("q1", newResponse.q1);
		newResponseData.set("q2", newResponse.q2);
		newResponseData.set("q3", newResponse.q3);
		newResponseData.set("q4", newResponse.q4);
		newResponseData.set("q5", newResponse.q5);

		try {
			await newResponseData.save();
			quotes[1].style.display = "none";

			while (gallerySection.firstChild) { //Reset gallery so information is not duplicated when displaying
				gallerySection.removeChild(gallerySection.firstChild);
			}
			displayGallery();
			resetFormFields();
		} catch (error) {
			console.error("Error while creating response: ", error);
		}
	}

	/****  DISPLAY GALLERY ****/
	async function displayGallery() {
		const responses = Parse.Object.extend("Responses");
		const query = new Parse.Query(responses);

		try {
			const results = await query.descending("createdAt").find();
			let count = 0;

			results.forEach(function (eachResponse) {
				const id = eachResponse.id;
				const q5 = capitalizeFirstLetter(eachResponse.get("q5"));

				const thedDivItem = document.createElement("div");
				thedDivItem.setAttribute("id", `r-${id}`);
				thedDivItem.setAttribute("class", `gallery-item n-${count}`);
				thedDivItem.setAttribute("data-aos", "fade-up");
				const thePItem = document.createElement("p");
				thePItem.textContent = q5;
				if (q5.split(" ").length > 10 && window.innerWidth < 500) {
					thePItem.style.fontSize = "0.8em";
				}
				const hItem = document.createElement("h4");
				thedDivItem.append(thePItem);
				gallerySection.append(thedDivItem);
				count++;
			});
			addQuoteToGallery(results.length);
			gallerySection.style.display = "grid";
			newResponseBtn.style.display = "block";
			main.style.display = "none";
			resizeGallery();
			activateOverlayListener();
		} catch (error) {
			console.log("Error while fetching responses", error);
		}
	}

	/****  RESIZE GALLERY FOR DIFFERENT SCREEN SIZES ****/
	function resizeGallery() {
		const galleryItems = document.querySelectorAll(".gallery-item");
		if (window.innerWidth < 700) {
			gallerySection.style.gridTemplateColumns = "repeat(2, 1fr)";
			gallerySection.style.columnGap = "1em";
			gallerySection.style.rowGap = "1em";
		} else if (window.innerWidth < 1000) {
			gallerySection.style.gridTemplateColumns = "repeat(3, 1fr)";
			gallerySection.style.columnGap = "1em";
			gallerySection.style.rowGap = "1em";
		} else {
			gallerySection.style.gridTemplateColumns = "repeat(4, 1fr)";
			gallerySection.style.columnGap = "1.5em";
			gallerySection.style.rowGap = "1.5em";
		}


		let size = galleryItems[0].getBoundingClientRect();
		let itemWidth = size.width;

		galleryItems.forEach(function (eachItem) {
			eachItem.style.height = `${itemWidth}px`;
		});
	}

	/****  INTEGRATE QUOTE TO GALLERY PAGE ****/
	async function addQuoteToGallery(numOfResponses) {
		const galleryItems = document.querySelectorAll(".gallery-item");
		let count = 6;
		let quoteCount = 0;
		const allQuotes = await fetch("data/data.json");
		const data = await allQuotes.json();

		for (let i = numOfResponses; i > 0; i -= 8) {
			if (i < 6) {
				break;
			}

			const div = document.createElement("div");
			div.setAttribute("class", "gallery-quote");
			const quote = document.createElement("h3");
			quote.textContent = `“${data[quoteCount].quote}”`;
			const author = document.createElement("h3");
			author.textContent = `- ${data[quoteCount].author}`;

			div.append(quote);
			div.append(author);

			gallerySection.insertBefore(div, galleryItems[count]);
			count += 8;
			quoteCount++;
		}
		galleryQuotes = document.querySelectorAll(".gallery-quote");
		resizeGalleryQuotes();
	}

	/****  RESIZE HOW MUCH QUOTE SPANS FOR DIFFERENT SCREEN SIZES ****/
	function resizeGalleryQuotes() {
		let left = false;

		galleryQuotes.forEach(function (eachQuote) {
			if (window.innerWidth < 700) {
				eachQuote.style.gridColumn = "1 / span 2";
			} else if (window.innerWidth < 1000) {
				eachQuote.style.gridColumn = "1 / span 3";
			} else {
				if (left) {
					eachQuote.style.gridColumn = "1 / span 2";
					left = false;
				} else {
					eachQuote.style.gridColumn = "3 / span 2";
					left = true;
				}
			}
		});
	}
	/****  HIDE OVERLAY WITH ESCAPE KEY ****/
	document.addEventListener("keydown", function (event) {
		if (overlay.className === "show" && event.key === "Escape") {
			overlay.className = "hide";
			overlayBg.className = "hide";
			document.querySelector("body").style.overflow = "initial";
		}
	});

	/****  USE ARROW KEYS TO MOVE THROUGH RESPONSES WHEN OVERLAY IS OPEN ****/
	function activateArrowKeys() {
		document.addEventListener("keydown", function (event) {
			if (
				(event.keyCode === 37 && overlay.className == "show") ||
				(event.keyCode === 39 && overlay.className == "show")
			) {
				const galleryItems = document.querySelectorAll(".gallery-item");
				if (itemNumber == galleryItems.length - 1 && event.keyCode === 39) {
					itemNumber = 0;
				} else if (itemNumber == 0 && event.keyCode === 37) {
					itemNumber = galleryItems.length - 1;
				} else {
					event.keyCode === 37 ? itemNumber-- : itemNumber++;
				}
				cardID = galleryItems[itemNumber].getAttribute("id").slice(2);
				displayResponseOverlay(cardID);
			}
		});
	}

	/****  ACTIVATE OVERLAY EVENT LISTENER ****/
	function activateOverlayListener() {
		const galleryItems = document.querySelectorAll(".gallery-item");
		let classItems;

		galleryItems.forEach(function (eachItem) {
			eachItem.addEventListener("click", function () {
				cardID = eachItem.getAttribute("id").slice(2);
				classItems = eachItem.getAttribute("class").split(" ");
				itemNumber = classItems[1].slice(2);
				console.log(itemNumber);
				displayResponseOverlay(cardID);
			});
		});
		activateArrowKeys();
	}

	function closeOverlay() {
		gallerySection.style.overflow = "initial";
		overlay.className = "hide";
		overlayBg.className = "hide";
		document.querySelector("body").style.overflow = "initial";
		overlayBg.removeEventListener("click", closeOverlay);
	}

	overlayXbtn.addEventListener("click", closeOverlay);

	/****  DISPLAY RESPONSE OVERLAY  ****/
	async function displayResponseOverlay(cardID) {
		const responses = Parse.Object.extend("Responses");
		const query = new Parse.Query(responses);
		query.equalTo("objectId", cardID);
		try {
			const results = await query.find();
			results.forEach(function (thisResponse) {
				wordTags[0].textContent = `${capitalizeFirstLetter(
          thisResponse.get("q1")
        )}`;
				wordTags[1].textContent = `${capitalizeFirstLetter(
          thisResponse.get("q2")
        )}`;
				wordTags[2].textContent = `${capitalizeFirstLetter(
          thisResponse.get("q3")
        )}`;
				paragraphTag.textContent = `${capitalizeFirstLetter(
          thisResponse.get("q4")
        )}`;
				const date = thisResponse.get("createdAt");

				const newDate = convertDate(date);
				timeTags[0].textContent = `${newDate[0]}`;
				timeTags[1].textContent = `${newDate[1]}`;

				overlayBg.style.height = "100vh";
				overlayBg.className = "show";
				overlay.className = "show";
				document.querySelector("body").style.overflow = "hidden";
				overlayBg.addEventListener("click", closeOverlay);
			});
		} catch (error) {
			console.error("Error while fetching responses", error);
		}
	}

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function resetFormFields() {
		inputs.forEach(function (eachInput) {
			eachInput.value = "";
		});
	}
})();

/****  BACKRGOUND - PARTICLE ANIMATION  ****/
/****  CREDIT: https://p5js.org/examples/simulate-particles.html  ****/

// this class describes the properties of a single particle.
class Particle {
	// setting the co-ordinates, radius and the
	// speed of a particle in both the co-ordinates axes.
	constructor() {
		this.x = random(0, width);
		this.y = random(0, height);
		this.r = random(1, 10);
		this.xSpeed = random(-0.5, 0.5);
		this.ySpeed = random(-0.5, 0.5);
	}

	// creation of a particle.
	createParticle() {
		noStroke();
		fill("rgba(56,81,103,0.75)");
		circle(this.x, this.y, this.r);
	}

	// setting the particle in motion.
	moveParticle() {
		if (this.x < 0 || this.x > width) this.xSpeed *= -1;
		if (this.y < 0 || this.y > height) this.ySpeed *= -1;
		this.x += this.xSpeed;
		this.y += this.ySpeed;
	}
}
// an array to add multiple particles
let particles = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	for (let i = 0; i < width / 10; i++) {
		particles.push(new Particle());
	}
}

function draw() {
	background("#0a1b2b");
	for (let i = 0; i < particles.length; i++) {
		particles[i].createParticle();
		particles[i].moveParticle();
	}
}