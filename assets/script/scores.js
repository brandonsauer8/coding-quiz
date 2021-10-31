function printHighscores() {
    //Fetches scores from local server
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    //Scores highest to lowest
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    //List of high scores
    highscores.forEach(function(score){
    var highscoreList = document.createElement("li")
    highscoreList.textContent = score.initials + " - " + score.score;

    //Shows the list of scores in the browser
    var olEl = document.getElementById("highscores");
    olEl.appendChild(highscoreList);
    });
}

function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("clear-highscores").onclick = clearHighscores;

printHighscores(); 