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

  if (winner === "playerOne") {
    console.log(`😀 You win round ${round}`);
    score["human"]++;
  } else if (winner === "playerTwo") {
    console.log(`😞 You lost round ${round}`);
    score["computer"]++;
  } else {
    console.log(`😐 Round ${round} a tie`);
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

let continue_game = true;
while (continue_game) {
  let humanInput = parseInt(prompt("Choose 0 - rock, 1 - paper, 2 - scissors"));
  if (humanInput >= 0 && humanInput <= 2) {
    playGame(humanInput, getRandomInt(0, 2));
  } else {
    continue_game = confirm(
      "Incorrect choice. Do you want to continue playing?"
    );
    continue;
  }

  continue_game = confirm("Do you want to continue playing?");
}

// Prompt user
