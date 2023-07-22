const checkAnswer = (userAnswer) => {
  return userAnswer === "hello";
};

const displayResult = (message) => {
  const page = document.querySelector("#page");
  const resultBox = document.createElement("div");

  resultBox.innerText = message;
  page.appendChild(resultBox);
};

const main = () => {
  const answerBox = document.querySelector("#answer-box");
  const submitButton = document.querySelector("#submit-button");

  submitButton.onclick = () => {
    const userAnswer = answerBox.value;
    answerBox.value = "";
    const result = checkAnswer(userAnswer);

    if (result) {
      displayResult("Your answer was Correct");
      return;
    }
    displayResult("Your Answer Was Incorrect");
  };
};

window.onload = main;
