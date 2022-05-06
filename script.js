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
let computerX = cnv.width - 10;
let computerY = cnv.height / 2 - 50;
let playerScore = 0;
let computerScore = 0;
let playAgainEl = document.getElementById("playAgainBtn")

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
    // speedMultiplier : 1,
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
    let playerRight = paddleX + 10;

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
    let computerRight = computerX + 10;

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
        ball.velocityX = ball.velocityX * -1;
    }
    if (collisionComputer()) {
        ball.velocityX = ball.velocityX * -1;
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

    drawCenterLine();

    // DRAW BALL
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ball.X, ball.Y, ball.radius, 0, 2 * Math.PI);
    ctx.fill();

    // Player Paddle
    ctx.fillStyle = "white";
    ctx.fillRect(paddleX, paddleY, 10, 100);

    // Computer Paddle
    ctx.fillStyle = "white";
    ctx.fillRect(computerX, computerY, 10, 100);
    if ((computerY + 50) > ball.Y) {
        computerY -= 7;
    } else if ((computerY + 50) < ball.Y) {
        computerY += 7;
    }

    // Scoring
    if (ball.X < 0) {
        computerScore++;
        resetGame();
    } else if (ball.X > cnv.width) {
        playerScore++;
        resetGame();
    }
}

let gameIsFinished = false;
function resetGame() {
    ball.X = cnv.width / 2;
    ball.Y = cnv.height / 2;
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


