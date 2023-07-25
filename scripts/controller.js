class InputController {
  #answerBox;

  constructor(answerBox) {
    this.#answerBox = answerBox;
  }

  start(onEnter) {
    this.#answerBox.onkeydown = (event) => {
      if (event.code === "Enter") {
        const guess = event.target.value.toUpperCase();
        event.target.value = "";
        if (guess.length !== 5) return;
        onEnter(guess);
      }
    };
  }

  stop() {
    this.#answerBox.setAttribute("disabled", "true");
  }
}

class WordleController {
  #inputController;
  #wordleView;
  #wordle;
  #wordleStorage;

  constructor(inputController, wordleView, wordle, wordleStorage) {
    this.#inputController = inputController;
    this.#wordleView = wordleView;
    this.#wordle = wordle;
    this.#wordleStorage = wordleStorage;
  }

  #onEnter(guess) {
    this.#wordle.play(guess);
    const stats = this.#wordle.status();

    const previousState = {
      word: this.#wordleStorage.getWord(),
      score: this.#wordleStorage.getScore(),
    };

    if (stats.isGameOver) {
      this.#inputController.stop();
      this.#wordleStorage.addWord(stats.secretWord);
      this.#wordleStorage.addScore(stats.score);
    }

    this.#wordleView.render(stats, previousState);
  }

  start() {
    this.#inputController.start((userAnswer) => {
      this.#onEnter(userAnswer);
    });
  }
}
