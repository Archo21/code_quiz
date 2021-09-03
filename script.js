var startButton=document.getElementById("start-btn")
var timerEl=document.getElementById("timeCountdownText")
var question1=document.getElementById("Question1")
var question2=document.getElementById("Question2")
var question3=document.getElementById("Question3")
var nextButton=document.getElementById("next-btn")
var timer=50
var timerid;
var questionIndex=[question1,question2,question3]
var correctAnswer=["USA","Japan","China"]
var currentQuestionIndex=0
function timerStart(){

 timer--;
  timerEl.textContent=timer
  if (timer <=0){
     
    console.log("quiz is over")
  }
}
function nextQuestion(){
if(questionIndex[currentQuestionIndex-1]){
  var previuosQuestion=questionIndex[currentQuestionIndex-1]
previuosQuestion.setAttribute("class","hide")
}
var currentQuestion=questionIndex[currentQuestionIndex]
currentQuestion.setAttribute("class","show")
console.log(currentQuestion);
}
function selectedAnswer(){
  if ($('input[name="Country"]:checked').val()==correctAnswer[currentQuestionIndex]){
    console.log("Correct");

  }
else{
  console.log("Wrong");
}
currentQuestionIndex++;
if(currentQuestionIndex===questionIndex.length){
  
  quizEnd();
  
}
else{

  nextQuestion()
}
}

//quiz start
function quizStart(){
  nextQuestion()
  startButton.setAttribute("class","hide")
  timerid=setInterval(timerStart,1000)
}
startButton.onclick=quizStart
nextButton.onclick=selectedAnswer