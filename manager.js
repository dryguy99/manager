
var inquirer = require("inquirer");
var playerArray = [];
//-----------------------------------------------------------
// constructor function used to create programmers objects
function Player(name, position, offense, defense) {
  this.name = name;
  this.position = position;
  this.offense = offense;
  this.defense = defense;
  this.printInfo = function() {
	console.log("==============================");
	console.log("");
	console.log("Name: " + this.name + "\nPosition: " + this.position + "\noffenseValue: " +
	this.offenseValue + "\ndefenseValue: " + this.defenseValue );
	console.log("");
	};
}
//-----------------------------------------------------------

// runs inquirer and asks the user a series of questions whose replies are
// stored within the variable answers inside of the .then statement.
// create players
var createPlayers = function() {
  // if the length of the team array is 8 or higher, no more questions will be asked
  if (playerArray.length < 8) {
    console.log("\nNEW PLAYER!\n");
    inquirer.prompt([
      {
        name: "name",
        message: "Player's Name: "
      }, {
        name: "position",
        message: "Player's position: "
      }, {
        name: "offense",
        message: "Player's Offensive Ability: ",
        validate: function(value) {
          if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10) {
            return true;
          }
          return false;
        }
      }, {
        name: "defense",
        message: "Player's Defensive Ability: ",
        validate: function(value) {
          if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10) {
            return true;
          }
          return false;
        }
      }
    ]).then(function(answers) {
	    // runs the constructor and places the new player object into the variable
	    // player. turns the offense and defense variables into integers as well with parseInt
	    var player = new Player(answers.name, answers.position, parseInt(answers.offense), parseInt(answers.defense));
	    // adds a player to the starters array if there are less than five player
	    // objects in it. otherwise adds the newest player object to the subs array
	      
	    playerArray.push(player);
	    console.log(player.name + " added to the team");
	      
	    // runs the createPlayer function once more
	    createPlayers();
    });
  }
  else {
  	for (j = 0; J < 8; j++) {
  		playerArray[j].printinfo();
  	}
    // starts first round
    playGame(0);
  }
}; // end createPlayers function
//-----------------------------------------------------------

var score = 0;
var teamOffense = 0;
var teamDefense = 0;
//-----------------------------------------------------------
var teamStats = function () {
 	for (var y = 0; y < 4; y++) {
	 teamOffense += parseInt(playerArray[y].offenseValue);
 	 teamDefense += parseInt(playerArray[y].defenseValue);
 	}
}
//-----------------------------------------------------------
var Offense = function () {
 	Math.floor((Math.random()*(50-1))+1);}
//-----------------------------------------------------------
var Defense = function () { 
 	Math.floor((Math.random()*(50-1))+1);}
 //-----------------------------------------------------------
 var Coinflip = function () {
 	Math.floor(Math.random()*2);}
//-----------------------------------------------------------
 var gameCount = 0;

 
//-----------------------------------------------------------
// play the game x = number of times
 function playGame(x) {
  if (x < 9) {
    // adds one to x and prints the current round of the game
    x++;
    console.log("----------\nROUND " + x + "\n----------");
    // finds two random numbers between 1 and 50 to compare the starter objects' stats to
    var offenseRandom = Offense();
    var defenseRandom = Defense();
    // loops through the starter array to find if the total value of their offense and defense
    var teamOffense = 0;
    var teamDefense = 0;
    for (var i = 0; i < 5; i++) {
      teamOffense += playerArray[i].offense;
      teamDefense += playerArray[i].defense;
    }
    console.log("Team Offense: " + teamOffense);
    console.log("Team Defense: " + teamDefense);
    console.log("Random O: " + offenseRandom);
    console.log("Random D: " + defenseRandom);
    // determines if teamOffense is less than offenseRandom and adds one to score if true
    if (offenseRandom < teamOffense) {
      console.log("YOU SCORED A PONT!");
      score++;
    }
    // determines if teamDefense is greater than defenseRandom and subtracts one from score if true
    if (defenseRandom > teamDefense) {
      console.log("YOU WERE SCORED UPON!");
      score--;
    }
    // prompts to figure out if the player would like to make a substitution
    inquirer.prompt([
      {
        name: "confirm",
        type: "confirm",
        message: "Would you like to make a substitution?"
      }
    ]).then(function(answer) {
      // if the answer is yes, start the substitution prompts
      if (answer.confirm === true) {
        inquirer.prompt([
          {
            name: "sub",
            type: "rawlist",
            message: "Who would you like to sub in?",
            // sets the names of all those contained within the subs array as choices
            choices: [playerArray[5], playerArray[6], playerArray[7]]
          }
        ]).then(function(subIn) {
          // finds the player object within the subs array with the name that matches
          // the user's choice and places it within the sideline variable
          var sideline = {};
          var number = 0;
          for (var i = 5; i < 8; i++) {
            if (playerArray[i].name === subIn.sub) {
              number = i;
              sideline = playerArray[i];
            }
          }
          inquirer.prompt([
            {
              name: "sub",
              type: "rawlist",
              message: "Who would you like to sub out?",
              choices: [playerArray[0], playerArray[1], playerArray[2], playerArray[3], playerArray[4]]
            }
          ]).then(function(subOut) {
            // finds the player object within the starters array with the name that matches the user's choice
            // and swaps it with the value contained within sideline after moving them into the subs array
            for (var i = 0; i < 5; i++) {
              if (playerArray[i].name === subOut.sub) {
                playerArray[number] = starters[i];
                playerArray[i] = sideline;
                console.log("SUBSTITUTION MADE!");
              }
            }
            // starts the next round
            playGame(x);
          });
        });
      }
      else {
        // starts the next round
        playGame(x);
      }
    });
  }
  else {
    // prints the final score
    console.log("FINAL SCORE: " + score);
    // if the score was greater than 0, prints the winning message and increases starters stats
    if (score > 0) {
      console.log("Good game, everyone!\nYour current starters' stats have improved!");
      for (var i = 0; i < starters.length; i++) {
        starters[i].goodGame();
      }
    }
    // if the score was less than 0, prints the losing message and decreases starters stats
    if (score < 0) {
      console.log("That was a poor performance!\nYour current starters' stats have decreased!");
      for (var i = 0; i < starters.length; i++) {
        starters[i].badGame();
      }
      // if the score was zero, prints the tie message and does nothing to the starters stats
    }
    if (score === 0) {
      console.log("It was a tie game! Not good. Not bad.");
    }
    // prompts the user if they would like to play again. if yes, run playgame with a value of 0 being passed into it.
    // if not, print the "come back again soon message" and exit
    inquirer.prompt({
      name: "again",
      type: "confirm",
      message: "Would you like to play another match?"
    }).then(function(answer) {
      if (answer.again === true) {
        // starts new match with the same players
        playGame(0);
      }
      else {
        console.log("Come back again soon!");
      }
    });
  }
}

//-----------------------------------------------------------
// create the players
createPlayers();



