class Chances {
  #chances;

  constructor(chances) {
    this.#chances = chances;
  }

  #updateCount() {
    this.#chances -= 1;
  }

  countLeft() {
    this.#updateCount();
    return this.#chances;
  }
}

class SecretWord {
  #word;

  constructor(word) {
    this.#word = word;
  }

  isEqual(guess) {
    return this.#word === guess;
  }

  generateStats([...guess]) {
    return guess.map((letter, index) => {
      const stats = {};
      stats.letter = letter;
      stats.includes = this.isEqual(letter);
      stats.correctPosition = this.#word[index] === letter;

      return stats;
    });
  }
}

class Wordle {
  #secretWord;
  #letters;
  #stats;
  #hasWon;

  constructor(secretWord) {
    this.#secretWord = secretWord;
  }

  play(guess) {
    this.#letters = [...guess];
    this.#stats = this.#secretWord.generateStats(guess);
    this.#hasWon = this.#secretWord.isEqual(guess);
  }

  status() {
    return {
      letters: this.#letters,
      hasWon: this.#hasWon,
      stats: this.#stats,
    };
  }
}

const main = () => {
  const page = document.querySelector("#page");
  const submitButton = document.querySelector("#submit-button");
  const answerBox = document.querySelector("#answer-box");
  const guessContainer = document.querySelector("#guess-container");

  const chances = new Chances(1);
  const secretWord = new SecretWord("HELLO");
  const wordle = new Wordle(secretWord);
  const wordleView = new WordleView(page, submitButton, guessContainer);

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
