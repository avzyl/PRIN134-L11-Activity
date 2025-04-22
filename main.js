const gameArea = document.getElementById("gameArea");
const target = document.getElementById("target");
const scoreBoard = document.getElementById("scoreBoard");

let score = 0;

function moveTarget() {
  const gameAreaRect = gameArea.getBoundingClientRect();
  const maxX = gameAreaRect.width - target.offsetWidth;
  const maxY = gameAreaRect.height - target.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  target.style.left = `${randomX}px`;
  target.style.top = `${randomY}px`;

  target.removeEventListener("contextmenu", updateScore);
  target.addEventListener("contextmenu", updateScore);
}

function updateScore(event) {
  event.preventDefault();
  score++;
  scoreBoard.innerText = `Score: ${score}`;
  moveTarget();
}

// Initial target position
moveTarget();

// resets (ctrl + p)
document.addEventListener("keydown", (event) => {
  const keyName = event.key;

  if (event.ctrlKey && keyName.toLowerCase() === "p") {
    event.preventDefault();
    score = 0;
    scoreBoard.innerText = `Score: ${score}`;
    console.log("Score reset! Current score:", score);
  }
});
