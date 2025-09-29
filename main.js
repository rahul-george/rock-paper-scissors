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
    message = `😀 You <span class="resultAccent">win</span> round ${round}`;
    score["human"]++;
  } else if (winner === "playerTwo") {
    message = `😞 You <span class="resultAccent">lost</span> round ${round}`;
    score["computer"]++;
  } else {
    message = `😐 Round ${round} a <span class="resultAccent">tie</span>`;
  }

  updateUI(message, humanInput, computerInput);

  if (score["computer"] === maxRounds) {
    message = '😭 You <span class="resultAccent">won</span> 😭!';
    gameMessageText.innerHTML = message;
    disableGameControls();
  } else if (score["human"] === maxRounds) {
    message = '😄 You <span class="resultAccent">won</span>! 😄';
    gameMessageText.innerHTML = message;
    disableGameControls();
  }
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

function updateChoice(element, choice) {
  switch (choice) {
    case 0:
      element.textContent = "✊";
      break;
    case 1:
      element.textContent = "✋";
      break;
    case 2:
      element.textContent = "✌️";
      break;
    case -1:
      element.textContent = "❔";
      break;
    default:
      element.textContent = "❌";
      break;
  }
}

function disableGameControls() {
  const allGameControls = document.querySelectorAll(".game_control");
  allGameControls.forEach((control) => {
    control.disabled = true;
  });
  const gameControls = document.querySelector(".game_controls");
  gameControls.classList.add("disable-element");
}

function enableGameControls() {
  const allGameControls = document.querySelectorAll(".game_control");
  allGameControls.forEach((control) => {
    control.disabled = false;
  });
  const gameControls = document.querySelector(".game_controls");
  gameControls.classList.remove("disable-element");
}

function updateUI(message, humanInput, computerInput) {
  // Update the UI with score and commentary
  updateScoresOnUI();
  updateChoice(humanInputText, humanInput);
  updateChoice(computerInputText, computerInput);
  let listItem = document.createElement("li");
  listItem.innerHTML = message;
  listItem.classList.add("gameResult");
  gameHistoryList.prepend(listItem);
  gameMessageText.innerHTML = message;
}

function resetUI() {
  // reset the UI at the time of a game restart.
  let allGameResult = document.querySelectorAll(".gameResult");
  allGameResult.forEach((result) => result.remove());
  updateChoice(humanInputText, -1);
  updateChoice(computerInputText, -1);
}

function updateScoresOnUI() {
  humanScore.innerHTML = `<span class="resultAccent">${score.human}</span>`;
  computerScore.innerHTML = `<span class="resultAccent">${score.computer}</span>`;
}

function play(e) {
  e.stopPropagation();
  console.log(e.target.dataset.value);
  const humanInput = parseInt(e.target.dataset.value);
  const computerInput = getRandomInt(0, 2);
  playGame(humanInput, computerInput);
}

function newGame(e) {
  e.stopPropagation();
  score.human = 0;
  score.computer = 0;
  round = 0;
  updateScoresOnUI();
  resetUI();
  enableGameControls();
}

const rockButton = document.querySelector("#rock_button");
const paperButton = document.querySelector("#paper_button");
const scissorsButton = document.querySelector("#scissors_button");
const humanScore = document.querySelector("#human_score");
const computerScore = document.querySelector("#computer_score");
const newGameButton = document.querySelector("#restart");
const gameHistoryList = document.querySelector(".game_history");
const humanInputText = document.querySelector("#human_choice");
const computerInputText = document.querySelector("#computer_choice");
const gameMessageText = document.querySelector("#game_message");

rockButton.addEventListener("click", play);
paperButton.addEventListener("click", play);
scissorsButton.addEventListener("click", play);
newGameButton.addEventListener("click", newGame);
