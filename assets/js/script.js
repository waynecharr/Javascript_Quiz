
// This array sets the questions that will be used in the quiz. There's also, an array inside the array. Prompts is the main arrray
var prompts = [
  {
    // question - is the question being asked.
    question: "Commonly used data types DO Not include:",
    // choices - is the list of choices available. These are buttons, and they start as 0, 1, 2, 3.
    choices: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
    // answer - is the answer, pretty straight forward.
    answer: "3. Alerts"
  },
  {
    question: "The condition in an if/else statement is enclosed with ______.",
    choices: ["1. Quotes", "2. Curly brackets", "3. Parenthesis", "4. Square brackets"],
    answer: "3. Parenthesis"
  },
  {
    question: "Arrays in Javascript can be used to store ______.",
    choices: ["1. Numbers and strings", "2. Other arrays", "3. Booleans", "4. All of the above"],
    answer: "4. All of the above"
  },
  {
    question: "String values must be enclosed within ______ when being assigned to variables.",
    choices: ["1. Commas", "2. Curly brackets", "3. Quotes", "4. Parenthesis"],
    answer: "3. Quotes"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["1. JavaScript", "2. Terminal/bash", "3. For loops", "4. Console.log"],
    answer: "4. Console.log"
  }
];

// An empty array that will be appended as I add to the score
var scoreArray = [];

// Sets the starting seconds
var seconds = 74;
// Used for the interval
var stopWatch; 

// Timer was having issues reseting. Adding this reset timer function before the game begins. 
function resetTimer() {
  clearInterval(stopWatch);
  seconds = 74;
}

// On click, this starts the quiz.
function startQuiz() {
  // Calls the resetTimer function above. 
  resetTimer();
  // Takes the prompt-container element and removes it from display
  document.getElementById("prompt-container").style.display = "none";
  // Takes the quiz-container elemnent and adds it to the display
  document.getElementById("quiz-container").style.display = "block";
  // Pulls the first prompt
  stopWatch = setInterval(timer, 1000);
  currentPrompt = 0;
  // this is going to run a function called "pullQuestion which will display the questions."
  pullQuestion()
}

// This function sets the timer, and updates the text within the "timer" Id and replaces it with Time: + seconds
function timer() {
  time = document.getElementById("timer")
  time.textContent = "Time: " + seconds
  seconds--;
   // If the timer hits 0 seconds, the game will automatically end. 
  if (seconds === 0) {
    clearInterval(stopWatch);
    endQuiz();
  }
 }

// This function will grab the questions from the array
function pullQuestion() {
  // This sets a questionElement that's the ID element "question"
  var questionElem = document.getElementById("question");
  var choice1Elem = document.getElementById("choice1");
  var choice2Elem = document.getElementById("choice2");
  var choice3Elem = document.getElementById("choice3");
  var choice4Elem = document.getElementById("choice4");

  // This sets the question text to the corresponding prompts for questions and choices. 
  var setQuestion = prompts[currentPrompt];
  questionElem.textContent = setQuestion.question;
  choice1Elem.textContent = setQuestion.choices[0];
  choice2Elem.textContent = setQuestion.choices[1];
  choice3Elem.textContent = setQuestion.choices[2];
  choice4Elem.textContent = setQuestion.choices[3];
}

 // This runs the function for the answers, which are buttons in the index.
function Answer(choiceIndex) {
  // This looks to see what choice you're selecting
  var selectedChoice = prompts[currentPrompt].choices[choiceIndex];
  // This is looing to see what the answer is 
  var correctAnswer = prompts[currentPrompt].answer;
  // This is setting a variable for the check-answer ID
  var answerEl = document.getElementById("check-answer");

  // This compares the Choice with the Answer. If the answer is the same as the choice, you get Correct text, otherwise you get wrong text!
  if (selectedChoice === correctAnswer) {
    answerEl.textContent = "Correct!"; 
   } else { 
    answerEl.textContent = "Wrong!";
    seconds -= 10;
  }
   
  // This looks at the current Prompt and adds ones
  currentPrompt++;
  // If the current prompt number is less than the total number of prompts it runs the pullQuestion function, otherwise it pulls the endQuiz function
  if (currentPrompt < prompts.length) {
    pullQuestion()
  } else {
    endQuiz();
  }
}

function endQuiz() {
  // Sets the quiz-container to hidden or none
  document.getElementById("quiz-container").style.display = "none";
  // Sets the final score container to display 
  document.getElementById("final-score").style.display = "block";
  // 
  time.textContent = "Time: " + seconds;
  // Stops the clock from going further
  clearInterval(stopWatch);
  // Brings up a new div container called "score result"
  document.querySelector(".score-result").textContent = "Your Final Score is " + seconds + ".";
}

var submitButton = document.querySelector("#submit");
var initialInput = document.querySelector("#initials");

// switched to a EventListner instead of an onclick for the remaining buttons. Removes final-score container and displays the high-score container
submitButton.addEventListener("click", function (event) {
  document.getElementById("final-score").style.display = "none";
  document.getElementById("high-score").style.display = "block";

  var initials = initialInput.value;
  // Value that will later be used to apply the 
  var scoreList = initials + " - " + seconds
  scoreArray.push(scoreList);

  // runs the displayScore function
  displayScore();

});

var backButton = document.querySelector("#back");

backButton.addEventListener("click", function (event) {
  document.getElementById("high-score").style.display = "none";
  document.getElementById("prompt-container").style.display = "block";


});

console.log(scoreArray);

function displayScore() {
  var scoreList = document.getElementById("score-list");

  scoreList.innerHTML = "";

  scoreArray.forEach(function (score) {
    var listScores = document.createElement("li");
    listScores.textContent = score;
    scoreList.appendChild(listScores);
  });
}

var viewScoreButton = document.querySelector("#view-score");

viewScoreButton.addEventListener("click", function (event) {
  document.getElementById("prompt-container").style.display = "none";
  document.getElementById("high-score").style.display = "block";

});