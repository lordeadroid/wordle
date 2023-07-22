const getTodayWord = () => {
  return "hello";
};

const checkAnswer = (userAnswer) => {
  return userAnswer === getTodayWord();
};

const renderResult = (message) => {
  const page = document.querySelector("#page");
  const resultBox = document.createElement("div");

  resultBox.innerText = message;
  page.appendChild(resultBox);
};

const getUserAnswer = () => {
  const answerBox = document.querySelector("#answer-box");
  const answer = answerBox.value;
  answerBox.value = "";
  return answer;
};

const stopGame = () => {
  const submitButton = document.querySelector("#submit-button");
  submitButton.setAttribute("disabled", "true");
  return;
};

const startGame = (chancesLeft) => {
  const userAnswer = getUserAnswer();
  const result = checkAnswer(userAnswer);

  if (result) {
    renderResult("Your answer Was Correct");
    stopGame();
    return;
  }

  renderResult("Your Answer Was Incorrect");

  if (chancesLeft.count() === 0) {
    renderResult("all chances are over");
    stopGame();
    return;
  }
};

class Chances {
  #chances;

  constructor() {
    this.#chances = 2;
  }

  count() {
    this.#chances -= 1;
    return this.#chances;
  }
}

const main = () => {
  const submitButton = document.querySelector("#submit-button");
  const chancesLeft = new Chances();

  submitButton.onclick = () => startGame(chancesLeft);
};

window.onload = main;
