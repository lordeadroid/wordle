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
        onEnter(guess);
      }
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

  onEnter(guess) {
    this.#wordle.play(guess);
    const stats = this.#wordle.status();
    this.#wordleView.render(stats);
  }

  start() {
    this.#inputController.start((userAnswer) => {
      this.onEnter(userAnswer);
    });
  }
}
