let boxes = document.querySelectorAll(".btn-box");
let resetBtn = document.querySelector(".reset-btn");
let inner = document.querySelector(".inner");
let container = document.querySelector(".container");
let player0 = true;
let moveCount = 0;

const WINNING_PATTERN = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [0, 4, 8],
  [2, 4, 6],
  [2, 5, 8],
  [1, 4, 7],
];

const TOTAL_BOXES = 9;

resetBtn.addEventListener("click", () => {
  player0 = true;
  moveCount = 0;
  enableBtn();
});

const enableBtn = () => {
  for (let a of boxes) {
    a.disabled = false;
    a.innerText = "";
  }
};

const disabledBtn = () => {
  for (let a of boxes) {
    a.disabled = true;
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (player0) {
      box.innerText = "0";
      player0 = false;
    } else {
      box.innerText = "X";
      player0 = true;
    }
    box.disabled = true;
    moveCount++;
    checkWinner();
    if (moveCount === TOTAL_BOXES && !checkForWinner()) {
      drawMessage();
    }
  });
});

const checkForWinner = () => {
  for (let patt of WINNING_PATTERN) {
    let postV1 = boxes[patt[0]].innerText;
    let postV2 = boxes[patt[1]].innerText;
    let postV3 = boxes[patt[2]].innerText;

    if (postV1 !== "" && postV2 !== "" && postV3 !== "") {
      if (postV1 === postV2 && postV3 === postV2) {
        return true;
      }
    }
  }
  return false;
};

const checkWinner = () => {
  if (checkForWinner()) {
    let winner = player0 ? "X" : "0";
    showWinner(winner);
  }
};

let msg;

function showWinner(winner) {
  msg = document.createElement("msg");
  msg.innerHTML = `
    <h1>Winner is ${winner}</h1>
    <button id="new-game" onclick="newbtn_func()">New Game</button>
    `;
  container.appendChild(msg);
  resetBtn.classList.add("hidden");
  disabledBtn();
}

function drawMessage() {
  msg = document.createElement("msg");
  msg.innerHTML = `
    <h1>Match is drawn</h1>
    <button id="new-game" onclick="newbtn_func()">New Game</button>
    `;
  container.appendChild(msg);
  resetBtn.classList.add("hidden");
  disabledBtn();
}

function newbtn_func() {
  msg.classList.add("hidden");
  resetBtn.classList.remove("hidden");
  player0 = true;
  moveCount = 0;
  enableBtn();
}
