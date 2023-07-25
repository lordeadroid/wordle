const getRandomWord = () => {
  const words = ["AUDIO", "TABLE", "WHALE", "WATCH", "LIGHT"];
  return words[Math.floor(Math.random() * words.length)];
};

const main = () => {
  const page = document.querySelector("#page");
  const answerBox = document.querySelector("#answer-box");
  const guessContainer = document.querySelector("#guess-container");

  const secretWord = new SecretWord(getRandomWord);
  const wordle = new Wordle(secretWord, 6);
  const wordleView = new WordleView(page, answerBox, guessContainer);

  const inputController = new InputController(answerBox);
  const wordleController = new WordleController(
    inputController,
    wordleView,
    wordle
  );
  wordleController.start();
};

window.onload = main;
