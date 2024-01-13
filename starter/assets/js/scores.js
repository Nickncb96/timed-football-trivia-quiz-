// scores.js

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
    displayHighScores(); // Display updated high scores
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