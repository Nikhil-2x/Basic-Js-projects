let randomNumber = parseInt(Math.random() * 100 + 1);
console.log(randomNumber);

const userInput = document.querySelector('.guessField');
const submit = document.querySelector('.guessSubmit');
const guessSlot = document.querySelector('.guesses');   
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');
const invisible = document.querySelector('.invisible');

const p = document.createElement('p');

let previousGuesses = [];
let numGuesses = 1;
let playGame = true;

if (playGame) {
    submit.addEventListener('click',function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if(isNaN(guess)){
        alert("Please enter a valid number");
    }else if (guess < 1 || guess > 100){
        alert("Please enter a number between 1 and 100");
    }else{
        previousGuesses.push(guess);
        if(numGuesses===10){
            displayMessage(`Game Over! Number was ${randomNumber}`);
            displayGuess(guess);
            endGame();
        }else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage(`Congratulations! You guessed it right!`);
        endGame();
    }else if (guess < randomNumber){
        displayMessage("Too low! Try again!");
    }else{
        displayMessage("Too High! Try again!");
    }
}

function displayGuess(guess){
    userInput.value = '';
    guessSlot.innerHTML += `${guess} `;
    numGuesses++;
    remaining.innerHTML = `${11 - numGuesses} `;
}

function displayMessage(message){
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled', '');

    invisible.style.display = 'none';
   

    p.classList.add('button');
    p.innerHTML = '<button id="playAgain">Play Again</button>';
    startOver.appendChild(p);
    playGame = false;
}

function newGame(){
    const newGameButton = document.querySelector("#playAgain");
    newGameButton.addEventListener('click',function(e){
    randomNumber = parseInt(Math.random() * 100 + 1);
    previousGuesses = [];
    numGuesses = 1;

    invisible.style.display = 'block';

    guessSlot.innerHTML = '';
    lowOrHi.innerHTML = '';
    remaining.innerHTML = `${11 - numGuesses} `;
    userInput.removeAttribute('disabled');  
    // submit.disabled = false;
    startOver.removeChild(p);
    playGame = true;
    });
}