(function(){
    'use strict';
    
    const sections = document.querySelectorAll('section');
    const h2s = document.querySelectorAll('h2');
    const begin = document.getElementById('begin');
    const startGame = document.getElementById('startgame');
    const inputs = document.querySelectorAll('input');
    const score = document.querySelectorAll('.player p strong');

    // how to play
    const htpBtns = document.querySelectorAll('.howtoplay');
    const rules = document.getElementById('instructions');
    const closeBtn = document.getElementById('close-btn');

    // game 
    const gameh3 = document.querySelector('h3');
    const gameDiv = document.querySelector('#game > div');
    const gameImgs = document.querySelectorAll('#game img');
    const gamePtags = document.querySelectorAll('#game p');

    // actions
    const actionBtnCover = document.getElementById('btn-cover'); 
    const rollBtn = document.getElementById('roll'); 
    const passBtn = document.getElementById('pass');

    // winner
    const winnerPtag = document.getElementById('winner');
    const playAgainBtn = document.getElementById('play-again');

    // yay sound
    const yaySound = new Audio('media/yay.mp3');

    // button click sound
    const btnClickSound = new Audio('media/button.wav');

    const gameData = {
        dice: [
            'basket1.svg',
            'basket2.svg',
            'basket3.svg',
            'basket4.svg',
            'basket5.svg',
            'basket6.svg'
        ],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    // 'click' event listeners for how to play buttons
    for(const eachBtn of htpBtns) {
        eachBtn.addEventListener('click', function() {
            btnClickSound.play();
            rules.className = 'showing';
        })
    }

    // 'click' event listener for close button in HTP overlay
    closeBtn.addEventListener('click', function() {
        btnClickSound.play();
        rules.className = 'hidden';
    })

    // 'ecs' key event listener for close button in HTP overlay
    document.addEventListener('keydown', function(event) {
        if (rules.className == 'showing' && event.key === 'Escape') {
            btnClickSound.play();
            rules.className = 'hidden';
        }
    })
    
    // event listener for play button on cover page
    begin.addEventListener('click', function() {
        btnClickSound.play();
        sections[0].style.display = 'none';
        sections[1].style.display = 'block';

        document.getElementById('quit').addEventListener('click', function() {
            btnClickSound.play();
            location.reload();
        });
        
    })

    // 'enter' key event listener for start button on player name input page
    document.addEventListener('keydown', function(event) {
        if(sections[1].style.display == 'block' && event.key === 'Enter') {
            btnClickSound.play();
            checkInputs();
        }
    })

    // 'click' event listener for start button on player name input page
    startGame.addEventListener('click', function() {
        btnClickSound.play();
        checkInputs();
    })

    // checks if players' name are filled out and calls initializer()
    function checkInputs() {
        if (inputs[0].value && inputs[1].value) {
            inputs[0].value = inputs[0].value.charAt(0).toUpperCase() + inputs[0].value.slice(1);
            inputs[1].value = inputs[1].value.charAt(0).toUpperCase() + inputs[1].value.slice(1);
            sections[1].style.display = 'none';
            sections[2].style.display = 'block';
            gameData.index = Math.round(Math.random());
            h2s[1].textContent = inputs[0].value;
            h2s[2].textContent = inputs[1].value;
            initializer();
        }
        else {
            alert('Please enter your name.');
        }
    }
    
    // sets up the game
    function initializer() {
        gameh3.textContent = `${inputs[gameData.index].value}'s Turn`;
        rollBtn.addEventListener('click', function() {
            btnClickSound.play();
            throwDice();
        })
    
        passBtn.addEventListener('click', function() {
            btnClickSound.play();
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            gamePtags[2].style.fontSize = '24px';
            gamePtags[2].textContent = `Passing turn to ${inputs[gameData.index].value}`;
            setTimeout(changePlayer, 2000);
        });
    }

    // changes player
    function changePlayer() {
        actionBtnCover.style.display = 'none';
        rollBtn.style.backgroundColor = 'black';
        passBtn.style.backgroundColor = 'black';
        gamePtags[2].textContent = '';
        gameh3.textContent = `${inputs[gameData.index].value}'s Turn`;
    }

    // changes baskets images to empty baskets
    function clearBaskets() {
        gameImgs[0].setAttribute('src', 'images/basket0.svg');
        gameImgs[1].setAttribute('src', 'images/basket0.svg');
        gamePtags[0].textContent = '';
        gamePtags[1].textContent = '';
        changePlayer();
    }

    // disables 'roll' and 'pass' buttons
    function disableBtns() {
        actionBtnCover.style.display = 'block';
        rollBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.55)';
        passBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.55)';
    }

    // runs game
    function throwDice() {
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        gameh3.textContent = `${inputs[gameData.index].value}'s Turn`;
        gameImgs[0].setAttribute('src', `images/${gameData.dice[gameData.roll1 - 1]}`);
        gameImgs[1].setAttribute('src', `images/${gameData.dice[gameData.roll2 - 1]}`);
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        gamePtags[0].textContent = `${gameData.roll1}`;
        gamePtags[1].textContent = `${gameData.roll2}`;

        if (gameData.rollSum === 2) {
            disableBtns();
            gameDiv.style.margin = '0';
            gamePtags[2].style.fontSize = '22px';
            gamePtags[2].textContent = "Oh no! Two of your bunnies ate your entire stash of carrots! You're left with 30 hungry bunnies again.";
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            showCurrentScore();
            setTimeout(clearBaskets, 3000);
        }
        else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            disableBtns();
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            gameDiv.style.margin = '0';
            gamePtags[2].style.fontSize = '22px';
            gamePtags[2].textContent = `Oh no! One of your bunnies ate all of the carrots in the baskets! Switching to ${inputs[gameData.index].value}`;
            setTimeout(clearBaskets, 2800);
        }
        else {
            gameData.score[gameData.index] += gameData.rollSum;
            gameDiv.style.margin = '50px 0';
            gamePtags[2].style.fontSize = '24px';
            gamePtags[2].textContent = `feeding ${gameData.rollSum} of your bunnies`;
            checkWinningCondition();
        }
    }

    // checks winning condition
    function checkWinningCondition() {
        showCurrentScore();
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            disableBtns();
            setTimeout(function() {
                yaySound.play();
                sections[2].style.display = 'none';
                sections[3].style.display = 'flex';
                winnerPtag.textContent = `${inputs[gameData.index].value} wins!`;
            }, 1000);
            playAgainBtn.addEventListener('click', function() {
                btnClickSound.play();
                sections[3].style.display = 'none';
                sections[0].style.display = 'flex';
                location.reload();
            });
        }
    }

    // shows current score for each player
    function showCurrentScore() {
        if (gameData.score[0] > 30) {
            score[0].textContent = '30';
        }
        else if (gameData.score[1] > 30) {
            score[1].textContent = '30';
        }
        else {
            score[0].textContent = `${gameData.score[0]}`;
            score[1].textContent = `${gameData.score[1]}`;
        }
    }
})();