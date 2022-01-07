(function(){
    'use strict';

    // VARIABLES FOR DISPLAY STAND
    const theImg = document.querySelector('img');
    let displayedImg;
    let active;
    let startPos;
    let currentPos;
    let changePhoto = 2;

    // VARIABLES FOR IMAGE AND CONTENT CHANGER
    let newSlide;
    const imgDivsFront = document.querySelectorAll('.front');
    const imgDivsBack = document.querySelectorAll('.back');
    const keychainDesc = document.querySelector('article p:last-of-type');
    let imgsArray = ['keychain1b.jpg', 'keychain1a.jpg'];
    let interval = setInterval(swapImage, 3000); 

    // VARIABLES FOR CROSSFADE IMAGES
    let currentImageVal = 0;
    let currentImg = imgsArray[0];
    let prevImg = currentImg;
    const container = document.getElementById('content'); 

    // VARIABLES FOR PREV AND NEXT BUTTON INTERACTION
    let letter;
    const buttons = document.querySelectorAll('button');
    const buttonDiv = document.getElementById('buttons-container');


    // IMAGE AND CONTENT CHANGER
    imgDivsFront.forEach(function (eachSpot) {
        eachSpot.addEventListener('click', changeContent);
    });

    imgDivsBack.forEach(function (eachSpot) {
        eachSpot.addEventListener('click', changeContent);
    });


    // FUNCTION: swapImage() – CROSSFADE IMAGES
    function swapImage() {
        currentImg = imgsArray[0];
        if ((currentImageVal > (imgsArray.length - 1)) || (prevImg != currentImg)){
            currentImageVal = 0;
        }
        prevImg = currentImg;
        newSlide = document.createElement('img');
        newSlide.src = `images/${imgsArray[currentImageVal]}`;
        newSlide.className = "fadeinImg";
        container.appendChild(newSlide);

        if (container.children.length > 2) {
            container.removeChild(container.children[0]);
            currentImageVal++;
        }
    }


    // FUNCTION: changeKeychain(image)
    function changeKeychain(image) {
        // deals with the empty newSlide variable:
        // if user hovers over new keychain before slideshow for first keychain plays
        if (!newSlide) { 
            const firstKeychainImg = document.querySelector('.fadeinImg');
            firstKeychainImg.src = `images/${image}`;
        }
        // else change the newSlide's src
        else {
            newSlide.src = `images/${image}`;
        }
    }

    // FUNCTION: changeContent(event)
    function changeContent(event) {
        const keychain = event.target.id;
        clearInterval(interval);
        switch(keychain) {
            case 'keychain1s':
                changeKeychain('keychain1a.jpg');
                keychainDesc.textContent = `These are two keychains that I attached to each other because I couldn't decide which one to attach to my
                phone. I thought the cute, mini stylist would be useful if I'm ever wearing gloves and using my phone.
                I got the the dragon jade keychain from an Asian bookstore because it represents my zodiac animal and
                because it reminds me of my culture.`;
                imgsArray = ['keychain1b.jpg', 'keychain1a.jpg'];
                break;
            case 'keychain2s': 
                changeKeychain('keychain2a.jpg');
                keychainDesc.textContent = `My mom gave me this little green keychain. It is a protector pouch that is supposed to keep
                me safe at school. The words on the front means health and on the back, it means guard. I attach it to my pencil pouch 
                that I use everyday for school.`;
                imgsArray = ['keychain2b.jpg', 'keychain2c.jpg', 'keychain2a.jpg'];
                break;
            case 'keychain3s': 
                changeKeychain('keychain3a.jpg');
                keychainDesc.textContent = `This keychain actually comes as a pair because it is something I assembled as a surprise gift 
                for my friend and I, to celebrate our decade long friendship. The letters are our initials and the heart locket 
                contains a photo of us. The different colored jewel on each one, represents a hint of the differences in our personalities.`;
                imgsArray = ['keychain3b.jpg', 'keychain3a.jpg'];
                break;
            case 'keychain4s': 
                changeKeychain('keychain4a.jpg');
                keychainDesc.textContent = `My aunt from France gave this porcupine keychain to me. I attached this to this cute lion wallet that
                she gave me as well. Anytime, I see this keychain, I am always reminded of her.`;
                imgsArray = ['keychain4b.jpg', 'keychain4c.jpg', 'keychain4a.jpg'];
                break;
            case 'keychain5s': 
                changeKeychain('keychain5a.jpg');
                keychainDesc.textContent = `This is a squishy macaroon keychain that I found in the dollar section at Target. It was so cute and fun,
                so I attached it to my keys, until one day it fell off it's chain.`;
                imgsArray = ['keychain5a.jpg'];
                break;
            case 'keychain6s': 
                changeKeychain('keychain6a.jpg');
                keychainDesc.textContent = `This tiny Minnie Mouse coin purse is a souveneir that I got during my second Disneyland trip. It contains
                mini charms that I also picked out from the store. They were all quite expensive, but my dad still bought it for me as my little souvenir.`;
                imgsArray = ['keychain6b.jpg', 'keychain6a.jpg'];
                break;
            case 'keychain7s': 
                changeKeychain('keychain7a.jpg');
                keychainDesc.textContent = `This is a beaded puppy keychain that my sister made for me. It's attached to my iPod that I don't use anymore,
                but I still admire it whenever I see it.`;
                imgsArray = ['keychain7b.jpg', 'keychain7a.jpg'];
                break;
            case 'keychain8s': 
                changeKeychain('keychain8a.jpg');
                keychainDesc.textContent = `This is a smores keychain that my sister gave me. She insisted that I must use it, so I attached it to my earbuds
                pouch that my friend gave me for my birthday. Whenever I see this pouch with the keychain, it makes me smile because they are both gifts from
                two people I am most close with.`;
                imgsArray = ['keychain8b.jpg', 'keychain8a.jpg'];
                break;
            case 'keychain1l':
                changeKeychain('keychain9a.jpg');
                keychainDesc.textContent = `This is a hand sanitizer keychain that I got from my best friend for my birthday last year. It was something I wanted 
                to get for a while, so I thought it was funny that my friend got for me before I could. I attached it to my white crossbody purse and I love how 
                it looks!`;
                imgsArray = ['keychain9b.jpg', 'keychain9a.jpg'];
                break;
            case 'keychain2l':
                changeKeychain('keychain10a.jpg');
                keychainDesc.textContent = `I got this cute bunny pouch keychain from a bookstore in Oakland a long time ago. It was so different from other 
                keychains I have seen before and I had to get it. In the past, I used it to fill money and coins, but now I use to hold my craft supplies. :)`;
                imgsArray = ['keychain10b.jpg', 'keychain10a.jpg'];
                break;
            case 'keychain3l':
                changeKeychain('keychain11a.jpg');
                keychainDesc.textContent = `This fluffy cat pom pom is from Forever 21 and I'm usually not a big fan of cats, but this keychain stood out to me
                because of the rhinestone detailing and the pink fluff. I hang it on this tan mini backpack and I think it is a very nice add.`;
                imgsArray = ['keychain11b.jpg', 'keychain11a.jpg'];
                break;
            case 'keychain4l':
                changeKeychain('keychain12a.jpg');
                keychainDesc.textContent = `I love squishmallows because they're are soooo fluffy and soft. This polar bear one was so cute and I love that it 
                is a keychain size because I can bring it along with me wherever I go. I attached it to this blue mini backpack of mine and it tends to always 
                give me Christmas vibes.`;
                imgsArray = ['keychain12b.jpg', 'keychain12a.jpg'];
                break;
        }
        interval = setInterval(swapImage, 2500); 
    }


    // ARROW BUTTONS
    buttonDiv.addEventListener('mouseover', function() {
        buttons[0].style.display = 'block';
        buttons[1].style.display = 'block';
        clearInterval(interval);
        currentImg = document.querySelector('#content img').getAttribute('src');
        letter = currentImg.substr(16, 16);
        switch(letter) {
            case 'a':
                if (imgsArray.length == 2) {
                    currentImageVal = 1;
                }
                else if (imgsArray.length == 3) {
                    currentImageVal = 2;
                }
                break;
            case 'c':
                currentImageVal = 1;
                break;
            default:
                currentImageVal = 0;
        }
    })

    buttonDiv.addEventListener('mouseleave', function() {
        buttons[0].style.display = 'none';
        buttons[1].style.display = 'none';
        interval = setInterval(swapImage, 2500);
    })

    // previous button
    buttons[0].addEventListener('click', function() {
        currentImageVal--;
        if (currentImageVal < 0) {
            currentImageVal = imgsArray.length - 1;
        }
    
        if (!newSlide) { 
            const firstKeychainImg = document.querySelector('.fadeinImg');
            firstKeychainImg.src = `images/${imgsArray[currentImageVal]}`;
        }
        else {
            newSlide.src = `images/${imgsArray[currentImageVal]}`; 
        }
         
    })

    // next button
    buttons[1].addEventListener('click', function() {
        currentImageVal++;
        if (currentImageVal > imgsArray.length-1) {
            currentImageVal = 0;
        }
    
        if (!newSlide) { 
            const firstKeychainImg = document.querySelector('.fadeinImg');
            firstKeychainImg.src = `images/${imgsArray[currentImageVal]}`;
        }
        else {
            newSlide.src = `images/${imgsArray[currentImageVal]}`; 
        }
    })


    // ROTATION FOR DISPLAY STAND

    // EVENT LISTENER WHEN USER HOLDS THEIR MOUSE DOWN ON THE DISPLAY STAND
    // sets active to true – yes, mouse is down and stores the user's mouse position 
    // in startPos
    theImg.addEventListener('mousedown', function(event) {
        active = true;
        startPos = event.clientX;
    });

    // EVENT LISTENER WHEN USER IS DRAGGING THEIR MOUSE ON THE STAND
    // calls changeImage() if mouse is down
    theImg.addEventListener('mousemove', function(event) {
        if (active === true) {
            event.preventDefault();
            changeImage();
          }
    });

    // EVENT LISTENER WHEN USER LETS GO OF MOUSE AFTER CLICK AND DRAG
    // sets active to false – mouse is no longer down
    document.addEventListener('mouseup', function(event) {
        event.preventDefault();
        active = false;
    });
        

    // FUNCTION: changeImage()
    // changes the display stand image (rotates stand) after calculating user's click 
    // and drag, then calls editImgDiv()
    function changeImage() {
        let bbox = theImg.getBoundingClientRect();
        currentPos = window.event.clientX;
        if (currentPos < startPos) {
            if (changePhoto < 2) {
                changePhoto = 33;
            }
            else {
                changePhoto--;
            }
            theImg.src = `images/img${changePhoto}.jpg`;
            displayedImg = `images/img${changePhoto}.jpg`;
        }
        else if (currentPos > startPos) {
            theImg.src = `images/img${changePhoto}.jpg`;
            displayedImg = `images/img${changePhoto}.jpg`;
            if (changePhoto > 32) {
                changePhoto = 1;
            }
            else {
                changePhoto++;
            }
        } 
        editImgDiv();
    }

    // FUNCTION: changeDivPosition(side, keychain, width, height, top, left)
    // takes in front side or back side, keychain number, width, height, top and left 
    // and edits that specified container
    function changeDivPosition(side, keychain, width, height, top, left) {
        width ? (side[keychain].style.width = width) : ('');
        height ? (side[keychain].style.height = height) : ('');
        top ? (side[keychain].style.top = top) : ('');
        left ? (side[keychain].style.left = left) : ('');
    }

    // FUNCTION: hideImageDiv(side)
    // takes in front side or back side of stand and shows their div containers
    function displayImageDiv(side) {
        side.forEach(function(eachDiv) {
            eachDiv.style.display = 'block';
        });
    }

    // FUNCTION: hideImageDiv(side)
    // takes in front side or back side of stand and hides their div containers
    function hideImageDiv(side) {
        side.forEach(function(eachDiv) {
            eachDiv.style.display = 'none';
        });
    }

    // FUNCTION: editImgDiv()
    // edit/resize/move/hide/show each image's hotspot containers
    function editImgDiv() {
        displayImageDiv(imgDivsFront);
        hideImageDiv(imgDivsBack);
        imgDivsBack[2].style.transform = 'none';
        imgDivsBack[3].style.transform = 'none';

        switch(displayedImg) {
            case 'images/img2.jpg':
                // front 8 keychains
                changeDivPosition(imgDivsFront, 1, '45px', null, null, null);
                changeDivPosition(imgDivsFront, 4, null, '115px', null, null);
                changeDivPosition(imgDivsFront, 5, null, null, null, '152px');
                changeDivPosition(imgDivsFront, 6, null, null, null, '242px');
                break;
            case 'images/img3.jpg':
                // front 8 keychains
                changeDivPosition(imgDivsFront, 1, null, null, null, '154px');
                changeDivPosition(imgDivsFront, 3, '38px', null, null, '315px');
                changeDivPosition(imgDivsFront, 4, null, '120px', '345px', '82px');
                changeDivPosition(imgDivsFront, 5, null, null, '335px', '160px');
                changeDivPosition(imgDivsFront, 6, '52px', null, null, '245px');
                changeDivPosition(imgDivsFront, 7, null, null, '325px', '320px');
                break;
            case 'images/img4.jpg':
                // front 8 keychains
                changeDivPosition(imgDivsFront, 0, '38px', null, null, null);
                changeDivPosition(imgDivsFront, 1, null, null, null, '158px');
                changeDivPosition(imgDivsFront, 3, '30px', '170px', '90px', null);
                changeDivPosition(imgDivsFront, 4, '65px', '125px', null, '88px');
                changeDivPosition(imgDivsFront, 5, '87px', null, null, null);
                changeDivPosition(imgDivsFront, 6, '48px', '140px', null, '250px');
                changeDivPosition(imgDivsFront, 7, '30px', '85px', null, '318px');
                break;
            case 'images/img5.jpg':
                // front 8 keychains
                changeDivPosition(imgDivsFront, 0, null, null, null, '92px');
                changeDivPosition(imgDivsFront, 1, null, null, null, '168px');
                changeDivPosition(imgDivsFront, 2, null, '145px', '80px', null);
                changeDivPosition(imgDivsFront, 3, null, null, null, '305px');
                changeDivPosition(imgDivsFront, 4, null, null, '355px', '103px');
                changeDivPosition(imgDivsFront, 5, '74px', '135px', null, '180px');
                changeDivPosition(imgDivsFront, 6, '40px', null, null, '255px');
                changeDivPosition(imgDivsFront, 7, null, '80px', null, '308px');
                break;
            case 'images/img6.jpg':
                // front 8 keychains
                changeDivPosition(imgDivsFront, 0, null, '210px', '60px', '115px');
                changeDivPosition(imgDivsFront, 1, null, null, null, '182px');
                changeDivPosition(imgDivsFront, 2, '45px', null, null, '247px');
                changeDivPosition(imgDivsFront, 3, '26px', null, null, '300px');
                changeDivPosition(imgDivsFront, 4, '68px', '130px', null, '120px');
                changeDivPosition(imgDivsFront, 5, '70px', null, null, '190px');
                changeDivPosition(imgDivsFront, 6, '32px', null, null, '260px');
                changeDivPosition(imgDivsFront, 7, null, '72px', null, '300px');
                break;
            case 'images/img7.jpg':
                // front 8 keychains
                changeDivPosition(imgDivsFront, 0, null, null, null, '135px');
                changeDivPosition(imgDivsFront, 1, null, null, null, '190px');
                changeDivPosition(imgDivsFront, 2, '42px', null, null, null);
                changeDivPosition(imgDivsFront, 3, null, '158px', '100px', '290px');
                changeDivPosition(imgDivsFront, 4, null, '138px', '352px', '137px');
                changeDivPosition(imgDivsFront, 5, '55px', null, null, '205px');
                changeDivPosition(imgDivsFront, 6, null, '125px', null, null);
                changeDivPosition(imgDivsFront, 7, null, '60px', '335px', '290px');

                // back 4 keychains
                imgDivsBack[3].style.display = 'block';
                changeDivPosition(imgDivsBack, 3, '18px', '72px', '433px', '103px');
                break;
            case 'images/img8.jpg':
                // front 8 keychains
                changeDivPosition(imgDivsFront, 0, null, null, null, '157px');
                changeDivPosition(imgDivsFront, 1, null, null, null, '200px');
                changeDivPosition(imgDivsFront, 2, '38px', '140px', '90px', '245px');
                changeDivPosition(imgDivsFront, 3, null, '150px', '105px', '278px');
                changeDivPosition(imgDivsFront, 4, '60px', '128px', '365px', '128px');
                changeDivPosition(imgDivsFront, 5, '47px', null, null, '218px');
                changeDivPosition(imgDivsFront, 6, '20px', null, null, '265px');
                changeDivPosition(imgDivsFront, 7, '25px', null, '330px', '280px');

                // back 4 keychains
                imgDivsBack[1].style.display = 'block';
                imgDivsBack[3].style.display = 'block';
                changeDivPosition(imgDivsBack, 1, '10px', '20px', '280px', '118px');
                changeDivPosition(imgDivsBack, 3, '40px', '115px', '405px', '100px');
                break;
            case 'images/img9.jpg':
                // front 8 keychains
                changeDivPosition(imgDivsFront, 0, null, null, null, '175px');
                changeDivPosition(imgDivsFront, 1, '32px', null, null, '215px');
                changeDivPosition(imgDivsFront, 2, '27px', '135px', null, '248px');
                changeDivPosition(imgDivsFront, 3, '20px', null, null, '274px');
                changeDivPosition(imgDivsFront, 4, '50px', null, null, '180px');
                changeDivPosition(imgDivsFront, 5, '40px', null, null, '230px');
                changeDivPosition(imgDivsFront, 6, '15px', '50px', '400px', '270px');
                changeDivPosition(imgDivsFront, 7, '27px', '65px', '320px', '268px');

                // back 4 keychains
                imgDivsBack[1].style.display = 'block';
                imgDivsBack[3].style.display = 'block';
                changeDivPosition(imgDivsBack, 1, '25px', '138px', '165px', '120px');
                changeDivPosition(imgDivsBack, 3, '60px', '120px', '408px', '100px');
                break;
            case 'images/img10.jpg':
                // front 8 keychains
                changeDivPosition(imgDivsFront, 0, '30px', null, null, '200px');
                changeDivPosition(imgDivsFront, 1, '18px', null, null, '235px');
                changeDivPosition(imgDivsFront, 2, '25px', '125px', null, null);
                changeDivPosition(imgDivsFront, 3, null, '65px', '190px', '260px');
                changeDivPosition(imgDivsFront, 4, '46px', null, null, '200px');
                changeDivPosition(imgDivsFront, 5, '35px', '80px', '387px', '245px');
                imgDivsFront[6].style.display = 'none';
                changeDivPosition(imgDivsFront, 7, '24px', null, null, '258px');

                // back 4 keychains
                imgDivsBack[1].style.display = 'block';
                imgDivsBack[3].style.display = 'block';
                changeDivPosition(imgDivsBack, 1, '50px', '150px', '153px', '120px');
                changeDivPosition(imgDivsBack, 3, '75px', '130px', '405px', '103px');
                break;
            case 'images/img11.jpg':
                // front 8 keychains
                changeDivPosition(imgDivsFront, 0, '40px', null, null, '235px');
                changeDivPosition(imgDivsFront, 4, '35px', null, null, '240px');
                changeDivPosition(imgDivsFront, 5, '15px', null, '382px', '272px');
                for (let i = 0; i < imgDivsFront.length; i++) {
                    if ((i != 0) && (i != 4) && (i != 5)) {
                        imgDivsFront[i].style.display = 'none';
                    }
                }

                // back 4 keychains
                displayImageDiv(imgDivsBack);
                changeDivPosition(imgDivsBack, 0, '30px', '30px', '130px', '160px');
                changeDivPosition(imgDivsBack, 1, '85px', '150px', '153px', '130px');
                changeDivPosition(imgDivsBack, 2, '68px', '30px', '385px', '145px');
                changeDivPosition(imgDivsBack, 3, '100px', '135px', '410px', '110px');
                break;
            case 'images/img12.jpg':
                // front 8 keychains
                changeDivPosition(imgDivsFront, 0, '30px', null, null, '290px');
                changeDivPosition(imgDivsFront, 4, '32px', null, null, '288px');
                for (let i = 0; i < imgDivsFront.length; i++) {
                    if ((i != 0) && (i != 4)) {
                        imgDivsFront[i].style.display = 'none';
                    }
                }

                // back 4 keychains
                displayImageDiv(imgDivsBack);
                changeDivPosition(imgDivsBack, 0, '45px', '40px', '120px', '150px');
                changeDivPosition(imgDivsBack, 1, '97px', '155px', '153px', '133px');
                changeDivPosition(imgDivsBack, 2, '68px', '50px', '390px', '115px');
                changeDivPosition(imgDivsBack, 3, '90px', '135px', '420px', '135px');
            break;
            case 'images/img13.jpg':
                // front 8 keychains
                changeDivPosition(imgDivsFront, 0, '20px', null, null, '325px');
                changeDivPosition(imgDivsFront, 4, '25px', '120px', null, '318px');
                for (let i = 0; i < imgDivsFront.length; i++) {
                    if ((i != 0) && (i != 4)) {
                        imgDivsFront[i].style.display = 'none';
                    }
                }

                // back 4 keychains
                displayImageDiv(imgDivsBack);
                changeDivPosition(imgDivsBack, 0, '40px', '130px', '120px', '140px');
                changeDivPosition(imgDivsBack, 1, '85px', '205px', '103px', '172px');
                changeDivPosition(imgDivsBack, 2, '50px', '100px', '390px', '100px');
                changeDivPosition(imgDivsBack, 3, '90px', '135px', '425px', '140px');
                break;
            case 'images/img14.jpg':
                // front 8 keychains
                changeDivPosition(imgDivsFront, 4, '20px', '110px', null, '350px');
                for (let i = 0; i < imgDivsFront.length; i++) {
                    if (i != 4) {
                        imgDivsFront[i].style.display = 'none';
                    }
                }

                // back 4 keychains
                displayImageDiv(imgDivsBack);
                changeDivPosition(imgDivsBack, 0, '45px', '135px', '110px', '143px');
                changeDivPosition(imgDivsBack, 1, '105px', '242px', '70px', '182px');
                changeDivPosition(imgDivsBack, 2, '77px', '120px', '395px', '90px');
                changeDivPosition(imgDivsBack, 3, '100px', '150px', '420px', '150px');
                break;
            case 'images/img15.jpg':
                // front 8 keychains
                changeDivPosition(imgDivsFront, 4, '15px', '90px', '370px', '365px');
                for (let i = 0; i < imgDivsFront.length; i++) {
                    if (i != 4) {
                        imgDivsFront[i].style.display = 'none';
                    }
                }

                // back 4 keychains
                displayImageDiv(imgDivsBack);
                changeDivPosition(imgDivsBack, 0, '45px', '150px', '105px', '140px');
                changeDivPosition(imgDivsBack, 1, '116px', '242px', '70px', '182px');
                changeDivPosition(imgDivsBack, 2, '85px', '130px', '390px', '85px');
                changeDivPosition(imgDivsBack, 3, '100px', '150px', '420px', '165px');
                break;
            case 'images/img16.jpg':
                // front 8 keychains
                hideImageDiv(imgDivsFront);

                // back 4 keychains
                displayImageDiv(imgDivsBack);
                changeDivPosition(imgDivsBack, 0, '60px', '150px', '105px', '150px');
                changeDivPosition(imgDivsBack, 1, '125px', '250px', '70px', '202px');
                changeDivPosition(imgDivsBack, 2, '108px', '145px', '395px', '85px');
                changeDivPosition(imgDivsBack, 3, '118px', '150px', '420px', '188px');
                break;
            case 'images/img17.jpg':
                // front 8 keychains
                hideImageDiv(imgDivsFront);

                // back 4 keychains
                displayImageDiv(imgDivsBack);
                changeDivPosition(imgDivsBack, 0, '65px', '190px', '70px', '165px');
                changeDivPosition(imgDivsBack, 1, '115px', '245px', '70px', '228px');
                changeDivPosition(imgDivsBack, 2, '122px', '150px', '405px', '105px');
                changeDivPosition(imgDivsBack, 3, '128px', '145px', '420px', '225px');
                break;
            case 'images/img18.jpg':
                // front 8 keychains
                hideImageDiv(imgDivsFront);

                // back 4 keychains
                displayImageDiv(imgDivsBack);
                changeDivPosition(imgDivsBack, 0, '65px', '190px', '70px', '180px');
                changeDivPosition(imgDivsBack, 1, '108px', '242px', '70px', '245px');
                changeDivPosition(imgDivsBack, 2, '128px', '150px', '410px', '115px');
                changeDivPosition(imgDivsBack, 3, '125px', '145px', '415px', '240px');
                break;
            case 'images/img19.jpg':
                // front 8 keychains
                hideImageDiv(imgDivsFront);

                // back 4 keychains
                displayImageDiv(imgDivsBack);
                changeDivPosition(imgDivsBack, 0, '65px', '192px', '68px', '200px');
                changeDivPosition(imgDivsBack, 1, '100px', '230px', '80px', '260px');
                changeDivPosition(imgDivsBack, 2, '128px', '150px', '410px', '135px');
                changeDivPosition(imgDivsBack, 3, '105px', '135px', '410px', '260px');
                break;
            case 'images/img20.jpg':
                // front 8 keychains
                hideImageDiv(imgDivsFront);

                // back 4 keychains
                displayImageDiv(imgDivsBack);
                changeDivPosition(imgDivsBack, 0, '65px', '192px', '68px', '210px');
                changeDivPosition(imgDivsBack, 1, '90px', '225px', '80px', '270px');
                changeDivPosition(imgDivsBack, 2, '118px', '150px', '410px', '152px');
                changeDivPosition(imgDivsBack, 3, '95px', '135px', '405px', '270px');
                break;
            case 'images/img21.jpg':
                // front 8 keychains
                hideImageDiv(imgDivsFront);

                // back 4 keychains
                displayImageDiv(imgDivsBack);
                changeDivPosition(imgDivsBack, 0, '65px', '192px', '68px', '220px');
                changeDivPosition(imgDivsBack, 1, '75px', '225px', '80px', '285px');
                changeDivPosition(imgDivsBack, 2, '118px', '150px', '415px', '170px');
                changeDivPosition(imgDivsBack, 3, '80px', '135px', '395px', '285px');
                break;
            case 'images/img22.jpg':
                // front 8 keychains
                hideImageDiv(imgDivsFront);
                imgDivsFront[7].style.display = 'block';
                changeDivPosition(imgDivsFront, 7, '10px', '45px', '400px', '125px');

                // back 4 keychains
                displayImageDiv(imgDivsBack);
                changeDivPosition(imgDivsBack, 0, '65px', '192px', '68px', '230px');
                changeDivPosition(imgDivsBack, 1, '60px', '150px', '150px', '285px');
                changeDivPosition(imgDivsBack, 2, '100px', '145px', '415px', '190px');
                changeDivPosition(imgDivsBack, 3, '65px', '135px', '390px', '290px');
                break;
            case 'images/img23.jpg':
                // front 8 keychains
                hideImageDiv(imgDivsFront);
                imgDivsFront[7].style.display = 'block';
                changeDivPosition(imgDivsFront, 7, '15px', '45px', '405px', '135px');

                // back 4 keychains
                displayImageDiv(imgDivsBack);
                changeDivPosition(imgDivsBack, 0, '65px', '192px', '68px', '230px');
                changeDivPosition(imgDivsBack, 1, '45px', '150px', '150px', '295px');
                changeDivPosition(imgDivsBack, 2, '105px', '150px', '415px', '200px');
                changeDivPosition(imgDivsBack, 3, '55px', '120px', '390px', '295px');
                imgDivsBack[2].style.transform = 'rotate(345deg)';
                imgDivsBack[3].style.transform = 'rotate(340deg)';
                break;
            case 'images/img24.jpg':
                // front 8 keychains
                hideImageDiv(imgDivsFront);
                imgDivsFront[3].style.display = 'block';
                imgDivsFront[7].style.display = 'block';
                changeDivPosition(imgDivsFront, 3, null, '75px', null, '155px');
                changeDivPosition(imgDivsFront, 7, '24px', '95px', '360px', '152px');

                // back 4 keychains
                displayImageDiv(imgDivsBack);
                changeDivPosition(imgDivsBack, 0, '65px', '192px', '68px', '240px');
                changeDivPosition(imgDivsBack, 1, '35px', '130px', '160px', '297px');
                changeDivPosition(imgDivsBack, 2, '105px', '150px', '415px', '220px');
                changeDivPosition(imgDivsBack, 3, '50px', '115px', '380px', '295px');
                imgDivsBack[2].style.transform = 'rotate(330deg)';
                imgDivsBack[3].style.transform = 'rotate(320deg)';
                break;
            case 'images/img25.jpg':
                // front 8 keychains
                hideImageDiv(imgDivsFront);
                imgDivsFront[3].style.display = 'block';
                imgDivsFront[7].style.display = 'block';
                changeDivPosition(imgDivsFront, 3, null, '215px', '50px', '175px');
                changeDivPosition(imgDivsFront, 7, '28px', null, null, '170px');

                // back 4 keychains
                displayImageDiv(imgDivsBack);
                changeDivPosition(imgDivsBack, 0, '65px', '185px', '68px', '240px');
                changeDivPosition(imgDivsBack, 1, '70px', '45px', '245px', '260px');
                changeDivPosition(imgDivsBack, 2, '105px', '105px', '440px', '245px');
                changeDivPosition(imgDivsBack, 3, '50px', '85px', '375px', '280px');
                imgDivsBack[2].style.transform = 'rotate(320deg)';
                imgDivsBack[3].style.transform = 'rotate(305deg)';
                break;
            case 'images/img26.jpg':
                // front 8 keychains
                imgDivsFront[0].style.display = 'none';
                imgDivsFront[1].style.display = 'none';
                imgDivsFront[4].style.display = 'none';
                changeDivPosition(imgDivsFront, 2, '34px', '100px', '80px', '187px');
                changeDivPosition(imgDivsFront, 3, '35px', '75px','195px', '185px');
                changeDivPosition(imgDivsFront, 5, '40px', '60px', '355px', '180px');
                changeDivPosition(imgDivsFront, 6, '30px', '25px', '455px', '190px');
                changeDivPosition(imgDivsFront, 7, '34px', '45px', '410px', '185px');

                // back 4 keychains
                displayImageDiv(imgDivsBack);
                changeDivPosition(imgDivsBack, 0, '65px', '170px', '68px', '245px');
                changeDivPosition(imgDivsBack, 1, '70px', '55px', '235px', '255px');
                changeDivPosition(imgDivsBack, 2, '105px', '105px', '440px', '245px');
                changeDivPosition(imgDivsBack, 3, '75px', '60px', '380px', '250px');
                break;
            case 'images/img27.jpg':
                // front 8 keychains
                imgDivsFront[0].style.display = 'none';
                imgDivsFront[4].style.display = 'none';
                changeDivPosition(imgDivsFront, 1, '18px', '50px', '195px', '190px');
                changeDivPosition(imgDivsFront, 2, null, null, null, '195px');
                changeDivPosition(imgDivsFront, 3, '30px', '65px','200px', '210px');
                changeDivPosition(imgDivsFront, 5, null, '67px', null, '170px');
                changeDivPosition(imgDivsFront, 6, '28px', '65px', '415px', '188px');
                changeDivPosition(imgDivsFront, 7, '32px', '95px', '362px', '212px');

                // back 4 keychains
                displayImageDiv(imgDivsBack);
                changeDivPosition(imgDivsBack, 0, '40px', '133px', '120px', '275px');
                changeDivPosition(imgDivsBack, 1, '45px', '45px', '245px', '275px');
                changeDivPosition(imgDivsBack, 2, '95px', '125px', '428px', '270px');
                changeDivPosition(imgDivsBack, 3, '50px', '55px', '380px', '270px');
                break;
            case 'images/img28.jpg':
                // front 8 keychains
                changeDivPosition(imgDivsFront, 0, '15px', '150px', '110px', '170px');
                changeDivPosition(imgDivsFront, 1, '25px', '80px', '165px', '185px');
                changeDivPosition(imgDivsFront, 2, '32px', '140px', '70px', '200px');
                changeDivPosition(imgDivsFront, 3, null, '215px', '50px', '225px');
                changeDivPosition(imgDivsFront, 5, null, '77px', null, '165px');
                changeDivPosition(imgDivsFront, 6, '34px', null, null, '195px');
                changeDivPosition(imgDivsFront, 7, null, null, null, '228px');

                // back 4 keychains
                displayImageDiv(imgDivsBack);
                changeDivPosition(imgDivsBack, 0, '18px', '125px', '128px', '300px');
                changeDivPosition(imgDivsBack, 1, '18px', '30px', '245px', '295px');
                changeDivPosition(imgDivsBack, 2, '80px', '110px', '428px', '290px');
                changeDivPosition(imgDivsBack, 3, '18px', '25px', '400px', '290px');
                break;
            case 'images/img29.jpg':
                // front 8 keychains
                imgDivsFront[4].style.display = 'block';
                changeDivPosition(imgDivsFront, 0, '25px', null, '102px', '150px');
                changeDivPosition(imgDivsFront, 1, null, '150px', '95px', '175px');
                changeDivPosition(imgDivsFront, 2, '35px', '155px', null, '210px');
                changeDivPosition(imgDivsFront, 3, null, null, null, '250px');
                changeDivPosition(imgDivsFront, 4, '22px', '80px', '330px', '148px');
                changeDivPosition(imgDivsFront, 5, '35px', '120px', '325px', '170px');
                changeDivPosition(imgDivsFront, 6, null, '130px', '350px', '205px');
                changeDivPosition(imgDivsFront, 7, '40px', null, null, '250px');

                // back 4 keychains
                imgDivsBack[2].style.display = 'block';
                changeDivPosition(imgDivsBack, 2, '60px', '110px', '420px', '315px');
                break;
            case 'images/img30.jpg':
                // front 8 keychains
                changeDivPosition(imgDivsFront, 0, '30px', '152px', null, '135px');
                changeDivPosition(imgDivsFront, 1, '32px', null, null, '165px');
                changeDivPosition(imgDivsFront, 2, '38px', null, null, '215px');
                changeDivPosition(imgDivsFront, 3, '35px', null, null, '265px');
                changeDivPosition(imgDivsFront, 4, '28px', '85px', null, '135px');
                changeDivPosition(imgDivsFront, 5, '45px', null, null, '160px');
                changeDivPosition(imgDivsFront, 6, '45px', null, null, null);
                changeDivPosition(imgDivsFront, 7, null, null, null, '267px');

                // back 4 keychains
                imgDivsBack[2].style.display = 'block';
                changeDivPosition(imgDivsBack, 2, '45px', '105px', '418px', '335px');
                break;
            case 'images/img31.jpg':
                // front 8 keychains
                changeDivPosition(imgDivsFront, 0, '20px', '152px', null, '120px');
                changeDivPosition(imgDivsFront, 1, '30px', null, null, '160px');
                changeDivPosition(imgDivsFront, 2, '42px', null, null, '220px');
                changeDivPosition(imgDivsFront, 3, null, null, null, '282px');
                changeDivPosition(imgDivsFront, 4, '36px', '90px', null, '120px');
                changeDivPosition(imgDivsFront, 5, '58px', '125px', null, '155px');
                changeDivPosition(imgDivsFront, 6, null, null, null, '215px');
                changeDivPosition(imgDivsFront, 7, '45px', null, '356px', '285px');

                // back 4 keychains
                imgDivsBack[2].style.display = 'block';
                changeDivPosition(imgDivsBack, 2, '25px', '80px', '425px', '353px');
                break;
            case 'images/img32.jpg':
                // front 8 keychains
                changeDivPosition(imgDivsFront, 0, null, '155px', null, '105px');
                changeDivPosition(imgDivsFront, 1, '35px', null, null, '152px');
                changeDivPosition(imgDivsFront, 2, null, null, null, '230px');
                changeDivPosition(imgDivsFront, 3, '38px', '205px', '60px', '300px');
                changeDivPosition(imgDivsFront, 4, '40px', '92px', null, '105px');
                changeDivPosition(imgDivsFront, 5, '70px', null, null, '150px');
                changeDivPosition(imgDivsFront, 6, '50px', null, null, '220px');
                changeDivPosition(imgDivsFront, 7, '40px', null, '350px', '308px');
                break;
            case 'images/img33.jpg':
                // front 8 keychains
                changeDivPosition(imgDivsFront, 0, '30px', '165px', '95px', '81px');
                changeDivPosition(imgDivsFront, 1, '35px', null, null, '152px');
                changeDivPosition(imgDivsFront, 2, null, null, null, '245px');
                changeDivPosition(imgDivsFront, 3, null, null, null, '320px');
                changeDivPosition(imgDivsFront, 4, '55px', '100px', '340px', '80px');
                changeDivPosition(imgDivsFront, 5, '80px', '135px', null, null);
                changeDivPosition(imgDivsFront, 6, '52px', '122px', null, '235px');
                changeDivPosition(imgDivsFront, 7, '30px', '90px', '340px', '335px');
            default:
                // front 8 keychains
                changeDivPosition(imgDivsFront, 0, '30px', '200px', '70px', '77px');
                changeDivPosition(imgDivsFront, 1, '50px', '185px', '70px', '150px');
                changeDivPosition(imgDivsFront, 2, '50px', '155px', '70px', '242px');
                changeDivPosition(imgDivsFront, 3, '42px', '195px', '75px', '322px');
                changeDivPosition(imgDivsFront, 4, '60px', '110px', '340px', '78px');
                changeDivPosition(imgDivsFront, 5, '90px', '130px', '330px', '150px');
                changeDivPosition(imgDivsFront, 6, '57px', '145px', '330px', '238px');
                changeDivPosition(imgDivsFront, 7, '35px', '90px', '335px', '328px');
                
                // back 4 keychains
                hideImageDiv(imgDivsBack);
        }
    }

})();

// ROTATION FOR DISPLAY STAND
    /* const theImg = document.querySelector('img');
    let displayedImg;
    let changePhoto = 2;
    
    theImg.addEventListener('click', changeImage);
    

    function changeImage() {
        theImg.src = `images/img${changePhoto}.jpg`;
        displayedImg = `images/img${changePhoto}.jpg`;
        if (changePhoto > 32) {
            changePhoto = 1;
        }
        else {
            changePhoto++;
        }
        editImgDiv();
    } */