document.getElementById("Button")
        .addEventListener("click", function() {
  document.getElementById("Correct").hidden = true;
  document.getElementById("Good trial").hidden = false;
}, false);

//$(".submit_wide").click(function () {
 // $(this).val('Please wait..');
 // $(this).attr('disabled', true);
 // setTimeout(function() { 
  //    $(this).attr('disabled', false);
  ///    $(this).val('Submit');
  //}, 2000);});


//const prompt = require('prompt-sync')();
//You gotta download prompt-sync by doing npm i prompt-sync
//var time = prompt("Give time in seconds: ")
//time = parseInt(time)
//setInterval(function(){
   // console.log(time)
    //if(time = 0){
     //   console.log("Time over")
   // }
   // else{
   // time = time - 1}
//}, 1000);
var timeleft = 10;
    var downloadTimer = setInterval(function(){
    timeleft--;
    document.getElementById("countdowntimer").textContent = timeleft;
    if(timeleft <= 0)
        clearInterval(downloadTimer);
    },1000);