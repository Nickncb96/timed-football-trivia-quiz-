// Importing footballQuestions from questions.js
import footballQuestions from './questions.js';

// Variables for tracking quiz state
let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;

// Function to start the quiz
function startQuiz() {
    document.getElementById('start-screen').classList.add('hide');
    document.getElementById('questions').classList.remove('hide');
    updateTimerDisplay();
    displayQuestion();
    startTimer();
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
    feedbackElement.classList.add(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
        feedbackElement.classList.add('hide');
        feedbackElement.classList.remove('correct', 'incorrect');
    }, 1000);
}

// Event listener for starting the quiz
document.getElementById('start').addEventListener('click', startQuiz);

// ... (remaining code)



// Function to get high scores from local storage
function getHighScores() {
    const highScoresString = localStorage.getItem('highScores');
    return highScoresString ? JSON.parse(highScoresString) : [];
}

// Function to save a high score to local storage
function saveHighScore(initials, score) {
    const highScores = getHighScores();
    highScores.push({ initials, score });
    localStorage.setItem('highScores', JSON.stringify(highScores));
    displayHighScores();
}

// Function to display high scores on the highscores.html page
function displayHighScores() {
    const highScoresContainer = document.getElementById('highscores');
    highScoresContainer.innerHTML = '';

    const highScores = getHighScores();

    highScores.forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
        highScoresContainer.appendChild(listItem);
    });
}

// Function to clear high scores from local storage
function clearHighScores() {
    localStorage.removeItem('highScores');
    displayHighScores();
}

// Event listener for clearing high scores
document.getElementById('clear').addEventListener('click', clearHighScores);

// Event listener to display high scores when the page loads
document.addEventListener('DOMContentLoaded', displayHighScores);