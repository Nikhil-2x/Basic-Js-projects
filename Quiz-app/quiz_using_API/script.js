document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector("#start-btn");
  const nextBtn = document.querySelector("#next-btn");
  const restartBtn = document.querySelector("#restart-btn");
  const questionContainer = document.querySelector("#question-container");
  const questionText = document.querySelector("#question-text");
  const choicesList = document.querySelector("#choices-list");
  const resultContainer = document.querySelector("#result-container");
  const scoreDisplay = document.querySelector("#score");

  let questions = [];
  let currentQuesIndex = 0;
  let score = 0;

  fetch("https://the-trivia-api.com/api/questions?limit=10")
    .then((response) => response.json())
    .then((data) => {
      questions = data;

      startBtn.addEventListener("click", startQuiz);

      nextBtn.addEventListener("click", () => {
        currentQuesIndex++;
        if (currentQuesIndex < questions.length) {
          const selectedOptions = document.querySelectorAll("li.selected");
          selectedOptions.forEach((option) =>
            option.classList.remove("selected")
          );
        //   startQuestion();
          startQuestion();
        } else {
          showRes();
        }
      });

      function startQuiz() {
        startBtn.classList.add("hidden");
        questionContainer.classList.remove("hidden");
        startQuestion();
      }

      function startQuestion() {
        nextBtn.classList.add("hidden");
        questionText.textContent = questions[currentQuesIndex].question;
        choicesList.innerHTML = "";
        questions[currentQuesIndex].incorrectAnswers.forEach((choice) => {
          const li = document.createElement("li");
          li.textContent = choice;
          li.addEventListener("click", () => selectAns(choice));
          choicesList.appendChild(li);
        });
        const correctAns = document.createElement("li");
        correctAns.textContent = questions[currentQuesIndex].correctAnswer;
        correctAns.addEventListener("click", () =>
          selectAns(questions[currentQuesIndex].correctAnswer)
        );
        choicesList.appendChild(correctAns);
      }

      function selectAns(choice) {
        const correctAns = questions[currentQuesIndex].correctAnswer;
        const options = document.querySelectorAll("li");
        options.forEach((option) => {
          if (option.textContent === choice) {
            option.classList.add("selected");
            if (choice === correctAns) {
              score++;
            }
          }
        });
        nextBtn.classList.remove("hidden");
      }

      function showRes() {
        questionContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");
        scoreDisplay.textContent = `${score} out of ${questions.length}`;
      }

      restartBtn.addEventListener("click", () => {
        score = 0;
        currentQuesIndex = 0;
        resultContainer.classList.add("hidden");
        startQuiz();
      });
    })
    .catch((error) => {
      console.error(error);
    });
});
