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
      stats.includes = this.#word.includes(letter);
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
  #letterPresents;

  constructor(secretWord) {
    this.#secretWord = secretWord;
  }

  play(guess) {
    this.#letters = [...guess];
    this.#stats = this.#secretWord.generateStats(guess);
    this.#hasWon = this.#secretWord.isEqual(guess);
    this.#letterPresents = this.#stats.reduce((count, letter) => {
      if (letter.includes) count++;
      return count;
    }, 0);
  }

  status() {
    return {
      letters: this.#letters,
      hasWon: this.#hasWon,
      stats: this.#stats,
      letterPresents: this.#letterPresents,
    };
  }
}

const main = () => {
  const page = document.querySelector("#page");
  const submitButton = document.querySelector("#submit-button");
  const answerBox = document.querySelector("#answer-box");
  const guessContainer = document.querySelector("#guess-container");

  const secretWord = new SecretWord("HELLO");
  const wordle = new Wordle(secretWord);
  const wordleView = new WordleView(page, submitButton, guessContainer);

  const inputController = new InputController(submitButton, answerBox);
  const wordleController = new WordleController(
    inputController,
    wordleView,
    wordle
  );
  wordleController.start();
};

window.onload = main;
