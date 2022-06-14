// Play Pong

// Setup Canvas and Graphics Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 600;
cnv.height = 400;

// Global Variables
let yBoundary = -10;
let paddleX = 0;
let paddleY = cnv.height / 2 - 50;
let playerDirection;
let computerX = cnv.width - 20;
let computerY = cnv.height / 2 - 50;
let playerScore = 0;
let computerScore = 0;
let playAgainEl = document.getElementById("playAgainBtn");
let lastScore;
let setEasyModeBtn = document.getElementById("easy-btn");
let setMediumModeBtn = document.getElementById("medium-btn");
let setHardModeBtn = document.getElementById("hard-btn");
let settingX = 1;
let settingY = 4;
let moveLevel = 4;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

setEasyModeBtn.addEventListener("click", setEasyMode);
setMediumModeBtn.addEventListener("click", setMediumMode);
setHardModeBtn.addEventListener("click", setHardMode);

function setEasyMode() {
    settingX = 1;
    settingY = 4;
    moveLevel = 4;
    setEasyModeBtn.style.backgroundColor = "salmon";
    setMediumModeBtn.style.backgroundColor = "black";
    setHardModeBtn.style.backgroundColor = "black";
    playAgain();
}

function setMediumMode() {
    settingX = 1;
    settingY = 7;
    moveLevel = 5;
    setEasyModeBtn.style.backgroundColor = "black";
    setMediumModeBtn.style.backgroundColor = "salmon";
    setHardModeBtn.style.backgroundColor = "black";
    playAgain();
}

function setHardMode() {
    settingX = 2;
    settingY = 10;
    moveLevel = 6;
    setEasyModeBtn.style.backgroundColor = "black";
    setMediumModeBtn.style.backgroundColor = "black";
    setHardModeBtn.style.backgroundColor = "salmon";
    playAgain();
}

playAgainEl.addEventListener("click", playAgain)

function playAgain() {
    playerScore = 0;
    computerScore = 0;
    gameIsFinished = false;
    ball.X = cnv.width / 2;
    ball.Y = cnv.height / 2;
    ball.velocityX = -5;
    ball.velocityY = 5;
    playAgainEl.style.display = "none";
}

let ball = {
    X : cnv.width / 2,
    Y : cnv.height / 2,
    radius : 10,
    velocityX : -5,
    velocityY : 5,
    speedMultiplier : 5,
}


function drawCenterLine() {
    for (let n = 0; n <= cnv.width; n += 20) {
        ctx.fillStyle = "white";
        ctx.fillRect(298, 0 + n, 4, 10);
    }
}

function collisionPlayer() {
    let playerTop = paddleY;
    let playerBottom = paddleY + 100;
    let playerLeft = paddleX;
    let playerRight = paddleX + 20;

    let ballTop = ball.Y - ball.radius;
    let ballBottom = ball.Y + ball.radius;
    let ballLeft = ball.X - ball.radius;
    let ballRight = ball.X + ball.radius;

    return playerLeft < ballRight && playerTop < ballBottom && playerRight > ballLeft && playerBottom > ballTop;
}

function collisionComputer() {
    let computerTop = computerY;
    let computerBottom = computerY + 100;
    let computerLeft = computerX;
    let computerRight = computerX + 20;

    let ballTop = ball.Y - ball.radius;
    let ballBottom = ball.Y + ball.radius;
    let ballLeft = ball.X - ball.radius;
    let ballRight = ball.X + ball.radius;

    return computerRight > ballLeft && computerTop < ballBottom && computerLeft < ballRight && computerBottom > ballTop;
}



function update() {

    // Moving the ball
    ball.X += ball.velocityX;
    ball.Y += ball.velocityY;

    // ball Restrictions
    if (ball.Y + ball.radius > cnv.height || ball.Y - ball.radius < 0) {
        ball.velocityY = ball.velocityY * -1;
    }

    if (collisionPlayer()) {
        let collidePoint = (ball.Y - (paddleY + 50));

        if (collidePoint <= 0) {
            // Upper Half of player
            ball.velocityX = 6 + getRandomInt(settingX);
            ball.velocityY -= getRandomInt(settingY);
            ball.velocityX = ball.velocityX * -1;


        } else if (collidePoint > 0) {
            // Lower Half of player
            ball.velocityX = 6 + getRandomInt(settingX);
            ball.velocityY += getRandomInt(settingY);
            ball.velocityX = ball.velocityX * -1;
        }
        ball.velocityX *= -1

    }
    if (collisionComputer()) {
        let collideCompPoint = (ball.Y - (computerY + 50));
        if (collideCompPoint <= 0) {
            // Upper Half of computer
            ball.velocityX = 6 + getRandomInt(settingX);
            ball.velocityY -= getRandomInt(settingY);

        } else if (collideCompPoint > 0) {
            // Lower Half of computer paddle
            ball.velocityX = 6 + getRandomInt(settingX);
            ball.velocityY += getRandomInt(settingY);
        }
        ball.velocityX *= -1
    
    }
}

function render() {
    // Black Background
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    // Score Counters
    ctx.font = "50px Times";
    ctx.lineWdith = 1;
    ctx.strokeStyle = "white";
    ctx.strokeText(playerScore, 150, 80);
    ctx.strokeText(computerScore, 450, 80);

    // Center Line
    drawCenterLine();

    // DRAW BALL
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ball.X, ball.Y, ball.radius, 0, 2 * Math.PI);
    ctx.fill();

    // Player Paddle
    ctx.fillStyle = "white";
    ctx.fillRect(paddleX, paddleY, 20, 100);

    // Computer Paddle
    ctx.fillStyle = "white";
    ctx.fillRect(computerX, computerY, 20, 100);
    if ((computerY + 50) > ball.Y) {
        computerY -= moveLevel;
    } else if ((computerY + 50) < ball.Y) {
        computerY += moveLevel;
    }

    // Scoring
    if (ball.X < 0) {
        computerScore++;
        lastScore = "computer";
        resetGame();
    } else if (ball.X > cnv.width) {
        playerScore++;
        lastScore = "player";
        resetGame();
    }
}

let gameIsFinished = false;
function resetGame() {
    ball.X = cnv.width / 2;
    ball.Y = cnv.height / 2;
    if (lastScore === "computer") {
        ball.velocityX = -5;
        ball.velocityY = 0;
    } else if (lastScore === "player") {
        ball.velocityX = 5;
        ball.velocityY = 0;
    }
    
    ball.speedMultiplier = 5;
    if (playerScore > 9) {
        alert("Player Win!")
        gameIsFinished = true;
        playAgainEl.style.display = "initial";
    } else if (computerScore > 9) {
        alert("Computer Win!")
        gameIsFinished = true;
        playAgainEl.style.display = "initial";
    }
}

function game() {
    if (!gameIsFinished) {
        update();
        render();
    }
}

let fps = 60
setInterval(game, 1000/fps);


document.addEventListener("mousemove", movePlayerPaddle);

let mouseY, pmouseY;
function movePlayerPaddle(event) {
    pmouseY = mouseY;

    let cnvRect = cnv.getBoundingClientRect();
    mouseY = event.y - cnvRect.y;
    if ((paddleY + 50) > mouseY) {
        paddleY -= 5;
    } else if ((paddleY + 50) < mouseY) {
        paddleY += 5;
    }
}


