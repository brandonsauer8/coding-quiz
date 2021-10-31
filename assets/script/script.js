//DOM elements
var questionEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var responseEl = document.getElementById("user-response");
var startBtn = document.getElementById("start-button");
var submitBtn = document.getElementById("submit-score");
var timeEl = document.getElementById("time");
var initialsEl = document.getElementById("initials");
var currentQuestion;
var currentQuestionIndex = 0;

// Questions
var questions = [
    {
      title: "What is the tag that is used in HTML to start the script?",
      choices: ["<HTML>", "<main>", "<footer>", "<script>"],
      answer: "<script>"
    },
    {
      title: "How is a function called in Javascript?",
      choices: ["document.getelementById('answer');", "var answer", "function()", "<script>"],
      answer: "function()"
    },
    {
      title: "Where in the HTML must a script be placed in order to run it?",
      choices: [
        "body",
        "footer",
        "booleans",
        "all of the above"
      ],
      answer: "body"
    },
    {
      title:
        "How can you put text in an alert box?",
      choices: ["function()", "alert()", "var alert", "<script class='alert'"],
      answer: "alert()"
    },
    {
      title:
        "How do you add a comment in Javascript?",
      choices: ["//answer", "<--answer-->", "@answer", ".answer"],
      answer: "//answer"
    }
  ];

  //Timer
var questionIndex = 0;
var time = questions.length * 12;
var currentTime;

// Starts the quiz
function startQuiz() {

     //Runs the function to set the time intervals
     setTime();
    //Start screen
    var startScreenEl = document.getElementById("start-screen");

    console.log("Time", time);
    //Hides the start screen
    startScreenEl.setAttribute("class","hidden");

    questionEl.removeAttribute("class");   

    //Picks a new question
    newQuestion();
}

//Sets time interval in variable
function setTime() {
    currentTime = setInterval(function() {
    time--;
    timeEl.textContent = time;

    // Checks to see if the users time has run out
    if (time <= 0) {
            //Calls function to create and append image
            endQuiz();
        }
    }, 1000);
}


function newQuestion() {
    //Gets the first qustion in array
    currentQuestion = questions[currentQuestionIndex];

    //Changes heading for current question
    var titleEl = document.getElementById("questions-title")
    titleEl.textContent = currentQuestion.title;

    //Gets rid of old questions
    choicesEl.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, i) {
    //Makes a button for each choice.
        var multipleChoice = document.createElement("button");
        multipleChoice.setAttribute("class", "choices");
        multipleChoice.setAttribute("value", choice);

        multipleChoice.textContent = i + 1 + ". " + choice;

        multipleChoice.onclick = chosenAnswer;

        //Displays the chosen answer on the page
        choicesEl.appendChild(multipleChoice);
});
}


function chosenAnswer() {
  console.log(this.value)
  console.log(questionIndex)
  console.log(questions[questionIndex].answer)
    //If wrong answer, minus 15 seconds
        if (this.value !== questions[currentQuestionIndex].answer) {
        console.log(this.value)


    //Timer takes away 15 seconds for wrong answer
    time -=15;    

    if (time < 0) {
        time = 0;
    }

    //Shows time,    
    timeEl.textContent = time;

    //Wrong answer text
    responseEl.textContent = 'That is not correct!';

    } else { 
    //Correct answer text
    responseEl.textContent = "That is correct!"
    }
    //Shows correct or incorrect answer
    responseEl.setAttribute("class", "response");

    setTimeout(function(){
        responseEl.setAttribute("class", "response-hidden");
    }, 1000);

    //Takes user to next question
    currentQuestionIndex++;

    //Ends quiz if no more questions
    if (currentQuestionIndex === questions.length) {
        endQuiz();
    } else {
        newQuestion();
    }
}

//Ending the game
function endQuiz() {
     //Stops execution of action at set interval
     clearInterval(currentTime);

    //Hides the questions
    questionEl.setAttribute("class", "hidden")

    //Shows the ending screen
    let endScreenEl = document.getElementById("game-over")
    endScreenEl.removeAttribute("class");

    //Shows the final score
    let finalScoreEl = document.getElementById("final-results");
    finalScoreEl.textContent = time;
}

function saveHighscores() {
    //Grabs initials from input box
    var initials = initialsEl.value;

    //Makes sure the user inputs a value.
    if (initials !== "") {
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        var newScore = {
            score: time,
            initials: initials
        };

        //Save to local storage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        ///Sends you to the score page
        window.location.href = "scores.html"
    }
}


// Button to start after click
startBtn.onclick = startQuiz

// Saves the high score on a button click
submitBtn.onclick = saveHighscores;

//Allows user to save their high score.
function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscores();
    }
}