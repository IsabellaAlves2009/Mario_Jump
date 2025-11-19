const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const timerElement = document.getElementById("timer");

let gameRunning = false;
let gameLoop;
let timerInterval;
let time = 0;

const jumpSound = new Audio("img/MarioJump.mp3");

function jump() {
  if (!gameRunning) return;

  jumpSound.currentTime = 0; 
  jumpSound.play();

  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
}

function jump() {
  if (!gameRunning) return;

  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
}

function startGame() {
  gameRunning = true;
  pipe.style.animation = "pipe-animation 1.5s infinite linear";

  startBtn.style.display = "none";
  restartBtn.style.display = "none";

  timerInterval = setInterval(() => {
    time++;
    timerElement.textContent = time + "s";
  }, 1000);

  gameLoop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");

    if (pipePosition <= 80 && pipePosition > 0 && marioPosition < 70) {

      pipe.style.animation = "none";
      pipe.style.left = pipePosition + "px";

      mario.style.animation = "none";
      mario.style.bottom = marioPosition + "px";
      mario.src = "img/game-over.png";

      clearInterval(gameLoop);
      clearInterval(timerInterval);

      restartBtn.style.display = "block";
    }
  }, 10);
}

function restartGame() {
  location.reload();
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") jump();
});

document.addEventListener("touchstart", () => {
  jump();
});

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);
