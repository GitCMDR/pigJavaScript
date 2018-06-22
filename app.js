/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();


// add an action to the btn-roll option
document.querySelector(".btn-roll").addEventListener('click', btn);

// add an action to the btn-hold option
document.querySelector(".btn-hold").addEventListener("click", btnHold);

// add an action to the btn-new option
document.querySelector(".btn-new").addEventListener("click", init);


// Helper Functions

function btn() {
    if (gamePlaying) {
        // 0. Retrieve active player element ID
        var currentPlayerId = "#current-" + activePlayer;

        // 1. Generate random number (integer from 1 to 6).
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display result.
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";

        // 3. Update the round score IF the rolled number was NOT a 1.
        if (dice !== 1) {
            // add score
            roundScore += dice; // sum dice to roundScore
            // update score in screen
            document.querySelector(currentPlayerId).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }

}

function btnHold() {
    if (gamePlaying) {
        // Get Player Score DOM object
        var playerScoreId = "#score-" + activePlayer;
        // Add CURRENT score to the Global Score
        scores[activePlayer] += roundScore;
        // Update the UI
        document.querySelector(playerScoreId).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 20) {
            var activePlayerName = "#name-" + activePlayer;
            var activePlayerPanel = ".player-" + activePlayer + "-panel";

            document.querySelector(activePlayerName).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(activePlayerPanel).classList.add("winner");
            document.querySelector(activePlayerPanel).classList.remove("active");

            gamePlaying = false;
        } else {
            // turn goes to next player
            nextPlayer();
        }
    }

}

function nextPlayer() {
    if (gamePlaying) {
        var currentPlayerId = "#current-" + activePlayer;
        roundScore = 0;
        document.querySelector(currentPlayerId).textContent = roundScore;
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

        // document.querySelector(".player-0-panel").classList.remove("active");
        // document.querySelector(".player-1-panel").classList.add("active");

        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active");

        document.querySelector(".dice").style.display = "none";
    }

}


function init() {

    gamePlaying = true;

    scores = [0, 0]; // stores the scores of each player (2 elements in array)
    roundScore = 0;
    activePlayer = 0;

    // set initial values to zero
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector('.player-0-panel').classList.remove("winner");
    document.querySelector('.player-0-panel').classList.remove("active");
    document.querySelector('.player-0-panel').classList.add("active");

    document.querySelector('.player-1-panel').classList.remove("winner");
    document.querySelector('.player-1-panel').classList.remove("active");

// retrieve the dice and hide it
    document.querySelector(".dice").style.display = "none";

}