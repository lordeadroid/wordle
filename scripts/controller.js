class InputController {
  #submitButton;
  #answerBox;

  constructor(submitButton, answerBox) {
    this.#submitButton = submitButton;
    this.#answerBox = answerBox;
  }

  #readAnswer() {
    const answer = this.#answerBox.value.toUpperCase();
    this.#answerBox.value = "";
    return answer;
  }

  start(onSubmitButtonClick) {
    this.#submitButton.onclick = () => {
      onSubmitButtonClick(this.#readAnswer());
    };
  }
}

class WordleController {
  #inputController;
  #wordleView;
  #wordle;
  #chances;

  constructor(inputController, wordleView, wordle, chances) {
    this.#inputController = inputController;
    this.#wordleView = wordleView;
    this.#wordle = wordle;
    this.#chances = chances;
  }

  onSubmitButtonClick(guess) {
    this.#wordle.play(guess);
    const stats = this.#wordle.status();
    this.#wordleView.renderResult(stats);
  }

  start() {
    this.#inputController.start((userAnswer) => {
      this.onSubmitButtonClick(userAnswer);
    });
  }
}
