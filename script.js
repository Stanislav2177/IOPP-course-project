let isTwoPlayersShown = false;
let isThreePlayersShown = false;
let twoPlayersAreShown = false;
let threePlayersAreShown = false;

const buttonStart = document.getElementById("buttonStart");
const twoPlayers = document.getElementById("2Players");

buttonStart.addEventListener("click", function () {
  askPlayerOne();
});

const array = [[], []];

function askPlayerOne() {
  document.getElementById("playerOneAnswer").classList.toggle("hidden");

  const buttonYes = document.querySelector("#buttonFirstPlayerYes");
  const buttonNo = document.querySelector("#buttonFirstPlayerNo");

  buttonYes.onclick = function () {
    array[0][0] = 1;
    console.log("Player 1 confessed");
    disableButtons(buttonYes, buttonNo);
    askPlayerTwo();
  };

  buttonNo.onclick = function () {
    array[0][0] = 0;
    console.log("Player 1 did not confess");
    disableButtons(buttonYes, buttonNo);
    askPlayerTwo();
  };
}

function askPlayerTwo() {
  document.getElementById("playerTwoAnswer").classList.toggle("hidden");

  const buttonYes = document.querySelector("#buttonSecondPlayerYes");
  const buttonNo = document.querySelector("#buttonSecondPlayerNo");

  buttonYes.onclick = function () {
    array[1][0] = 1;
    console.log("Player 2 confessed");
    disableButtons(buttonYes, buttonNo);
    Conclusion();
  };

  buttonNo.onclick = function () {
    array[1][0] = 0;
    console.log("Player 2 did not confess");
    disableButtons(buttonYes, buttonNo);
    Conclusion();
  };
}

function disableButtons(...buttons) {
  buttons.forEach((button) => {
    if (button instanceof HTMLElement) {
      button.setAttribute("disabled", "");
    } else {
      console.warn("Invalid element passed to disableButtons:", button);
    }
  });
}

function Conclusion() {
  const [p1Decision, p2Decision] = [array[0][0], array[1][0]];

  let playerOnePayoff, playerTwoPayoff;

  if (p1Decision === 1 && p2Decision === 1) {
    playerOnePayoff = 5; // И двамата признават
    playerTwoPayoff = 5;
  } else if (p1Decision === 1 && p2Decision === 0) {
    playerOnePayoff = 0; // Играч 1 признава, Играч 2 мълчи
    playerTwoPayoff = 10;
  } else if (p1Decision === 0 && p2Decision === 1) {
    playerOnePayoff = 10; // Играч 1 мълчи, Играч 2 признава
    playerTwoPayoff = 0;
  } else {
    playerOnePayoff = 2; // И двамата мълчат
    playerTwoPayoff = 2;
  }

  console.log("Game Over!");
  console.log(`Player 1 payoff: ${playerOnePayoff} years in prison`);
  console.log(`Player 2 payoff: ${playerTwoPayoff} years in prison`);

  alert(
    `Player 1 payoff: ${playerOnePayoff} years in prison\nPlayer 2 payoff: ${playerTwoPayoff} years in prison`
  );

  document.getElementById("logicExplanation").classList.remove("hidden");

  document.getElementById("explanationPlayerOne").innerHTML =
    "1. <strong>Функция askPlayerOne:</strong><br>" +
    "- Първият играч вижда два бутона: Признай и Не признавай.<br>" +
    "- Ако натисне Признай, записваме в масива array[0][0] = 1.<br>" +
    "- Ако натисне Не признавай, записваме в масива array[0][0] = 0.<br>" +
    "- След избора бутоните на Играч 1 се деактивират и програмата преминава към Играч 2.";

  document.getElementById("explanationPlayerTwo").innerHTML =
    "2. <strong>Функция askPlayerTwo:</strong><br>" +
    "- Вторият играч също вижда два бутона: Признай и Не признавай.<br>" +
    "- Ако натисне Признай, записваме в масива array[1][0] = 1.<br>" +
    "- Ако натисне Не признавай, записваме в масива array[1][0] = 0.<br>" +
    "- След избора бутоните на Играч 2 се деактивират и се изчислява резултатът.";

  document.getElementById("explanationConclusion").innerHTML =
    "3. <strong>Функция Conclusion:</strong><br>" +
    "- Резултатът се изчислява въз основа на избора на двамата играчи:<br>" +
    "  • Ако и двамата признаят (1, 1): И двамата получават 5 години затвор.<br>" +
    "  • Ако Играч 1 признае, а Играч 2 мълчи (1, 0): Играч 1 остава свободен, а Играч 2 получава 10 години.<br>" +
    "  • Ако Играч 1 мълчи, а Играч 2 признава (0, 1): Играч 1 получава 10 години, а Играч 2 остава свободен.<br>" +
    "  • Ако и двамата мълчат (0, 0): И двамата получават 2 години затвор.<br>" +
    "- Програмата логва резултатите в конзолата и показва съобщение с наказанията за двамата играчи.";
}
