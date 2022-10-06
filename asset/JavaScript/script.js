/** Set the time to zero */
var timer = 76;
var timeCount;

/** Once the quiz starts the timer begins. */
function setupTimer() {
    timeCount = setInterval(function () {
        timer--;
        var timeReset = timeElement.textContent = "Time:" + " " + timer;
       timer = timer;
        if (timer <= 0) {         
            clearInterval(timeCount);
              
            timeElement.textContent = timeReset;
             
        }
    }, 1000)
}
 
/**  Hides the quiz button and starts the timer. */
document.addEventListener("click", function (event) {
    if (event.target === btnElement) {
        wrapperElement.style.display = "none";
        setupTimer()
        displayQuestions();
    }

})
 
var i = 0;

function onclickHandler(event) {
     
    if(timer<=0){
        clearInterval(timeCount);
        divContEL.style.display="none";
        displayResult();
    }
    var answerText = event.target.textContent 
    if (answerText === questions[i].answer) {
        timer = timer;
        responsDiv.setAttribute("style", "color: green")
        responsDiv.textContent = "Correct";
    } else {

        responsDiv.setAttribute("style", "color: red")
        responsDiv.textContent = "Wrong";
        timer = timer - 15;
     } 
     
    if (i < questions.length-1) {

      i++;

      setTimeout(function () {
      displayQuestions();
      responsDiv.textContent = "";
    }, 1000)
    }else {
        setTimeout(function () {
            responsDiv.textContent = "";
            displayResult();
            clearInterval(timeCount);
          
        }, 500)
    

        divContEL.innerHTML = '';
     }
     
    /** This willd display the users final score. */
    function displayResult() {
        finishDiv.style.visibility = "visible";
        timeElement.textContent = "Time:" + " " + timer;
        var HighScore = timer;
        finalScore.textContent = "Your finally score is: " + HighScore;
        localStorage.setItem("HighScore", HighScore)
        const initialScore = localStorage.getItem("HighScores")
        if (!initialScore) {
            const scores = JSON.stringify([HighScore])
            localStorage.setItem("HighScores", scores);
            console.log(scores)
        }
        else {
            const allScores = JSON.parse(initialScore) 
            console.log(allScores)
            allScores.push(HighScore)
            localStorage.setItem("HighScores", JSON.stringify(allScores));
            console.log("HighScores")

        }
    }
}

/** This will show the last page. */
function renderLastItem() {
    var yourScore = localStorage.getItem("HighScores");
     var yourInitial = localStorage.getItem("Initial");
     if (yourScore && yourInitial === "") {
        return
    }
    finishDiv.textContent = "";
    var finaPageEl = document.querySelector(".final-page");
    finaPageEl.style.visibility = "visible";
    var initialAndScore = document.querySelector("#staticEmail");
    initialAndScore.value = yourInitial + ":" + " " + yourScore;

}
 
//** getItem and setItem will save values to localStorage. */
document.addEventListener("submit", function (event) {
    event.preventDefault();
    var initialInput = document.querySelector("#inputInitial").value;
    if (initialInput === "") {
        errMsg.setAttribute("style", "color: red")
        errMsg.textContent = "Initial input field cannot be empty"
    } else {
        errMsg.textContent = "";
        localStorage.getItem(initialInput)
        localStorage.setItem("Initial", initialInput)
         renderLastItem()
    }

})
/** Relaods page when you click go back button. */
function init() {
     location.reload();
 
}
/** Clears the scores. */
function clearScore() {
    initialAndScore.value = "";
    const initialScore = localStorage.getItem("HighScores")
    const allScores = JSON.parse(initialScore) 
}

