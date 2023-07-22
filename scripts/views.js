class WordleView {
  #chances;
  #word;

  constructor(chances, word) {
    this.#chances = chances;
    this.#word = word;
  }

  render(userAnswer) {
    if (userAnswer === this.#word) {
      this.#renderResult("Your Guess Is Right");
      this.#disableSaveButton();
      return;
    }

    this.#renderResult("Your Answer Was Incorrect");
    this.#renderResult(
      `${getMatchedLetters(userAnswer)} letters matched with the word`
    );

    if (this.#chances.countLeft() === 0) {
      this.#renderResult("all chances are over");
      this.#disableSaveButton();
      return;
    }
  }

  #renderResult(message) {
    const page = document.querySelector("#page");
    const resultBox = document.createElement("div");

    resultBox.innerText = message;
    page.appendChild(resultBox);
  }

  #disableSaveButton() {
    const submitButton = document.querySelector("#submit-button");
    submitButton.setAttribute("disabled", "true");
  }
}
