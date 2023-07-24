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

class Wordle {
  #word;

  constructor(word) {
    this.#word = word;
  }

  noOfMatchedLetters([...guess]) {
    const answer = [...this.#word];
    const matchedLetters = [];

    guess.forEach((char) => {
      const index = answer.indexOf(char);
      if (index !== -1) {
        answer.splice(index, 1);
        matchedLetters.push(char);
      }
    });

    return matchedLetters.length;
  }

  isGuessCorrect(guess) {
    return this.#word === guess;
  }
}

const main = () => {
  const page = document.querySelector("#page");
  const submitButton = document.querySelector("#submit-button");
  const answerBox = document.querySelector("#answer-box");

  const chances = new Chances(1);
  const wordle = new Wordle("HELLO");
  const wordleView = new WordleView(page, submitButton);

  const inputController = new InputController(submitButton, answerBox);
  const wordleController = new WordleController(
    inputController,
    wordleView,
    wordle,
    chances
  );
  wordleController.start();
};

window.onload = main;
