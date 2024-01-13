// Function to get high scores from local storage
function getHighScores() {
    const highScoresString = localStorage.getItem('highScores');
    return highScoresString ? JSON.parse(highScoresString) : [];
}

// Function to save a high score to local storage
function saveHighScore(initials, score) {
    const highScores = getHighScores();
    highScores.push({ initials, score });
    highScores.sort((a, b) => b.score - a.score); // Sort scores in descending order
    localStorage.setItem('highScores', JSON.stringify(highScores));
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

// Event listener for displaying high scores when the page loads
document.addEventListener('DOMContentLoaded', displayHighScores);

// other functionality for submitting scores and feedback
// Function to submit score
function submitScore() {
    const initialsInput = document.getElementById('initials');
    const initials = initialsInput.value.toUpperCase();

    if (initials && finalScore !== undefined) {
        saveHighScore(initials, finalScore);
        initialsInput.disabled = true;
        document.getElementById('submit').disabled = true;
        displayHighScores(); // Update high scores list
    }
}

// Event listener for submitting scores
document.getElementById('submit').addEventListener('click', submitScore);

