import footballQuestions from './questions.js';

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;
let finalScore;

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
    finalScore = timeLeft;
    document.getElementById('final-score').textContent = finalScore;
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

// Event listener for submitting scores
document.getElementById('submit').addEventListener('click', submitScore);

// Function to submit score
function submitScore() {
    const initialsInput = document.getElementById('initials');
    const initials = initialsInput.value.toUpperCase();

    if (initials && finalScore !== undefined) {
        saveHighScore(initials, finalScore);
        initialsInput.disabled = true;
        document.getElementById('submit').disabled = true;
    }
}
