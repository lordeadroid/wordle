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

  onSubmitButtonClick(onReadInput) {
    this.#submitButton.onclick = () => {
      onReadInput(this.#readAnswer());
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

  #readInput(guess) {
    if (this.#wordle.isGuessCorrect(guess)) {
      this.#wordleView.renderCorrectGuess();
      return;
    }

    const matchedLetters = this.#wordle.noOfMatchedLetters(guess);
    this.#wordleView.renderIncorrectGuess(matchedLetters);

    if (this.#chances.countLeft() < 0) {
      this.#wordleView.endGame();
      return;
    }
  }

  start() {
    this.#inputController.onSubmitButtonClick((userAnswer) => {
      this.#readInput(userAnswer);
    });
  }
}
