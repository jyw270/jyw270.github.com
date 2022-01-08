(function(){
    'use strict';

    alert('Hello! Here are three tasks for you to complete: rotate the display stand, hover over any keychain you want, hover over the slideshow and navigate the images with the arrow buttons');

    // VARIABLES FOR IMAGE AND CONTENT CHANGER
    let newSlide;
    const hotSpots = document.querySelectorAll('.front');
    const keychainDesc = document.querySelector('article p:last-of-type');
    let imgsArray = ['keychain1b.jpg', 'keychain1a.jpg'];
    let interval = setInterval(swapImage, 3000); 

    // VARIABLES FOR CROSSFADE IMAGES
    let currentImageVal = 0;
    let currentImg = imgsArray[0];
    let prevImg = currentImg;
    const container = document.getElementById('content'); 

    // VARIABLES FOR PREV AND NEXT BUTTON INTERACTION
    let currentDisplayedImg;
    let currentImgVal;
    let letter;
    const buttons = document.querySelectorAll('button');
    const buttonDiv = document.getElementById('buttons-container');

    // IMAGE AND CONTENT CHANGER
    hotSpots.forEach(function (eachSpot) {
        eachSpot.addEventListener('mouseover', changeContent);
    });


    // CROSSFADE IMAGES
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
    
        newSlide.src = `images/${imgsArray[currentImageVal]}`;  
    })

    // next button
    buttons[1].addEventListener('click', function() {
        currentImageVal++;
        if (currentImageVal > imgsArray.length-1) {
            currentImageVal = 0;
        }
    
        newSlide.src =`images/${imgsArray[currentImageVal]}`;
    })

    // ROTATION FOR DISPLAY STAND
    /* const theImg = document.querySelector('img');
    const imgDivsFront = document.querySelectorAll('.front');
    let displayedImg;
    theImg.addEventListener('click', changeImage);
    let changePhoto = 2;

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

    const theImg = document.querySelector('img');
    const imgDivsFront = document.querySelectorAll('.front');
    let displayedImg;
    let active;
    let startPos;
    let currentPos;
    let changePhoto = 2;

    theImg.addEventListener('mousedown', function(event) {
        active = true;
        startPos = event.clientX;
    });

    theImg.addEventListener('mousemove', function(event) {
        if (active === true) {
            event.preventDefault();
            changeImage();
          }
    });

    document.addEventListener('mouseup', function(event) {
        event.preventDefault();
        active = false;
    });
        

    function changeImage() {
        currentPos = window.event.clientX;
        if (currentPos + 50 < startPos) {
            if (changePhoto < 2) {
                changePhoto = 33;
            }
            else {
                changePhoto--;
            }
            theImg.src = `images/img${changePhoto}.jpg`;
            displayedImg = `images/img${changePhoto}.jpg`;
        }
        else if (currentPos - 50 > startPos) {
            theImg.src = `images/img${changePhoto}.jpg`;
            displayedImg = `images/img${changePhoto}.jpg`;
            if (changePhoto > 32) {
                changePhoto = 1;
            }
            else {
                changePhoto++;
            }
        } 
          
        // console.log('di: ', displayedImg);
        editImgDiv();
    }

    function changeDivPosition(keychain, width, height, top, left) {
        width ? (imgDivsFront[keychain].style.width = width) : ('');
        height ? (imgDivsFront[keychain].style.height = height) : ('');
        top ? (imgDivsFront[keychain].style.top = top) : ('');
        left ? (imgDivsFront[keychain].style.left = left) : ('');
    }

    function displayImageDiv() {
        imgDivsFront.forEach(function(eachDiv) {
            eachDiv.style.display = 'block';
        });
    }

    function editImgDiv() {
        displayImageDiv();
        switch(displayedImg) {
            case 'images/img2.jpg':
                changeDivPosition(1, '45px', null, null, null);
                changeDivPosition(4, null, '115px', null, null);
                changeDivPosition(5, null, null, null, '152px');
                changeDivPosition(6, null, null, null, '242px');
                break;
            case 'images/img3.jpg':
                changeDivPosition(1, null, null, null, '154px');
                changeDivPosition(3, '38px', null, null, '315px');
                changeDivPosition(4, null, '120px', '345px', '82px');
                changeDivPosition(5, null, null, '335px', '160px');
                changeDivPosition(6, '52px', null, null, '245px');
                changeDivPosition(7, null, null, '325px', '320px');
                break;
            case 'images/img4.jpg':
                changeDivPosition(0, '38px', null, null, null);
                changeDivPosition(1, null, null, null, '158px');
                changeDivPosition(3, '30px', '170px', '90px', null);
                changeDivPosition(4, '65px', '125px', null, '88px');
                changeDivPosition(5, '87px', null, null, null);
                changeDivPosition(6, '48px', '140px', null, '250px');
                changeDivPosition(7, '30px', '85px', null, '318px');
                break;
            case 'images/img5.jpg':
                changeDivPosition(0, null, null, null, '92px');
                changeDivPosition(1, null, null, null, '168px');
                changeDivPosition(2, null, '145px', '80px', null);
                changeDivPosition(3, null, null, null, '305px');
                changeDivPosition(4, null, null, '355px', '103px');
                changeDivPosition(5, '74px', '135px', null, '180px');
                changeDivPosition(6, '40px', null, null, '255px');
                changeDivPosition(7, null, '80px', null, '308px');
                break;
            case 'images/img6.jpg':
                changeDivPosition(0, null, '210px', '60px', '115px');
                changeDivPosition(1, null, null, null, '182px');
                changeDivPosition(2, '45px', null, null, '247px');
                changeDivPosition(3, '26px', null, null, '300px');
                changeDivPosition(4, '68px', '130px', null, '120px');
                changeDivPosition(5, '70px', null, null, '190px');
                changeDivPosition(6, '32px', null, null, '260px');
                changeDivPosition(7, null, '72px', null, '300px');
                break;
            case 'images/img7.jpg':
                changeDivPosition(0, null, null, null, '135px');
                changeDivPosition(1, null, null, null, '190px');
                changeDivPosition(2, '42px', null, null, null);
                changeDivPosition(3, null, '158px', '100px', '290px');
                changeDivPosition(4, null, '138px', '352px', '137px');
                changeDivPosition(5, '55px', null, null, '205px');
                changeDivPosition(6, null, '125px', null, null);
                changeDivPosition(7, null, '60px', '335px', '290px');
                break;
            case 'images/img8.jpg':
                changeDivPosition(0, null, null, null, '157px');
                changeDivPosition(1, null, null, null, '200px');
                changeDivPosition(2, '38px', '140px', '90px', '245px');
                changeDivPosition(3, null, '150px', '105px', '278px');
                changeDivPosition(4, '60px', '128px', '365px', '128px');
                changeDivPosition(5, '47px', null, null, '218px');
                changeDivPosition(6, '20px', null, null, '265px');
                changeDivPosition(7, '25px', null, '330px', '280px');
                break;
            case 'images/img9.jpg':
                changeDivPosition(0, null, null, null, '175px');
                changeDivPosition(1, '32px', null, null, '215px');
                changeDivPosition(2, '27px', '135px', null, '248px');
                changeDivPosition(3, '20px', null, null, '274px');
                changeDivPosition(4, '50px', null, null, '180px');
                changeDivPosition(5, '40px', null, null, '230px');
                changeDivPosition(6, '15px', '50px', '400px', '270px');
                changeDivPosition(7, '27px', '65px', '320px', '268px');
                break;
            case 'images/img10.jpg':
                changeDivPosition(0, '30px', null, null, '200px');
                changeDivPosition(1, '18px', null, null, '235px');
                changeDivPosition(2, '25px', '125px', null, null);
                changeDivPosition(3, null, '65px', '190px', '260px');
                changeDivPosition(4, '46px', null, null, '200px');
                changeDivPosition(5, '35px', '80px', '387px', '245px');
                imgDivsFront[6].style.display = 'none';
                changeDivPosition(7, '24px', null, null, '258px');
                break;
            case 'images/img11.jpg':
                changeDivPosition(0, '40px', null, null, '235px');
                changeDivPosition(4, '35px', null, null, '240px');
                changeDivPosition(5, '15px', null, '382px', '272px');
                for (let i = 0; i < imgDivsFront.length; i++) {
                    if ((i != 0) && (i != 4) && (i != 5)) {
                        imgDivsFront[i].style.display = 'none';
                    }
                }
                break;
            case 'images/img12.jpg':
                changeDivPosition(0, '30px', null, null, '290px');
                changeDivPosition(4, '32px', null, null, '288px');
                for (let i = 0; i < imgDivsFront.length; i++) {
                    if ((i != 0) && (i != 4)) {
                        imgDivsFront[i].style.display = 'none';
                    }
                }
            break;
            case 'images/img13.jpg':
                changeDivPosition(0, '20px', null, null, '325px');
                changeDivPosition(4, '25px', '120px', null, '318px');
                for (let i = 0; i < imgDivsFront.length; i++) {
                    if ((i != 0) && (i != 4)) {
                        imgDivsFront[i].style.display = 'none';
                    }
                }
                break;
            case 'images/img14.jpg':
                changeDivPosition(4, '20px', '110px', null, '350px');
                for (let i = 0; i < imgDivsFront.length; i++) {
                    if (i != 4) {
                        imgDivsFront[i].style.display = 'none';
                    }
                }
                break;
            case 'images/img15.jpg':
                changeDivPosition(4, '15px', '90px', '370px', '365px');
                for (let i = 0; i < imgDivsFront.length; i++) {
                    if (i != 4) {
                        imgDivsFront[i].style.display = 'none';
                    }
                }
                break;
            case 'images/img22.jpg':
                imgDivsFront[7].style.display = 'block';
                changeDivPosition(7, '10px', '45px', '400px', '125px');
                break;
            case 'images/img23.jpg':
                changeDivPosition(7, '15px', '45px', '405px', '135px');
                break;
            case 'images/img24.jpg':
                //imgDivsFront[3].style.display = 'block';
                changeDivPosition(3, null, '75px', null, '155px');
                changeDivPosition(7, '24px', '95px', '360px', '152px');
                break;
            case 'images/img25.jpg':
                changeDivPosition(3, null, '215px', '50px', '175px');
                changeDivPosition(7, '28px', null, null, '170px');
                break;
            case 'images/img26.jpg':
                //imgDivsFront[2].style.display = 'block';
                imgDivsFront[4].style.display = 'none';
                //imgDivsFront[5].style.display = 'block';
                //imgDivsFront[6].style.display = 'block';
                changeDivPosition(2, '34px', '100px', '80px', '187px');
                changeDivPosition(3, '35px', '75px','195px', '185px');
                changeDivPosition(5, '40px', '60px', '355px', '180px');
                changeDivPosition(6, '30px', '25px', '455px', '190px');
                changeDivPosition(7, '34px', '45px', '410px', '185px');
                break;
            case 'images/img27.jpg':
                //imgDivsFront[1].style.display = 'block';
                changeDivPosition(1, '18px', '50px', '195px', '190px');
                changeDivPosition(2, null, null, null, '195px');
                changeDivPosition(3, '30px', '65px','200px', '210px');
                changeDivPosition(5, null, '67px', null, '170px');
                changeDivPosition(6, '28px', '65px', '415px', '188px');
                changeDivPosition(7, '32px', '95px', '362px', '212px');
                break;
            case 'images/img28.jpg':
                //imgDivsFront[0].style.display = 'block';
                changeDivPosition(0, '15px', '150px', '110px', '170px');
                changeDivPosition(1, '25px', '80px', '165px', '185px');
                changeDivPosition(2, '32px', '140px', '70px', '200px');
                changeDivPosition(3, null, '215px', '50px', '225px');
                changeDivPosition(5, null, '77px', null, '165px');
                changeDivPosition(6, '34px', null, null, '195px');
                changeDivPosition(7, null, null, null, '228px');
                break;
            case 'images/img29.jpg':
                imgDivsFront[4].style.display = 'block';
                changeDivPosition(0, '25px', null, '102px', '150px');
                changeDivPosition(1, null, '150px', '95px', '175px');
                changeDivPosition(2, '35px', '155px', null, '210px');
                changeDivPosition(3, null, null, null, '250px');
                changeDivPosition(4, '22px', '80px', '330px', '148px');
                changeDivPosition(5, '35px', '120px', '325px', '170px');
                changeDivPosition(6, null, '130px', '350px', '205px');
                changeDivPosition(7, '40px', null, null, '250px');
                break;
            case 'images/img30.jpg':
                changeDivPosition(0, '30px', '152px', null, '135px');
                changeDivPosition(1, '32px', null, null, '165px');
                changeDivPosition(2, '38px', null, null, '215px');
                changeDivPosition(3, '35px', null, null, '265px');
                changeDivPosition(4, '28px', '85px', null, '135px');
                changeDivPosition(5, '45px', null, null, '160px');
                changeDivPosition(6, '45px', null, null, null);
                changeDivPosition(7, null, null, null, '267px');
                break;
            case 'images/img31.jpg':
                changeDivPosition(0, '20px', '152px', null, '120px');
                changeDivPosition(1, '30px', null, null, '160px');
                changeDivPosition(2, '42px', null, null, '220px');
                changeDivPosition(3, null, null, null, '282px');
                changeDivPosition(4, '36px', '90px', null, '120px');
                changeDivPosition(5, '58px', '125px', null, '155px');
                changeDivPosition(6, null, null, null, '215px');
                changeDivPosition(7, '45px', null, '356px', '285px');
                break;
            case 'images/img32.jpg':
                changeDivPosition(0, null, '155px', null, '105px');
                changeDivPosition(1, '35px', null, null, '152px');
                changeDivPosition(2, null, null, null, '230px');
                changeDivPosition(3, '38px', '205px', '60px', '300px');
                changeDivPosition(4, '40px', '92px', null, '105px');
                changeDivPosition(5, '70px', null, null, '150px');
                changeDivPosition(6, '50px', null, null, '220px');
                changeDivPosition(7, '40px', null, '350px', '308px');
                break;
            default:
                changeDivPosition(0, '30px', '165px', '95px', '81px');
                changeDivPosition(1, '35px', null, null, '152px');
                changeDivPosition(2, null, null, null, '245px');
                changeDivPosition(3, null, null, null, '320px');
                changeDivPosition(4, '55px', '100px', '340px', '80px');
                changeDivPosition(5, '80px', '135px', null, null);
                changeDivPosition(6, '52px', '122px', null, '235px');
                changeDivPosition(7, '30px', '90px', '340px', '335px');
        }
    }

})();