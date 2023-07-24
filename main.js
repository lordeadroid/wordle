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
  #guesses;
  #letters;
  #chances;
  #stats;
  #hasWon;
  #letterPresents;
  #score;

  constructor(secretWord, chances) {
    this.#secretWord = secretWord;
    this.#chances = chances;
    this.#guesses = [];
    this.#score;
  }

  play(guess) {
    this.#guesses.push(guess);
    this.#letters = [...guess];
    this.#stats = this.#secretWord.generateStats(guess);
    this.#hasWon = this.#secretWord.isEqual(guess);
    this.#score = (this.#chances - this.#guesses.length + 1) * 10;
    this.#letterPresents = this.#stats.reduce((count, letter) => {
      if (letter.includes) {
        count += 1;
      }
      return count;
    }, 0);
  }

  status() {
    return {
      letters: this.#letters,
      hasWon: this.#hasWon,
      stats: this.#stats,
      letterPresents: this.#letterPresents,
      chancesLeft: this.#chances - this.#guesses.length,
      score: this.#score,
    };
  }
}

const main = () => {
  const page = document.querySelector("#page");
  const submitButton = document.querySelector("#submit-button");
  const answerBox = document.querySelector("#answer-box");
  const guessContainer = document.querySelector("#guess-container");

  const secretWord = new SecretWord("HELLO");
  const wordle = new Wordle(secretWord, 5);
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
