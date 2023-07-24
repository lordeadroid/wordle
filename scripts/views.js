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

  #createLettersElements() {
    const guessElements = document.createElement("div");
    guessElements.classList.add("guess");

    this.#stats.letters.forEach((letter) => {
      const letterElement = document.createElement("div");
      letterElement.innerText = letter;
      letterElement.classList.add("letter", "green");
      guessElements.appendChild(letterElement);
    });

    this.#guessContainer.appendChild(guessElements);
  }

  #renderCorrectGuess() {
    this.#render("Your Guess Is Right");
    this.#createLettersElements();
    this.#renderHint();
    this.#endGame();
    return;
  }

  #renderHint() {}

  #renderIncorrectGuess() {
    this.#createLettersElements();
    this.#renderHint();
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
