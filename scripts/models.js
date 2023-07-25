class SecretWord {
  #word;

  constructor(word) {
    this.#word = word;
  }

  isEqual(guess) {
    return this.#word === guess;
  }

  #getWordFrequency() {
    return [...this.#word].reduce((frequency, letter) => {
      return { ...frequency, [letter]: frequency[letter] + 1 || 1 };
    }, {});
  }

  generateStats([...guess]) {
    const wordFrequency = this.#getWordFrequency();

    const stats = guess.map((letter, index) => {
      const letterStats = {
        letter: letter,
        correctPosition: false,
        includes: false,
      };

      if (letter === this.#word[index]) {
        letterStats.correctPosition = true;
        wordFrequency[letter] -= 1;
      }

      return letterStats;
    });

    stats.forEach((letterStats) => {
      if (wordFrequency[letterStats.letter] > 0) {
        letterStats.includes = true;
        wordFrequency[letterStats.letter] -= 1;
      }
    });

    return stats;
  }

  get word() {
    return this.#word;
  }
}

class Wordle {
  #secretWord;
  #guesses;
  #chances;
  #stats;
  #hasWon;
  #score;
  #AreChancesLeft;

  constructor(secretWord, chances) {
    this.#secretWord = secretWord;
    this.#chances = chances;
    this.#guesses = [];
    this.#score = 0;
  }

  play(guess) {
    this.#guesses.push(guess);
    this.#stats = this.#secretWord.generateStats(guess);
    this.#hasWon = this.#secretWord.isEqual(guess);
    this.#score = (this.#chances - this.#guesses.length + 1) * 10;
    this.#AreChancesLeft = this.#chances - this.#guesses.length === 0;
  }

  status() {
    return {
      secretWord: this.#secretWord.word,
      letterStats: this.#stats,
      isGameOver: this.#hasWon || this.#AreChancesLeft,
      score: this.#score,
    };
  }
}
