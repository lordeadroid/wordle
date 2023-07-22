const checkAnswer = (userAnswer) => {
  return userAnswer === "hello";
};

const main = () => {
  const answerBox = document.querySelector("#answer-box");
  const submitButton = document.querySelector("#submit-button");

  submitButton.onclick = () => {
    const userAnswer = answerBox.value;
    const result = checkAnswer(userAnswer);

    if (result) {
      const page = document.querySelector("#page");
      const answerElement = document.createElement("div");
      answerElement.innerText = "Your Guess Is Correct";
      page.appendChild(answerElement);
    }
  };
};

window.onload = main;
