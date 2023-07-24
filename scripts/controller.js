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

  constructor(inputController, wordleView, wordle) {
    this.#inputController = inputController;
    this.#wordleView = wordleView;
    this.#wordle = wordle;
  }

  onSubmitButtonClick(guess) {
    this.#wordle.play(guess);
    const stats = this.#wordle.status();
    this.#wordleView.render(stats);
  }

  start() {
    this.#inputController.start((userAnswer) => {
      this.onSubmitButtonClick(userAnswer);
    });
  }
}
