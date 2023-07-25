const getRandomWord = () => {
  const words = ["AUDIO", "TABLE", "WHALE", "WATCH", "LIGHT", "WATER", "MOUTH"];
  return words[Math.floor(Math.random() * words.length)];
};

class WordleStorage {
  #storage;

  constructor(storage) {
    this.#storage = storage;
  }

  addWord(word) {
    this.#storage.setItem("word", word);
  }

  addScore(score) {
    this.#storage.setItem("score", score);
  }

  getScore() {
    return this.#storage.getItem("score");
  }

  getWord() {
    return this.#storage.getItem("word");
  }
}

const main = () => {
  const page = document.querySelector("#page");
  const answerBox = document.querySelector("#answer-box");
  const guessContainer = document.querySelector("#guess-container");

  const secretWord = new SecretWord(getRandomWord());
  const wordle = new Wordle(secretWord, 6);
  const wordleView = new WordleView(page, guessContainer);
  const wordleStorage = new WordleStorage(localStorage);

  const inputController = new InputController(answerBox);
  const wordleController = new WordleController(
    inputController,
    wordleView,
    wordle,
    wordleStorage
  );
  wordleController.start();
};

window.onload = main;
