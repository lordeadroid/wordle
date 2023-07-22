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

const getMatchedLetters = ([...userAnswer]) => {
  const notMatchedLetters = _.difference(userAnswer, [...getTodayWord()]);
  return _.difference(userAnswer, notMatchedLetters).length;
};

const startGame = (chance) => {
  const userAnswer = getUserAnswer();
  const result = checkAnswer(userAnswer);

  if (result) {
    renderResult("Your answer Was Correct");
    stopGame();
    return;
  }

  renderResult("Your Answer Was Incorrect");
  renderResult(
    `${getMatchedLetters(userAnswer)} letters matched with the word`
  );

  if (chance.countLeft() === 0) {
    renderResult("all chances are over");
    stopGame();
    return;
  }
};

class Chance {
  #chances;

  constructor() {
    this.#chances = 2;
  }

  countLeft() {
    this.#chances -= 1;
    return this.#chances;
  }
}

const main = () => {
  const submitButton = document.querySelector("#submit-button");
  const chance = new Chance();

  submitButton.onclick = () => startGame(chance);
};

window.onload = main;
