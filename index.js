
var title = $("#level-title");
var isGameOver = false;
var currentLevel = 1;

var availbleColors = ["red", "green", "blue", "yellow"];
var simonSequence = [];
var userSequence = [];
var userClick;

$(document).keypress(function (event) {
    if (isGameOver) {
        isGameOver = false;
        onStartGame();
    } else if ((event.key == "a" || event.key == "A") && simonSequence.length <= 0) {
        onStartGame();
    }
})

$(".btn").click(function () {


    if (simonSequence <= 0) {
        return;
    }
    if (userClick == null) {
        userClick = 0;
    } else {
        userClick++;
    }


    switch ($(this).attr("id")) {
        case "red": {
            checkClick("red");
            break;
        }
        case "green": {
            checkClick("green");
            break;
        } case "blue": {
            checkClick("blue");
            break;
        } case "yellow": {
            checkClick("yellow");
            break;
        }
    }
});



/// Functions

function setTitle(text) {
    title.text(text);
}


function gameOver() {
    makeGameOverSound();
    simonSequence = [];
    userSequence = [];
    userClick = null;
    currentLevel = 1;
    setTitle("Game Over, Press Any Key to Restart");
    isGameOver = true;
}

function onRestartGame() {
    setTitle("Game Restart");
}

function onStartGame() {
    startSequence();
}

function startSequence() {
    currentLevel = 1;
    setTitle("Level " + currentLevel);

    var color = availbleColors[randomNumber()];
    simonSequence.push(color);
    makeSoundByColor(color);
    console.log(simonSequence);
}

function nextSequence() {
    userSequence = [];
    userClick = null;
    currentLevel++;
    setTitle("Level " + currentLevel);

    var color = availbleColors[randomNumber()];
    simonSequence.push(color);

    makeSoundByColor(color);

    console.log("randomNumber", randomNumber());
    console.log("color", color);
    console.log(simonSequence);

}

function checkClick(color) {

    makeSoundByColor(color);
    var isCorrect = simonSequence[userClick] == color;

    if (isCorrect && (userClick + 1) != simonSequence.length) {
        userSequence.push(color);
    } else if (isCorrect && (userClick + 1) == simonSequence.length) {
        setTimeout(function () {
            nextSequence();
        }, 1000);
    } else {
        gameOver();
    }
}

function randomNumber() {
    return Math.floor(Math.random() * 4);
}

function makeSoundByColor(color) {

    $(`#${color}`).addClass('pressed');
    setTimeout(function () {
        $(`#${color}`).removeClass('pressed');
    }, 100);

    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function makeGameOverSound() {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
}
