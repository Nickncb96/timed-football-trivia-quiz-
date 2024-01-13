// Importing footballQuestions from questions.js
import footballQuestions from './questions.js';

// Variables for tracking quiz state
let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;
let quizState = "start";

// Function to start the quiz
function startQuiz() {
    if (quizState === "start") {
        quizState = "quiz";
        document.getElementById('start-screen').classList.add('hide');
        document.getElementById('questions').classList.remove('hide');
        document.getElementById('timer-feedback').classList.remove('hide'); // Show timer and feedback
        updateTimerDisplay();
        displayQuestion();
        startTimer();
    } else if (quizState === "end") {
        quizState = "start";
        resetQuiz();
    }
}

// Function to reset quiz state
function resetQuiz() {
    currentQuestionIndex = 0;
    timeLeft = 60;
    quizState = "start";
    document.getElementById('questions').classList.add('hide');
    document.getElementById('end-screen').classList.add('hide');
    document.getElementById('start-screen').classList.remove('hide');
}

// Function to display a question
function displayQuestion() {
    const questionTitle = document.getElementById('question-title');
    const choicesContainer = document.getElementById('choices');

    questionTitle.textContent = footballQuestions[currentQuestionIndex].question;

    choicesContainer.innerHTML = '';
    footballQuestions[currentQuestionIndex].choices.forEach((choice, index) => {
        const choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButton.addEventListener('click', () => checkAnswer(choice));
        choicesContainer.appendChild(choiceButton);
    });
}

// Function to check the answer
function checkAnswer(answer) {
    const correctAnswer = footballQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correctAnswer) {
        // Correct answer logic
        showFeedback(true, "Correct!");
    } else {
        // Incorrect answer logic
        timeLeft -= 10;
        showFeedback(false, "Wrong!");
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < footballQuestions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timerInterval); // Stop the timer
    document.getElementById('questions').classList.add('hide');
    document.getElementById('end-screen').classList.remove('hide');
    document.getElementById('final-score').textContent = timeLeft;

    // Prompt user to save initials and score
    const initialsInput = document.getElementById('initials');
    const submitButton = document.getElementById('submit');

    submitButton.addEventListener('click', function () {
        const initials = initialsInput.value.trim();

        if (initials !== "") {
            saveHighScore(initials, timeLeft);
            document.getElementById('end-screen').classList.add('hide');
            displayHighScores(); // Display updated high scores
        }
    });

    quizState = "end";
}

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

// Function to update the timer display
function updateTimerDisplay() {
    document.getElementById('time').textContent = timeLeft;
}

// Function to show feedback
function showFeedback(isCorrect, message) {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.textContent = message;
    feedbackElement.classList.remove('hide');
    feedbackElement.classList.add


        (isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
        feedbackElement.classList.add('hide');
        feedbackElement.classList.remove('correct', 'incorrect');
    }, 1000);
}

// Event listener for starting the quiz
document.getElementById('start').addEventListener('click', startQuiz);


