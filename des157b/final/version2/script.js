Parse.initialize("H2YRuCmKc8rIRzwcAUHNomzPtjKlwb2FQicjGV9t","xFnT8tgOuksTxhBlLFjTuGlHq11jRAdyeUpdKN3d");
Parse.serverURL = 'https://parseapi.back4app.com/';

// (function(){
    'use strict';
    const participateBtn = document.querySelector('#welcome-btns button');
    const galleryBtn = document.querySelectorAll('#welcome-btns button')[1];
    const continueBtnIntro = document.querySelectorAll('.quotes > button')[0];
    const prevBtns = document.querySelectorAll('.prev-btn');
    const nextBtns = document.querySelectorAll('.next-btn');
    const submitBtn = document.querySelector('#submit-btn');
    const viewGalleryBtn = document.querySelectorAll('.quotes > button')[1];

    const welcomeSection = document.querySelector('#welcome');
    const quotes = document.querySelectorAll('.quotes');
    const questions = document.querySelector('#questions');
    const forms = document.querySelectorAll('form');
    const gallerySection = document.querySelector('#gallery');


    galleryBtn.addEventListener('click', function() {
        welcomeSection.style.display = 'none';
        // gallerySection.style.display = 'flex';
        displayGallery();
    })

    participateBtn.addEventListener('click', function() {
        welcomeSection.style.display = 'none';
        quotes[0].style.display = 'flex';
    })

    continueBtnIntro.addEventListener('click', function() {
        quotes[0].style.display = 'none';
        questions.style.display = 'flex';
        forms[0].style.display = 'block';
    })

    for (let i = 0; i < nextBtns.length; i++) {
        nextBtns[i].addEventListener('click', function(event) {
            event.preventDefault();
            forms[i].style.display = 'none';
            forms[i+1].style.display = 'block';
        })
    }

    for (let i = 0; i < prevBtns.length; i++) {
        prevBtns[i].addEventListener('click', function(event) {
            event.preventDefault();
            forms[i+1].style.display = 'none';
            forms[i].style.display = 'block';
        })
    }

    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();
        forms[4].style.display = 'none';
        questions.style.display = 'none';
        quotes[1].style.display = 'flex';
       
    })

    viewGalleryBtn.addEventListener('click', function(event) {
        event.preventDefault();
        // quotes[1].style.display = 'none';
        // gallerySection.style.display = 'flex';
        addResponse();
    })
    
  

// DATABASE
async function addResponse(){

  const inputs = document.querySelectorAll('.responses');
  const newResponse = {};
  
  for(let i=0; i<inputs.length; i++){
    let key = inputs[i].getAttribute('name');
    let value = inputs[i].value;
    newResponse[key] = value;
  }

  const newResponseData = new Parse.Object("Responses");
  newResponseData.set("q1", newResponse.q1);
  newResponseData.set("q2", newResponse.q2);
  newResponseData.set("q3", newResponse.q3);
  newResponseData.set("q4", newResponse.q4);
  newResponseData.set("q5", newResponse.q5);

  try{
    await newResponseData.save();
    quotes[1].style.display = 'none';
    displayGallery();
    // resetFormFields();
  } catch(error) {
    console.error('Error while creating response: ', error);
  }

}

async function displayGallery(){
  const responses = Parse.Object.extend('Responses');
  const query = new Parse.Query(responses);

  try {
    const results = await query.descending('createdAt').find();
    let count = 0;
   
    results.forEach(function(eachResponse) {
      const id = eachResponse.id;
      const q1 = eachResponse.get('q1');
      const q2 = eachResponse.get('q2');
      const q3 = eachResponse.get('q3');
      const q4 = eachResponse.get('q4');
      const q5 = eachResponse.get('q5');
      
      const thedDivItem = document.createElement('div');
      thedDivItem.setAttribute('class', 'gallery-item');
      const thePItem = document.createElement('p');
      thePItem.textContent = q5;
      thedDivItem.append(thePItem);
      gallerySection.append(thedDivItem);

      
      count++;
      if (results.length >6){
        if(count == results.length - 6){
        const div = document.createElement('div');
        div.setAttribute('id', 'gallery-quote');
        const quote = document.createElement('h3');
        quote.textContent= "";
        const author = document.createElement('h3');
        author.textContent="- ";

        div.append(quote);
        div.append(author);
        gallerySection.append(div);
        }
      }
    });

   
    gallerySection.style.display = 'flex';

    
  } catch(error){
    console.log('Error while fetching responses', error);

  }
}

// })();
// BACKGROUND

// this class describes the properties of a single particle.
class Particle {
    // setting the co-ordinates, radius and the
    // speed of a particle in both the co-ordinates axes.
      constructor(){
        this.x = random(0,width);
        this.y = random(0,height);
        this.r = random(1,10);
        this.xSpeed = random(-0.5,0.5);
        this.ySpeed = random(-0.5,0.5);
      }
    
    // creation of a particle.
      createParticle() {
        noStroke();
        fill('rgba(56,81,103,0.75)');
        circle(this.x,this.y,this.r);
      }
    
    // setting the particle in motion.
      moveParticle() {
        if(this.x < 0 || this.x > width)
          this.xSpeed*=-1;
        if(this.y < 0 || this.y > height)
          this.ySpeed*=-1;
        this.x+=this.xSpeed;
        this.y+=this.ySpeed;
      }
    }
    // an array to add multiple particles
    let particles = [];
    
    function setup() {
      createCanvas(windowWidth, windowHeight);
      for(let i = 0;i<width/10;i++){
        particles.push(new Particle());
      }
    }
    
    function draw() {
      background('#0a1b2b');
      for(let i = 0;i<particles.length;i++) {
        particles[i].createParticle();
        particles[i].moveParticle();
        
      }
    }
    