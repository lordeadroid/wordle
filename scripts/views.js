class WordleView {
  #page;
  #submitButton;

  constructor(page, submitButton) {
    this.#page = page;
    this.#submitButton = submitButton;
  }

  #renderResult(message) {
    const resultBox = document.createElement("div");
    resultBox.innerText = message;
    this.#page.appendChild(resultBox);
  }

  renderCorrectGuess() {
    this.#renderResult("Your Guess Is Right");
    this.#disableSaveButton();
    return;
  }

  renderIncorrectGuess(matchedLetters) {
    this.#renderResult("Your Guess Is Wrong");
    this.#renderResult(`${matchedLetters} Letters Matched`);
    return;
  }

  endGame() {
    this.#renderResult("Game Over");
    this.#disableSaveButton();
  }

  #disableSaveButton() {
    this.#submitButton.setAttribute("disabled", "true");
  }
}
