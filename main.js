const gameArea = document.getElementById("gameArea");
const scoreBoard = document.getElementById("scoreBoard");
const ballInput = document.getElementById("ballInput");
const setupButton = document.querySelector("button");

let score = 0;
let targets = [];
let currentNumber = 1;

setupButton.addEventListener("click", () => {
    let numBalls = parseInt(ballInput.value) || 1;

    if (numBalls > 5) {
        numBalls = 5;
        ballInput.value = 5; 
        alert("Maximum number of targets is 5!");
    }

    setupTargets(numBalls);
});

function setupTargets(numBalls) {
    gameArea.innerHTML = "";
    targets = [];
    currentNumber = 1;

    for (let i = 1; i <= numBalls; i++) {
        const target = document.createElement("div");
        target.classList.add("target");
        target.innerText = i;

        gameArea.appendChild(target);
        targets.push(target);

        target.addEventListener("contextmenu", (event) => {
          event.preventDefault();
          checkSequence(i, target);
      });

    }

    moveTargets();
}

function moveTargets() {
    const gameAreaRect = gameArea.getBoundingClientRect();

    targets.forEach(target => {
        const maxX = gameAreaRect.width - target.offsetWidth;
        const maxY = gameAreaRect.height - target.offsetHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        target.style.left = `${randomX}px`;
        target.style.top = `${randomY}px`;
    });
}

function checkSequence(clickedNumber, target) {
  if (clickedNumber === currentNumber) {
      currentNumber++;
      target.style.display = "none";

      if (currentNumber > targets.length) {
          score++;
          scoreBoard.innerText = `Score: ${score}`;
          
          setupTargets(targets.length);
      }
  }
}


// resets (ctrl + p)
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === "p") {
        event.preventDefault();
        score = 0;
        scoreBoard.innerText = `Score: ${score}`;
        currentNumber = 1;
        setupTargets(targets.length);
    }
});
