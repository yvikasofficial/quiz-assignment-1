const questions = [
  {
    question: "What is the value of 2x2?",
    options: ["4", "6", "8", "10"],
    value: "4",
  },
  {
    question: "What is the value of 2%2?",
    options: ["1", "6", "8", "10"],
    value: "1",
  },
  {
    question: "What is the value of 3+3?",
    options: ["0", "6", "8", "10"],
    value: "6",
  },
  {
    question: "What is the value of 4+4?",
    options: ["1", "6", "8", "10"],
    value: "8",
  },
  {
    question: "What is the value of 5+5?",
    options: ["1", "6", "8", "10"],
    value: "10",
  },
  {
    question: "What is the value of 10+10?",
    options: ["1", "6", "8", "20"],
    value: "20",
  },
];

let correctAnswerCount = 0;

let current = 1;
let timer = 15;

document.querySelector(".intro_box_button").addEventListener("click", () => {
  restartQuiz();
});

const generateButtons = () => {
  const statusCountDiv = document.querySelector(".status_count");
  statusCountDiv.innerHTML = "";

  new Array(questions.length).fill(0).forEach((_, i) => {
    const newDiv = document.createElement("div");
    newDiv.className = `status_count_item status_count_item--${i + 1}`;
    newDiv.innerHTML = i + 1;
    statusCountDiv.appendChild(newDiv);
  });
};

const setRed = (i) => {
  document.querySelector(
    `.status_count_item--${i}`
  ).className = `status_count_item status_count_item--${i} red-bg`;
};

const setGreen = (i) => {
  document.querySelector(
    `.status_count_item--${i}`
  ).className = `status_count_item status_count_item--${i} green-bg`;
};

const removeBg = (i) => {
  document.querySelector(
    `.status_count_item--${i}`
  ).className = `status_count_item status_count_item--${i}`;
};

const initQuestions = () => {
  current = 1;

  generateButtons();

  const prevBtn = document.querySelector(".question_action_prev");
  const nextBtn = document.querySelector(".question_action_next");
  const submitBtn = document.querySelector(".status_submit");

  prevBtn.addEventListener("click", prevQuestion);
  nextBtn.addEventListener("click", nextQuestion);
  submitBtn.addEventListener("click", submitQuiz);

  getCurrentQuestion();
};

const getCurrentQuestion = () => {
  const questionTitle = document.querySelector(".question_title");
  const questionOptions = document.querySelector(".question_options");

  questionOptions.innerHTML = "";

  const currentQuestion = questions[current - 1];
  questionTitle.innerHTML = currentQuestion.question;

  currentQuestion.options.forEach((option, i) => {
    const inputEl = document.createElement("input");
    inputEl.type = "radio";
    inputEl.className = "question_input";
    inputEl.id = i;
    inputEl.name = "question";
    inputEl.value = option;

    const labelEl = document.createElement("label");
    labelEl.className = "question_label";
    labelEl.for = i;
    labelEl.innerText = option;

    const brEl = document.createElement("br");

    questionOptions.appendChild(inputEl);
    questionOptions.appendChild(labelEl);
    questionOptions.appendChild(brEl);
  });

  const nextBtn = document.querySelector(".question_action_next");

  const restartBtn = document.querySelector(".model_box_button.restart");
  restartBtn.addEventListener("click", restartQuiz);

  const homeBtn = document.querySelector(".model_box_button.go-home");
  homeBtn.addEventListener("click", goHome);

  if (current === questions.length) {
    nextBtn.className = "question_action_next disabled";
  } else {
    nextBtn.className = "question_action_next";
  }
};

const validateSubmit = () => {
  const checkedInput = document.querySelector('input[name="question"]:checked');
  if (checkedInput) {
    if (checkedInput.value == questions[current - 1].value) {
      correctAnswerCount += 1;
      setGreen(current);
    } else {
      setRed(current);
    }
  } else {
    setRed(current);
  }
};

const nextQuestion = () => {
  validateSubmit();
  timer = 15;
  document.querySelector(".time_count").innerHTML = timer;

  current += 1;
  console.log("Score: ", correctAnswerCount);
  getCurrentQuestion();
};

const submitQuiz = () => {
  timer = 0;
  validateSubmit();
  const modalEl = document.querySelector(".modal");
  modalEl.style.display = "flex";
  const scoreEl = document.querySelector(".score");
  scoreEl.innerHTML = `${correctAnswerCount} out of ${questions.length}`;
};

const prevQuestion = () => {
  current -= 1;
  getCurrentQuestion();
};

const restartQuiz = () => {
  current = 1;
  correctAnswerCount = 0;
  timer = 15;

  generateButtons();

  const modalEl = document.querySelector(".modal");
  modalEl.style.display = "none";

  getCurrentQuestion();

  startQuiz();
};

const startQuiz = () => {
  const introEl = document.querySelector(".intro");
  const homeEl = document.querySelector(".home");

  introEl.style.display = "none";
  homeEl.style.display = "flex";

  counterLoop();
};

const goHome = () => {
  current = 1;
  correctAnswerCount = 0;
  timer = 15;

  generateButtons();

  const introEl = document.querySelector(".intro");
  const homeEl = document.querySelector(".home");
  const modalEl = document.querySelector(".modal");

  introEl.style.display = "flex";
  homeEl.style.display = "none";
  modalEl.style.display = "none";
};

const counterLoop = () => {
  timer -= 1;
  document.querySelector(".time_count").innerHTML = timer;

  setTimeout(() => {
    if (timer === 0) {
      if (current === questions.length) {
        submitQuiz();
      } else {
        nextQuestion();
        counterLoop();
      }
    } else {
      counterLoop();
    }
  }, 1000);
};

initQuestions();
