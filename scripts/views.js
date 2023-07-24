class WordleView {
  #page;
  #submitButton;
  #guessContainer;
  #stats;
  #guessElements;

  constructor(page, submitButton, guessContainer) {
    this.#page = page;
    this.#submitButton = submitButton;
    this.#guessContainer = guessContainer;
    this.#stats;
  }

  #render(message) {
    const resultBox = document.createElement("div");
    resultBox.innerText = message;
    this.#page.appendChild(resultBox);
  }

  #appendHint(letterElement, letterStat) {
    if (letterStat.correctPosition) {
      letterElement.classList.add("green");
      return;
    }
    if (letterStat.includes) {
      letterElement.classList.add("yellow");
      return;
    }
  }

  #createLettersElements() {
    const guessElements = document.createElement("div");
    guessElements.classList.add("guess");

    this.#stats.stats.forEach((letterStat) => {
      const letterElement = document.createElement("div");
      letterElement.innerText = letterStat.letter;
      letterElement.classList.add("letter");
      this.#appendHint(letterElement, letterStat);
      guessElements.appendChild(letterElement);
    });

    this.#guessContainer.appendChild(guessElements);
  }

  #renderCorrectGuess() {
    this.#render("Your Guess Is Right");
    this.#createLettersElements();
    this.#endGame();
    return;
  }

  #renderIncorrectGuess() {
    this.#createLettersElements();
    return;
  }

  renderResult(stats) {
    this.#stats = stats;
    if (stats.countLeft === 0) {
      this.#endGame();
      return;
    }

    if (this.#stats.hasWon) {
      this.#renderCorrectGuess();
      return;
    }
    this.#renderIncorrectGuess();
    return;
  }

  #endGame() {
    this.#render("Game Over");
    this.#disableSaveButton();
  }

  #disableSaveButton() {
    this.#submitButton.setAttribute("disabled", "true");
  }
}
