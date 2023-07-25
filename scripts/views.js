class WordleView {
  #page;
  #answerBox;
  #guessWordContainer;
  #stats;

  constructor(page, answerBox, guessWordContainer) {
    this.#page = page;
    this.#answerBox = answerBox;
    this.#guessWordContainer = guessWordContainer;
    this.#stats;
  }

  #renderMessage(message) {
    const resultBox = document.createElement("div");
    resultBox.innerText = message;
    this.#page.appendChild(resultBox);
  }

  #addHint(letterElement, letterStat) {
    if (letterStat.correctPosition) {
      letterElement.classList.add("green");
      return;
    }

    if (letterStat.includes) {
      letterElement.classList.add("yellow");
    }
  }

  #createLetterElement(letter) {
    const letterElement = document.createElement("div");
    letterElement.innerText = letter;
    letterElement.classList.add("letter");

    return letterElement;
  }

  #renderLetters() {
    const guessedLetterElements = document.createElement("div");
    guessedLetterElements.classList.add("guess");

    this.#stats.letterStats.forEach((letterStat) => {
      const letterElement = this.#createLetterElement(letterStat.letter);
      this.#addHint(letterElement, letterStat);
      guessedLetterElements.appendChild(letterElement);
    });

    this.#guessWordContainer.appendChild(guessedLetterElements);
  }

  #endGame() {
    this.#renderMessage(`Score: ${this.#stats.score}`);
    this.#answerBox.setAttribute("disabled", "true");
  }

  render(stats) {
    this.#stats = stats;
    this.#renderLetters();

    if (this.#stats.hasWon) {
      this.#endGame();
      return;
    }

    if (this.#stats.chancesLeft <= 0) {
      this.#endGame();
    }
  }
}
