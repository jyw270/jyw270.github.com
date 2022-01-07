(function(){
    'use strict';

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
        console.log(newSlide);
        clearInterval(interval);
        switch(keychain) {
            case 'keychain1s':
                changeKeychain('keychain1a.jpg');
                keychainDesc.textContent = `These are two keychains that I attached to each other because I couldn't decide which one to 
                attach to my phone. I got the mini colorful stylist for free when I ordered a phone case. It was so pretty
                and cute, so I thought it would be useful if I'm ever wearing gloves and using my phone. I got the the 
                dragon jade keychain from an Asian bookstore because it represents my zodiac animal and because it reminds 
                me of my culture.`;
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
        interval = setInterval(swapImage, 3000); 
    }


})();