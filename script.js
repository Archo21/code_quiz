
let timeEl = document.querySelector(".time");
let secondsLeft = 75;
let scoreEl = document.querySelector("#score");
// sections
// section intro
const introEl = document.querySelector("#intro");
// section questions
//question section
const questionsEl = document.querySelector("#questions");
//where question goes
let questionEl = document.querySelector("#question");
// how many questions they have answered
let questionCount = 0;
// div yaynay
const yaynayEl = document.querySelector("#yaynay");
// section final
const finalEl = document.querySelector("#final");
// user initials
let initialsInput = document.querySelector("#initials");
// section highscores
const highscoresEl = document.querySelector("#highscores");
let displayHighScore = false;
// ordered list
let scoreListEl = document.querySelector("#score-list");
// array of scores
let scoreList = [];
// buttons
// start
const startBtn = document.querySelector("#start");
// answer button class
const ansBtn = document.querySelectorAll("button.ansBtn");
// answer1
const ans1Btn = document.querySelector("#answer1");
// answer2
const ans2Btn = document.querySelector("#answer2");
// answer3
const ans3Btn = document.querySelector("#answer3");
// answer4
const ans4Btn = document.querySelector("#answer4");
// submit-score
const submitScrBtn = document.querySelector("#submit-score");
// goback
const goBackBtn = document.querySelector("#goback");
// clearscores
const clearScrBtn = document.querySelector("#clearscores");
// view-scores
const viewScrBtn = document.querySelector("#view-scores");
// Object for question, answer, true/false
const questions = [
  // array of objects
  {
    question: "Which country is leading in long distance races in the world",
    answers: ["1.Kenya ", "2. Ethiopia", "3. Great Brintain", "4. USA"],
    correctAnswer: 1,
  },
  {
    question: "Which country lead in olympic  medal count in 2021?",
    answers: ["1. China", "2. USA", "3. Japan", "4. Great Britain"],
    correctAnswer: 2,
  },
  {
    question: "Which country hosted olympic in 2021?.",
    answers: ["1. Jamaica", "2. Angola", "3. Japan", "4. China"],
    correctAnswer: 3,
  },
  {
    question: "Which country was second in medal count in olympic 2021?.",
    answers: ["1. USA", "2. Kenya", "3. Japan", "4. China"],
    correctAnswer: 4,
  },
  // question: "Which continent lead in long Distance races in the world ?.",
  // answers: ["1. Asia", "2. North America", "3. Africa", "4. South America"],
  // correctAnswer: "4"
];
// Functions
// timer
function setTime() {
  let timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = `Time:${secondsLeft}s`;
    if (secondsLeft === 0 || questionCount === questions.length) {
      clearInterval(timerInterval);
      questionsEl.style.display = "none";
      finalEl.style.display = "block";
      scoreEl.textContent = secondsLeft;
    }
  }, 1000);
}
// start quiz with timer and set up questions
function startQuiz() {
  //introEl.style.display = "inline block";
  questionsEl.style.display = "block";
  questionCount = 0;
  setTime();
  setQuestion(questionCount);
}
// function to set question; takes in a count and displays the next question/answers
function setQuestion(id) {
  if (id < questions.length) {
    questionEl.textContent = questions[id].question;
    ans1Btn.textContent = questions[id].answers[0];
    ans2Btn.textContent = questions[id].answers[1];
    ans3Btn.textContent = questions[id].answers[2];
    ans4Btn.textContent = questions[id].answers[3];
  }
  if (id === questions.length) {
    endQuiz();
  }
}
// function to check answer and then move to next question
function checkAnswer(event) {
  event.preventDefault();
  // show section for yaynay and append message
  yaynayEl.style.display = "block";
  let p = document.createElement("p");
  yaynayEl.appendChild(p);
  // time out after 1 second
  setTimeout(function () {
    p.style.display = "none";
  }, 500);
  // answer checker
  if (
    questions[questionCount].correctAnswer ===
    parseInt(event.target.value) + 1
  ) {
    p.textContent = "Correct!";
  } else if (
    questions[questionCount].correctAnswer !== parseInt(event.target.value + 1)
  ) {
    secondsLeft = secondsLeft - 10;
    p.textContent = "Wrong!";
  }
  // increment so the questions index is increased
  if (questionCount < questions.length) {
    questionCount++;
  }
  // call setQuestion to bring in next question when any ansBtn is clicked
  setQuestion(questionCount);
}
function endQuiz() {
  questionEl.style.display = "none";
  addScore();
}
function addScore() {
  var initials = initialsInput.value.trim();
  console.log(initials);
  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var scoreList = JSON.parse(window.localStorage.getItem("scoreList")) || [];
    // format new score object for current user
    var newScore = {
      score: secondsLeft,
      initials: initials,
    };
    // save to localstorage
    scoreList.push(newScore);
    window.localStorage.setItem("scoreList", JSON.stringify(scoreList));
    //   event.preventDefault();
  }
  finalEl.style.display = "none";
  highscoresEl.style.display = "block";
  printHighscores();
}
function printHighscores() {
  scoreListEl.innerHTML = "";
  // either get scores from localstorage or set to empty array
  var scoreList = JSON.parse(window.localStorage.getItem("scoreList")) || [];
  if (scoreList.length === 0) {
    scoreListEl.innerHTML = "<p> No scores to display yet! <p>";
  }
  // sort highscores by score property in descending order
  scoreList.sort(function (a, b) {
    return b.score - a.score;
  });
  for (let i = 0; i < scoreList.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
    scoreListEl.append(li);
  }
  displayHighScore = true;
}
// clear scores
function clearScores() {
  localStorage.clear();
  scoreListEl.innerHTML = "";
  window.location.reload();
}
// EventListeners
// Start timer and display first question when click start quiz
startBtn.addEventListener("click", startQuiz);
// Check answers loop
ansBtn.forEach((item) => {
  item.addEventListener("click", checkAnswer);
});
// Add score
submitScrBtn.addEventListener("click", addScore);
// Go Back Button
goBackBtn.addEventListener("click", function () {
  window.location.reload();
  highscoresEl.style.display = "none";
  introEl.style.display = "block";
  secondsLeft = 75;
  timeEl.textContent = `Time:${secondsLeft}s`;
});
// Clear the scores
clearScrBtn.addEventListener("click", clearScores);
// View/Hide High Scores Button
viewScrBtn.addEventListener("click", function () {
  if (displayHighScore === false) {
    highscoresEl.style.display = "block";
    displayHighScore = true;
    printHighscores();
  } else if (displayHighScore === true) {
    highscoresEl.style.display = "none";
    displayHighScore = false;
  }
});
function checkForEnter(e) {
  if (e.key === "Enter") {
    addScore();
  }
}
initialsInput.onkeyup = checkForEnter;