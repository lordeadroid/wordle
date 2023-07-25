class WordleView {
  #page;
  #answerBox;
  #guessWordContainer;

  constructor(page, answerBox, guessWordContainer) {
    this.#page = page;
    this.#answerBox = answerBox;
    this.#guessWordContainer = guessWordContainer;
  }

  #renderMessage(message) {
    const resultBox = document.createElement("div");
    resultBox.id = "result-box";
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

  #renderLetters(stats) {
    const guessedLetterElements = document.createElement("div");
    guessedLetterElements.classList.add("guess");

    stats.letterStats.forEach((letterStat) => {
      const letterElement = this.#createLetterElement(letterStat.letter);
      this.#addHint(letterElement, letterStat);
      guessedLetterElements.appendChild(letterElement);
    });

    this.#guessWordContainer.appendChild(guessedLetterElements);
  }

  #endGame(stats) {
    this.#renderMessage(`Score: ${stats.score}`);
    this.#answerBox.setAttribute("disabled", "true");
  }

  render(stats) {
    this.#renderLetters(stats);

    if (stats.isGameOver) {
      this.#endGame(stats);
      return;
    }
  }
}
