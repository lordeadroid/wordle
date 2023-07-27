class WordleView {
  #page;
  #guessWordContainer;

  constructor(page, guessWordContainer) {
    this.#page = page;
    this.#guessWordContainer = guessWordContainer;
  }

  #renderGameStats(stats) {
    const resultBox = document.createElement("div");
    resultBox.id = "result-box";
    resultBox.innerText = `Score: ${stats.score}`;
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
    letterElement.classList.add("tile");

    return letterElement;
  }

  #renderLetters(stats) {
    const guessedLetterElements = document.createElement("div");
    guessedLetterElements.classList.add("row");

    stats.letterStats.forEach((letterStat) => {
      const letterElement = this.#createLetterElement(letterStat.letter);
      this.#addHint(letterElement, letterStat);
      guessedLetterElements.appendChild(letterElement);
    });

    this.#guessWordContainer.appendChild(guessedLetterElements);
  }

  #renderPreviousStats(state) {
    const previousState = document.querySelector("#game-stats");
    previousState.innerText = `Last Word: ${state.word} Score: ${state.score}`;
  }

  render(stats, previousStats) {
    this.#renderLetters(stats);
    this.#renderPreviousStats(previousStats);

    if (stats.isGameOver) {
      this.#renderGameStats(stats);
    }
  }
}
