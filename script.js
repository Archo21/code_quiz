//Variables
var startButton=document.getElementById("start-btn")
var timerEl=document.getElementById("timeCountdownText")
var question1=document.getElementById("Question1")
var question2=document.getElementById("Question2")
var question3=document.getElementById("Question3")
var nextButton=document.getElementById("next-btn")
var timer=30
var timerid;
var questionIndex=[question1,question2,question3]
var correctAnswer=["USA","Japan","China"]
var currentQuestionIndex=0
var correctCount=0
var wrongCount=0

//start timer
function timerStart(){
  timer--;
  timerEl.textContent=timer
  if (timer < 0 ){ 
    console.log("quiz is over");
    timerEl.textContent=0
  
  }
}
//Next Question
function nextQuestion(){
  if(questionIndex[currentQuestionIndex-1]){
    var previuosQuestion=questionIndex[currentQuestionIndex-1]
    previuosQuestion.setAttribute("class","hide")
  }

  var currentQuestion=questionIndex[currentQuestionIndex]
  currentQuestion.setAttribute("class","show")
  console.log(currentQuestion);
}
//Selected Ansswer
function selectedAnswer(){
  if ($('input[name="Country"]:checked').val()==correctAnswer[currentQuestionIndex]){
    console.log("Correct");
    correctCount++
  } else{
    console.log("Wrong");
    wrongCount++
    timer=timer-10
  }

  currentQuestionIndex++;
  if(currentQuestionIndex==questionIndex.length){
    questionIndex[currentQuestionIndex-1].hidden=true
    scores()
    clearTimeout(timerid)
  } else {
    nextQuestion()
  }
}
//Display score
function scores(){
  nextButton.textContent = "Quiz is Over Score: " + (correctCount/(correctCount + wrongCount)) * 100 + "%"
}

function quizStart(){
  nextQuestion()
  startButton.setAttribute("class","hide")
  timerid=setInterval(timerStart,1000)
}
startButton.onclick=quizStart
nextButton.onclick=selectedAnswer