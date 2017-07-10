/*
  Author: Ashwani Kumar Gupta
*/


// Initially player has score zero
var score = 0;
var soundFilePath = "sound/beep.mp3";
var playerChoice;

// Define three choices with a numeric equivalent.
var readable = {
  "0": "Rock",
  "1": "Paper",
  "2": "Scissors"
};

// This order array helps to decide the winner. We can have 3 combinations of the choices of two players.
// For example, if choices are (Rock, Paper) then Paper wins,
// if choices are (Paper, Scissors) then Scissors win and
// if choices are (Scissors, Rock) then Rock wins.
// So every adjacent pair of choices of in the order array the right one wins.
order = [0, 1, 2, 0];

var images = {
  items: document.getElementsByTagName('img'),
  init: function() {
    for (var pos = 0; pos < this.items.length; pos++) {
      this.items[pos].id = pos;
      this.items[pos].addEventListener("click", function() {
        assignClick(this.id);
        playBeep(); // Plays beep sound on click
      });
    }
  }
};

function playBeep() {
  var beepAudio = new Audio(soundFilePath);
  beepAudio.play();
};

// Utility function to get a random integer number in a given range.
function randIntInRange(min, max) {
  return Math.floor(Math.random() * ((max-min) + 1));
};

var cpu = {
  // Get the CPU/Computer's choice randomly an integer between 0 and 2 inclusive.
  init: function() {
    this.cpuChoice = randIntInRange(0, 2);
    this.cpuText = "The computer chose " + readable[this.cpuChoice];
  },
  cpuChoice: 0,
  cpuText: ''
};

// Game logic
var chooseWinner = function(cpuChoice, playerChoice) {
  var text = "";
  if(cpuChoice == playerChoice) {
    text = "The game is tied. Try Again?";
  }
  else if(order[cpuChoice + 1] === order[playerChoice]) {
    score++;
    text = "Woohoo! You won. How about another game?";
  }
  else {
    score--;
    text = "You lost! The computer is really good at this. :(";
  }
  return text;
};


// When player clicks on any of the image player's choice is set.
// Also the winner is chosen and result is displayed.
function assignClick(position) {
  playerChoice = position;

  // Cpu makes it's choice and result is displayed.
  cpu.init();
  console.log(playerChoice + " " + cpu.cpuChoice);
  var label = document.getElementById("label");
  label.innerHTML = "<p>" + cpu.cpuText + "<br>";
  label.innerHTML += chooseWinner(cpu.cpuChoice, playerChoice);
  label.innerHTML += "<br>" + "SCORE: " + score + "</p>";
};

images.init();
