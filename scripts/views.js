class WordleView {
  #page;
  #submitButton;
  #guessContainer;
  #stats;

  constructor(page, submitButton, guessContainer) {
    this.#page = page;
    this.#submitButton = submitButton;
    this.#guessContainer = guessContainer;
    this.#stats = [];
  }

  #render(message) {
    const resultBox = document.createElement("div");
    resultBox.innerText = message;
    this.#page.appendChild(resultBox);
  }

  #renderLetters() {
    const guessElement = document.createElement("div");
    guessElement.classList.add("guess");

    this.#stats.letters.forEach((letter) => {
      const letterElement = document.createElement("div");
      letterElement.innerText = letter;
      guessElement.appendChild(letterElement);
    });

    this.#guessContainer.appendChild(guessElement);
  }

  #renderCorrectGuess() {
    this.#render("Your Guess Is Right");
    this.#renderLetters();
    this.#endGame();
    return;
  }

  #renderIncorrectGuess() {
    this.#renderLetters();
    return;
  }

  renderResult(stats) {
    this.#stats = stats;

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
