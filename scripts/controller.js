class InputController {
  #submitButton;
  #answerBox;

  constructor(submitButton, answerBox) {
    this.#submitButton = submitButton;
    this.#answerBox = answerBox;
  }

  #readAnswer() {
    const answer = this.#answerBox.value;
    this.#answerBox.value = "";
    return answer;
  }

  onSubmitButtonClick(takeInput) {
    this.#submitButton.onclick = () => {
      takeInput(this.#readAnswer());
    };
  }
}

class WordleController {
  #inputController;
  #wordleView;

  constructor(inputController, wordleView) {
    this.#inputController = inputController;
    this.#wordleView = wordleView;
  }

  #takeInput(userAnswer) {
    this.#wordleView.render(userAnswer);
  }

  start() {
    this.#inputController.onSubmitButtonClick((userAnswer) => {
      this.#takeInput(userAnswer);
    });
  }
}
