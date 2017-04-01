
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

var teamScore = 0;
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
var offense = function () {
 	Math.floor((Math.random()*(50-1))+1);}
//-----------------------------------------------------------
var defense = function () { 
 	Math.floor((Math.random()*(50-1))+1);}
 //-----------------------------------------------------------
 var coinflip = function () {
 	Math.floor(Math.random()*2);}
//-----------------------------------------------------------
 var gameCount = 0;

 function  substitution() {
 		inquirer.prompt([
	  	{
 	    name: "confirm",
 	    message: "Would you like to make a substitution",
 	    confirm: (boolean),
 	    validate: function() {
 	    	if (confirm === true) {
 	    		inquirer.prompt([
 	    			{
 	    				type: "list",
 	    				name: "choices",
 	    				message: "Who do you want to remove?",
 	    				choices: [playerArray[0], playerArray[1], playerArray[2], playerArray[3],playerArray[4]],
 	    				validate: function (){
 	    					if (choices !== playerArray[0]) {
 	    						console.log(playerArray);
 	    						var sub = playerArray.indexOf(choices);
 	    						var tempPlayer = choices;
 	    						playerArray.splice(sub, 1);
 	    						playerArray.splice(0,0, tempPlayer);
 	    						var x = 0;
 								for (x = 0; x < 5; x++) {
 									playerArray[x].printInfo();
 								}
 	    						return true;
 	    					} 
 	    				}
 	    			},
 	    			{
 	    				type: "list",
 	    				name: "choices",
 	    				message: "Who do you want to add?",
 	    				choices: [playerArray[5], playerArray[6], playerArray[7]],
 	    				validate: function (){
 	    						console.log(playerArray);
 	    						var sub = playerArray.indexOf(choices);
 	    						var tempPlayer = choices;
 	    						var moveSub = playerArray[0];
 	    						playerArray.splice(sub, 1);
 	    						playerArray.splice(0,0, tempPlayer);
 	    						playerArray.splice(1,1);
	    						playerArray.splice(5,0, moveSub);
 	    						var x = 5;
								for (x = 5; x < 8; x++) {
									playerArray[x].printInfo();
 								}
	    						return true;
	    					
	    				}
	    			}
 	    		]); // end inquirer prompt
 	    	} // end substitution of players
 	    	return true;
 	   	} //end validate
 	}// end inquirer prompt
 	]);   
} //end substitution function
//-----------------------------------------------------------
// play the game x = number of times
 var playGame = function(x) {
 	if (x < 10) {
 		offense();
 		defense();
 		coinflip();
 		if (teamOffense > offense) {
 			teamScore++;
 			substitution();
 		}
 		if (teamDefense < defense) {
 			teamScore--;
 			substitution();
 		}
 		x++;
 		playGame(x);
 	}
 	else {
 		console.log("end game");
	}
}
//-----------------------------------------------------------
// create the players
createPlayers();



