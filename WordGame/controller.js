var whosTurn = 1;
var player1Word = '';
var player2Word = '';
var player1Masked = '';
var player2Masked = '';
var play1GuessedWord = '';
var player2GuessedWord = '';

var player1AmountOfGuesses = 0;
var player2AmountOfGuesses = 0;


var characterLength = 5;

setCharacterLength = function() {
	document.getElementById('submit-input').minLength = characterLength;
	document.getElementById('submit-input').maxLength = characterLength;
	document.getElementById('guess-input').minLength = characterLength;
	document.getElementById('guess-input').maxLength = characterLength;
	document.getElementById('character-count').innerHTML = `Word is ${characterLength} letters`;
}

changeCurrentTotal = function(event){
	document.getElementsByClassName('current-type-length')[0].innerHTML = event.target.value.length;
	document.getElementsByClassName('current-type-length')[1].innerHTML = event.target.value.length;
}

toggleTurn = function(){
	whosTurn = whosTurn == 1 ? 2 : 1;
};

submitMyWord = function(event){

	var inputWord = document.getElementById('submit-input').value;

	whosTurn == 1 ? submitPlayer1Word(inputWord) : submitPlayer2Word(inputWord);

	console.log(whosTurn);
	console.log(inputWord);

};

submitPlayer1Word = function(word){
	player1Word = word;

	document.getElementsByClassName('current-type-length')[0].innerHTML = 0;
	document.getElementsByClassName('current-type-length')[1].innerHTML = 0;

	document.getElementById('game-label').innerHTML = "Player 2: Enter Your Word";
	var maskedWord = maskWords(word);
	player1GuessedWord = maskedWord;
	document.getElementById('player-1-word').innerHTML = maskedWord;
	document.getElementById('submit-input').value = '';

	characterLength = word.length;
	setCharacterLength();

	toggleTurn();

};

submitPlayer2Word = function(word){
	
	if ( word.length != characterLength ) {
		alert( 'You Best Damn Put Down ' + characterLength + ' Characters Yo!' );
		return;
	}

	document.getElementsByClassName('current-type-length')[0].innerHTML = 0;
	document.getElementsByClassName('current-type-length')[1].innerHTML = 0;

	player2Word = word;

	document.getElementById('game-label').innerHTML = "Time To Guess Sucka";
	var maskedWord = maskWords(word);
	player2GuessedWord = maskedWord;
	document.getElementById('player-2-word').innerHTML = maskedWord;
	document.getElementById('submit-input').value = '';
	document.getElementById('input-wrapper').className = 'hidden';
	document.getElementById('guess-wrapper').className = 'visible';

	toggleTurn();

};

maskWords = function(word){
	var splitWord = [];
	splitWord = word.split('');
	var maskedWord = '';
	splitWord.forEach(function(letter){
		maskedWord += '*';
	});
	return maskedWord;
};

guessWord = function(word){
	var guess = document.getElementById('guess-input').value;

	// if ( guess.length != characterLength ) {
	// 	alert( 'You Best Damn Put Down ' + characterLength + ' Characters Yo!' );
	// 	return;
	// }

	if (whosTurn != 1) {

		var node = document.createElement("li");                 // Create a <li> node
		var textnode = document.createTextNode(guess); 
		node.appendChild(textnode);  
		document.getElementById('player-2-guess-list').appendChild(node);

		var newlyMaskedWord = compareWords(guess, player1Word, player1GuessedWord);
		player1GuessedWord = newlyMaskedWord;
		document.getElementById('player-1-word').innerHTML = newlyMaskedWord;

		player2AmountOfGuesses++;
		document.getElementById('player-2-guess-amount').innerHTML = player2AmountOfGuesses;

		if (newlyMaskedWord == player1Word){
			document.getElementById('winner').innerHTML = 'Player ' + whosTurn + ' wins!';
			document.getElementById('reset-button').className = "visible";			
		}
	
	} else {

		var node = document.createElement("li");                 // Create a <li> node
		var textnode = document.createTextNode(guess); 
		node.appendChild(textnode);  
		document.getElementById('player-1-guess-list').appendChild(node);

		var newlyMaskedWord = compareWords(guess, player2Word, player2GuessedWord);	
		player2GuessedWord = newlyMaskedWord;	
		document.getElementById('player-2-word').innerHTML = newlyMaskedWord;

		player1AmountOfGuesses++;
		document.getElementById('player-1-guess-amount').innerHTML = player1AmountOfGuesses;

		if (newlyMaskedWord == player2Word){
			document.getElementById('winner').innerHTML = 'Player ' + whosTurn + ' wins!';
			document.getElementById('reset-button').className = "visible";
		}
		
	}

	document.getElementsByClassName('current-type-length')[0].innerHTML = 0;
	document.getElementsByClassName('current-type-length')[1].innerHTML = 0;


	toggleTurn();

};

compareWords = function(guess, word, lettersSoFar){
	var splitWord = word.split('');
	var splitGuess = guess.split('');
	var wordAfterComparison = {};

	for ( var i = 0; i < splitWord.length; i++ ) {
		if (lettersSoFar[i] != '*' || splitWord[i] == splitGuess[i]){

			wordAfterComparison[i] = splitWord[i];
		} else {
			wordAfterComparison[i] = '*';
		}
	}

	return Object.values(wordAfterComparison).join('');
};

reset = function(){
	window.location.reload();
}

