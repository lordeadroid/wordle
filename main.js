class Chances {
  #chances;

  constructor(chances) {
    this.#chances = chances;
  }

  countLeft() {
    this.#chances -= 1;
    return this.#chances;
  }
}

const getTodayWord = () => {
  return "hello";
};

const main = () => {
  const submitButton = document.querySelector("#submit-button");
  const answerBox = document.querySelector("#answer-box");

  const chances = new Chances(2);
  const wordleView = new WordleView(chances, getTodayWord());

  const inputController = new InputController(submitButton, answerBox);
  const wordleController = new WordleController(inputController, wordleView);
  wordleController.start();
};

window.onload = main;
