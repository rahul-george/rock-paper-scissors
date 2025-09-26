let score = {
  human: 0,
  computer: 0,
};

let round = 0;

let maxRounds = 5;

function getRandomInt(min, max) {
  // From MDN Docs
  min = Math.ceil(min);
  max = Math.floor(max);
  random = Math.random();
  return Math.floor(random * (max - min + 1)) + min;
}

function playGame(humanInput, computerInput) {
  //
  round++;
  let winner = evaluateWinner(humanInput, computerInput);

  let message = "";
  if (winner === "playerOne") {
    message = `😀 You win round ${round}`;
    score["human"]++;
  } else if (winner === "playerTwo") {
    message = `😞 You lost round ${round}`;
    score["computer"]++;
  } else {
    message = `😐 Round ${round} a tie`;
  }
  console.log(message);
  updateUI(message);
}

function evaluateWinner(playerOne, playerTwo) {
  if (playerOne === 0 && playerTwo === 2) {
    return "playerOne";
  } else if (playerOne === 0 && playerTwo === 1) {
    return "playerTwo";
  } else if (playerOne === 1 && playerTwo === 0) {
    return "playerOne";
  } else if (playerOne === 1 && playerTwo === 2) {
    return "playerTwo";
  } else if (playerOne === 2 && playerTwo === 0) {
    return "playerTwo";
  } else if (playerOne === 2 && playerTwo === 1) {
    return "playerOne";
  } else {
    return "tie";
  }
}

function updateUI(message) {
  // Update the UI with score and commentary
  updateScoresOnUI();
  let listItem = document.createElement("li");
  listItem.textContent = message;
  listItem.classList.add("gameResult");
  gameHistoryList.prepend(listItem);
}

function resetUI() {
  // reset the UI at the time of a game restart.
  let allGameResult = document.querySelectorAll(".gameResult");
  allGameResult.forEach((result) => result.remove());
}

function updateScoresOnUI() {
  humanScore.textContent = score.human;
  computerScore.textContent = score.computer;
}

function play(e) {
  console.log(e.target.dataset.value);
  const humanInput = parseInt(e.target.dataset.value);
  const computerInput = getRandomInt(0, 2);
  playGame(humanInput, computerInput);
}

const rockButton = document.querySelector("#rock_button");
const paperButton = document.querySelector("#paper_button");
const scissorsButton = document.querySelector("#scissors_button");
const humanScore = document.querySelector("#human_score");
const computerScore = document.querySelector("#computer_score");
const restartButton = document.querySelector("#restart");
const gameHistoryList = document.querySelector(".game_history");

rockButton.addEventListener("click", play);
paperButton.addEventListener("click", play);
scissorsButton.addEventListener("click", play);
restartButton.addEventListener("click", () => {
  score.human = 0;
  score.computer = 0;
  round = 0;
  updateScoresOnUI();
  resetUI();
});

// Prompt user
