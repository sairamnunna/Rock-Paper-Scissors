// Login 
const loginSection = document.getElementById('login-section');
const gameSection = document.getElementById('game-section');
const loginError = document.getElementById('login-error');
const loginButton = document.getElementById('login-button'); 

const validateLogin = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'Sairam Nunna' && password === 'sairam123') {
        loginSection.style.display = 'none'; 
        gameSection.style.display = 'block';
    } else {
        loginError.style.display = 'block'; 
    }
};


loginButton.addEventListener('click', validateLogin);


// Game logic 
let userScore = 0;
let compScore = 0;
const winningScore = 10; 

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetButton = document.getElementById("reset-btn");



const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const drawSound = document.getElementById("draw-sound");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randomId = Math.floor(Math.random() * 3);
    return options[randomId];
};

const drawGame = () => {
    msg.innerText = "Game was a draw. Play again!";
    msg.style.backgroundColor = "#081b31";
    drawSound.play();
};

const displayResult = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        winSound.play();
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lost! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
        loseSound.play();
    }
};

const checkGameEnd = () => {
    if (userScore === winningScore) {
        msg.innerText = "Congratulations! You won the game 🎉🎉!";
        msg.style.backgroundColor = "green";
        endGame();
        startCelebration(true);            // true for user win green flash
    } else if (compScore === winningScore) {
        msg.innerText = "Game Over! The computer won the game.";
        msg.style.backgroundColor = "red";
        endGame();
        startCelebration(false);           // false for comp win red flash
    }
};

const endGame = () => {
    choices.forEach(choice => choice.removeEventListener("click", handleChoiceClick));
};

const playGame = (userChoice) => {
    const compChoice = genCompChoice();

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "scissor";
        } else if (userChoice === "paper") {
            userWin = compChoice === "rock";
        } else {
            userWin = compChoice === "paper";
        }
        displayResult(userWin, userChoice, compChoice);
    }

   
    checkGameEnd();
};

const handleChoiceClick = (event) => {
    const userChoice = event.currentTarget.getAttribute("id").toLowerCase();
    playGame(userChoice);
};


choices.forEach(choice => {
    choice.addEventListener("click", handleChoiceClick);
});

// Reset button 
const resetGame = () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "Play your next move";
    msg.style.backgroundColor = "#081b31";
    choices.forEach(choice => {
        choice.addEventListener("click", handleChoiceClick);
    });
};


resetButton.addEventListener("click", resetGame);



// animation code
const startCelebration = (isUserWinner) => {
    if (isUserWinner) {
        gameSection.classList.add("celebrate-green"); // Add class for green flash when user wins
    } else {
        gameSection.classList.add("celebrate-red"); // Add class for red flash when computer wins
    }
    setTimeout(stopCelebration, 3000); //3000 means 3000millisec it means 3 seconds
};

const stopCelebration = () => {
    gameSection.classList.remove("celebrate-green");
    gameSection.classList.remove("celebrate-red"); // after  3 sec this will use to remove that animation 
};


