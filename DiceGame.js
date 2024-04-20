var numDice = 5;
var keeperButtons = new Array(numDice);
var diceValues = new Array(numDice);
var rollCount = 0;
var diceImages = new Array(numDice);
var messages, gameOverMessage, playBtn, rollBtn;

// Function to start the game
function startGame() {
    rollCount = 0;
    diceValues = new Array(numDice).fill(0); // Reset diceValues to empty or initial values
    document.getElementById("gameOverMessage").innerText = "";
    document.getElementById("messages").innerText = "";
    for (var i = 0; i < keeperButtons.length; ++i) {
        keeperButtons[i].style.visibility = 'visible';
        keeperButtons[i].disabled = false;
        keeperButtons[i].value = "keep?";
    }
    document.getElementById("rollButton").disabled = false;
    document.getElementById("playButton").disabled = false;
    document.querySelector('#tenorGif').style.display = 'none';
    document.getElementById('messages').style.display = 'block';
    document.getElementById('gameOverMessage').style.display = 'block';
    document.getElementById('rollButton').style.display = 'inline-block';
    document.getElementById('dieContainer').style.display = 'block';
    document.getElementById('keeperContainer').style.display = 'block';
    rollDice();
}

// Function to roll the dice
function rollDice() {
    rollCount++;
    document.getElementById("messages").innerText = "rolls remaining: " + (3 - rollCount) + ", keep rolling";
    for (var i = 0; i < numDice; ++i) {
        if (keeperButtons[i].disabled == false) {
            diceValues[i] = Math.floor(1 + Math.random() * 6);
            setImage(diceImages[i], diceValues[i]);
        }
    }
    if (rollCount == 3) {
        document.getElementById("rollButton").disabled = true;
        checkLargeStraight();
        gameOver();
    }
}

// Function to sort an array
function sortArray(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// Function to check if two arrays are equal
function arraysAreEqual(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

// Function to check for a large straight
function checkLargeStraight() {
    var straight1 = [1, 2, 3, 4, 5];
    var straight2 = [2, 3, 4, 5, 6];
    var tempArr = diceValues.slice();
    sortArray(tempArr);
    if (arraysAreEqual(tempArr, straight1) || arraysAreEqual(tempArr, straight2)) {
        document.getElementById("messages").innerText = "you win!!!";
        return true;
    } else {
        document.getElementById("messages").innerText = "you lose :(";
        return false;
    }
}

// Function to end the game
function gameOver() {
    document.getElementById("rollButton").disabled = true;
    document.getElementById("gameOverMessage").innerText = "Game OVER";
}

// Function to compare integers (for sorting)
function compareIntegers(value1, value2) {
    return parseInt(value1) - parseInt(value2);
}

// Function to display the dice images
function showDice() {
    for (var i = 0; i < numDice; ++i) {
        setImage(diceImages[i], diceValues[i]);
    }
}

// Function to set the image of a dice
function setImage(dieImages, dieValue) {
    dieImages.src = "diceroll.gif"
    setTimeout(function() {
        if (isFinite(dieValue))
            dieImages.src = "die" + dieValue + ".png";
        else
            dieImages.src = "blank.png";
    }, 1000);
}

// Function to update the keeper buttons
function updateKeeper() {
    if (rollCount >= 1) {
        this.disabled = true;
        this.value = "keeper";
        this.style.visibility = 'hidden';
    }
}

// Function to setup the game
function setupGame() {
    playBtn = document.getElementById("playButton");
    playBtn.addEventListener("click", startGame, false);

    rollBtn = document.getElementById("rollButton");
    rollBtn.addEventListener("click", rollDice, false);

    messages = document.getElementById("messages");
    gameOverMessage = document.getElementById("gameOverMessage");

    for (var i = 0; i < numDice; ++i) {
        diceImages[i] = document.getElementById("die" + (i + 1));
    };

    rollBtn.disabled = true;
    playBtn.disabled = false;

    for (var i = 0; i < numDice; ++i) {
        keeperButtons[i] = document.getElementById("keeper" + (i + 1));
        keeperButtons[i].disabled = true;
        keeperButtons[i].addEventListener("click", updateKeeper);
    }
}

function toggleAudio() {
    var audio = document.querySelector('audio');
    var popup = document.getElementById('myPopup');
    if (audio.paused) {
        audio.play();
        popup.classList.add('show');
    } else {
        audio.pause();
        popup.classList.remove('show');
    }
}

// Event listener to start the game when the window loads
window.addEventListener("load", setupGame, false);