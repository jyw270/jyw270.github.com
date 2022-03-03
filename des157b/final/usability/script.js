Parse.initialize(
    "H2YRuCmKc8rIRzwcAUHNomzPtjKlwb2FQicjGV9t",
    "xFnT8tgOuksTxhBlLFjTuGlHq11jRAdyeUpdKN3d"
);
Parse.serverURL = "https://parseapi.back4app.com/";

(function () {
    "use strict";
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

    const newResponseBtn = document.querySelector("#add-btn");
    const exitFormBtn = document.querySelector("#exit-form");

    let main;

    window.addEventListener("load", function(){
        alert("Hello! Here are the three tasks for you to complete: \n 1. Use the participate button \n 2. Use the plus button\n \t a. Add another response \n \t OR \n \t b. Exit form \n 3. Use gallery button on welcome page" );

        main = document.querySelector("main");
    })

    newResponseBtn.addEventListener("click", function () {
        console.log(forms[0]);
        questions.style.display = "flex";
        forms[0].style.display = "block";
        exitFormBtn.style.display = "block";
        gallerySection.style.display = "none";
        newResponseBtn.style.display = "none";
       

    });

    exitFormBtn.addEventListener("click", function(){
        questions.style.display = "none";
        displayGallery();
        resetFormFields();

        forms.forEach(function(eachForm){
            eachForm.style.display = "none";
        })

        count = 0;
    });
    // NEW
    let count = 0;

    galleryBtn.addEventListener("click", function () {
        welcomeSection.style.display = "none";
        // gallerySection.style.display = 'flex';
        displayGallery();
    });

    participateBtn.addEventListener("click", function () {
        welcomeSection.style.display = "none";
        quotes[0].style.display = "flex";

        quotes[0].className = "quotes showing"; // NEW

        setTimeout(function(){
            continueBtnIntro.style.visibility = "visible";

        }, 2000)
    });

    continueBtnIntro.addEventListener("click", function () {
        quotes[0].style.display = "none";
        questions.style.display = "flex";
        forms[0].style.display = "block";

        quotes[0].className = "quotes"; // NEW
        forms[0].className = "showing"; // NEW
    });

    for (let i = 0; i < prevBtns.length; i++) {
        prevBtns[i].addEventListener("click", function (event) {
            event.preventDefault();
            forms[i + 1].style.display = "none";
            forms[i].style.display = "block";

            // NEW
            forms[i + 1].removeAttribute("class");
            forms[i].className = "showing";
            if (submitBtn.className == "showing") {
                submitBtn.removeAttribute("class");
            }
            count--;
            console.log(`prev: ${count}`);
        });
    }

    for (let i = 0; i < nextBtns.length; i++) {
        nextBtns[i].addEventListener("click", function (event) {
            event.preventDefault();
            if (inputs[i].value == "") {
                alert("Please input your response");
                return;
            }
            forms[i].style.display = "none";
            forms[i + 1].style.display = "block";

            // NEW
            forms[i].removeAttribute("class");
            forms[i + 1].className = "showing";
            if (i == nextBtns.length - 1) {
                submitBtn.className = "showing";
            }
            count++;
            console.log(`next: ${count}`);
        });
    }

    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        // SOME NEW
        if (inputs[4].value == "") {
            alert("Please input your response");
            return;
        } else {
            forms[4].style.display = "none";
            questions.style.display = "none";
            quotes[1].style.display = "flex";
            forms[4].removeAttribute("class");
            viewGalleryBtn.className = "showing";
            setTimeout(function(){
                viewGalleryBtn.style.visibility = "visible";
    
            }, 2000)
        }
    });

    viewGalleryBtn.addEventListener("click", function (event) {
        event.preventDefault();
        // quotes[1].style.display = 'none';
        // gallerySection.style.display = 'flex';
        addResponse();
        viewGalleryBtn.removeAttribute("class"); // NEW
    });

    // NEW
    document.addEventListener("keydown", function (event) {
        if (forms[count].className === "showing" && event.key === "Enter") {
            event.preventDefault();
            console.log(`enter: ${count}`);
            if (inputs[count].value != "") {
                forms[count].style.display = "none";
                forms[count].removeAttribute("class");
                if (count < 4) {
                    forms[count + 1].style.display = "block";
                    forms[count + 1].className = "showing";
                    count++;
                    console.log(`enter ++: ${count}`);

                } else {
                    submitBtn.className = "showing";
                    count = 0;
                }
            } else {
                alert("Please input your response");
            }
        }

        if (quotes[0].className === "quotes showing" && event.key === "Enter") {
            quotes[0].style.display = "none";
            questions.style.display = "flex";
            forms[0].style.display = "block";

            quotes[0].className = "quotes";
            forms[0].className = "showing";
        }

        if (submitBtn.className === "showing" && event.key === "Enter") {
            if (inputs[4].value == "") {
                alert("Please input your response");
                return;
            } else {
                forms[4].style.display = "none";
                questions.style.display = "none";
                quotes[1].style.display = "flex";
                forms[4].removeAttribute("class");
                viewGalleryBtn.className = "showing";
                setTimeout(function(){
                    viewGalleryBtn.style.visibility = "visible";
        
                }, 2000)
            }
        }

        if (viewGalleryBtn.className === "showing" && event.key === "Enter") {
            addResponse();
            viewGalleryBtn.removeAttribute("class");
        }
    });

    // DATABASE
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
            displayGallery();
            resetFormFields();
        } catch (error) {
            console.error("Error while creating response: ", error);
        }
    }

    async function displayGallery() {
        const responses = Parse.Object.extend("Responses");
        const query = new Parse.Query(responses);

        try {
            const results = await query.descending("createdAt").find();
            let count = 0;

            results.forEach(function (eachResponse) {
                const id = eachResponse.id;
                const q1 = eachResponse.get("q1");
                const q2 = eachResponse.get("q2");
                const q3 = eachResponse.get("q3");
                const q4 = eachResponse.get("q4");
                const q5 = eachResponse.get("q5");

                const thedDivItem = document.createElement("div");
                thedDivItem.setAttribute("class", "gallery-item");
                const thePItem = document.createElement("p");
                thePItem.textContent = q5;
                thedDivItem.append(thePItem);
                gallerySection.append(thedDivItem);

                count++;
                if (results.length == 10) {
                    if (count == results.length - 6) {
                        const div = document.createElement("div");
                        div.setAttribute("id", "gallery-quote");
                        const quote = document.createElement("h3");
                        quote.textContent =
                            '"We delight in the beauty of the butterfly, but rarely admit the changed it has gone through to achieve that beauty."';
                        const author = document.createElement("h3");
                        author.textContent = "- Maya Angelou ";

                        div.append(quote);
                        div.append(author);
                        gallerySection.append(div);
                    }
                }
            });

            gallerySection.style.display = "flex";
            newResponseBtn.style.display = "block";
            main.style.display = "none";
        } catch (error) {
            console.log("Error while fetching responses", error);
        }
    }

    function resetFormFields(){
        inputs.forEach(function(eachInput){
            eachInput.value = "";
        })
    }
})();
// BACKGROUND

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