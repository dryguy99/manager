var inquirer = require("inquirer");
var playerArray =[];
//-----------------------------------------------------------
// constructor function used to create programmers objects
function player(name, position, offenseValue,defenseValue) {
  this.name = name;
  this.position = position;
  this.offenseValue = offenseValue;
  this.defenseValue = defenseValue;
}
//-----------------------------------------------------------
// creates the printInfo method and applies it to all programmer objects
player.prototype.printInfo = function() {
	console.log("==============================");
	console.log("");
	console.log("Name: " + this.name + "\nPosition: " + this.position + "\noffenseValue: " +
	this.offenseValue + "\ndefenseValue: " + this.defenseValue );
	console.log("");
};

// runs inquirer and asks the user a series of questions whose replies are
// stored within the variable answers inside of the .then statement.
//-----------------------------------------------------------
// create players
var createPlayers = function(i){
inquirer.prompt([
	  {
	    name: "name",
	    message: "What is your name?"
	  }, {
	    name: "position",
	    message: "What position do you play?"
	  }, {
	    type: "list",
	    name: "offenseValue",
	    message: "From 1-10, how well are you on offense?",
	    choices: ["1","2","3","4","5","6","7","8","9","10"]
	  }, {
	    type:"list",
	    name: "defenseValue",
	    message: " From 1-10 how well are you on defense?",
	    choices: ["1","2","3","4","5","6","7","8","9","10"]
	  }
	]).then(function(answers) {
		playerArray.push(new player(answers.name, answers.position, answers.offenseValue, answers.defenseValue));
	});
	i++
	if ( i < 8 ) {
  		createPlayers(i);
	}
	else{
		for (x = 0; x < 8; x++) {
			playerArray[x].printInfo();
		}
	}
} // end createPlayers function
createPlayers(0);

var teamScore = 0;
var teamOffense = 0;
var teamDefense = 0;
var teamStats = function () {
	for (var y = 0; y < 4; y++) {
	 teamOffense += parseInt(playerArray[y].offenseValue);
	 teamDefense += parseInt(playerArray[y].defenseValue);
	}
}
var offense = function () {
	Math.random() *((50-1)+1);}

var defense = function () { 
	Math.random() *((50-1)+1);}

var coinflip = function {
	Mathround(Math.random()*2;}

var gameCount = 0;

var playGame = function(x) {
	offense();
	defense();
	coinflip();
	if (teamOffense > offense) {
		teamScore++;
	}.then(function () {
		inquirer.prompt([
	  {
	    type: "list",
	    message: "Would you like to make a substitution",
	    confirm: (boolean),
	    validate: function() {
	    	if (confirm === true) {
	    		inquirer.prompt([
	    			{
	    				type: "list",
	    				message: "Who do you want to remove?",
	    				choices: [playerArray[0], playerArray[1], playerArray[2], playerArray[3],playerArray[4] ];
	    				validate: function (){
	    					if (choices !== playerArray[0]) {
	    						console.log(playerArray);
	    						var sub = playerArray.indexOf(choices);
	    						var tempPlayer = choices;
	    						playerArray.splice(sub, 1);
	    						playerArray.splice(0,0, tempPlayer);
	    						console.log(playerArray);
	    						return true;
	    					} 
	    				},
	    			{
	    				type: "list",
	    				message: "Who do you want to add?",
	    				choices: [playerArray[5], playerArray[6], playerArray[7]];
	    				validate: function (){
	    						console.log(playerArray);
	    						var sub = playerArray.indexOf(choices);
	    						var tempPlayer = choices;
	    						var moveSub = playerArray[0];
	    						playerArray.splice(sub, 1);
	    						playerArray.splice(0,0, tempPlayer);
	    						playerArray.splice(1,1);
	    						playerArray.splice(5,0, moveSub);
	    						console.log(playerArray);
	    						return true;
	    					
	    				}
	    			}
	    			}
	    		]);
	    		return true;
	    	}
	    return true;
	   	}
		}
	    
	  }
	
		if (teamDefense < defense) {
		teamScore--;
		.then(function () {
		inquirer.prompt([
	  {
	    type: "list",
	    message: "Would you like to make a substitution",
	    confirm: (boolean),
	    validate: function() {
	    	if (confirm === true) {
	    		inquirer.prompt([
	    			{
	    				name: "chpices",
	    				type: "list",
	    				message: "Who do you want to remove?",
	    				choices: [playerArray[0], playerArray[1], playerArray[2], playerArray[3],playerArray[4] ];
	    				validate: function (){
	    					if (choices !== playerArray[0]) {
	    						console.log(playerArray);
	    						var sub = playerArray.indexOf(choices);
	    						var tempPlayer = choices;
	    						playerArray.splice(sub, 1);
	    						playerArray.splice(0,0, tempPlayer);
	    						console.log(playerArray);
	    						return true;
	    					} 
	    				},
	    			{
	    				name: "choices"
	    				type: "list",
	    				message: "Who do you want to add?",
	    				choices: [playerArray[5], playerArray[6], playerArray[7]];
	    				validate: function (){
	    						console.log(playerArray);
	    						var sub = playerArray.indexOf(choices);
	    						var tempPlayer = choices;
	    						var moveSub = playerArray[0];
	    						playerArray.splice(sub, 1);
	    						playerArray.splice(0,0, tempPlayer);
	    						playerArray.splice(1,1);
	    						playerArray.splice(5,0, moveSub);
	    						console.log(playerArray);
	    						return true;
	    				}
	    			}
	    			}
	    		]);
	    		return true;
	    	}
	    return true;
	   	}
		}
	    
	  }
}


}