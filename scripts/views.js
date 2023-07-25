class WordleView {
  #page;
  #guessWordContainer;

  constructor(page, guessWordContainer) {
    this.#page = page;
    this.#guessWordContainer = guessWordContainer;
  }

  #renderEndGame(stats) {
    const resultBox = document.createElement("div");
    resultBox.id = "result-box";
    resultBox.innerText = `Word: ${stats.secretWord}\nScore: ${stats.score}`;
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

  #renderPreviousState(state) {
    const previousState = document.querySelector("#previous-state");
    previousState.innerText = `${state.word}\n${state.score}`;
  }

  render(stats, previousState) {
    this.#renderLetters(stats);
    this.#renderPreviousState(previousState);

    if (stats.isGameOver) {
      this.#renderEndGame(stats);
    }
  }
}
