/**
 * @author DennisB
 * @note dependent on underscore lib
 */

// create scope of Class
(function(window){
	//Static variables
	//HangmanGame.staticVariable
	
	//Public Variables
	HangmanGame.prototype.allLettersFound = false;
	HangmanGame.prototype.isGameOver = false;
	
	function HangmanGame(){ 
		var _words = ["happy", "apple", "invisible"]; // private var  - word list
		var _userLetters = []; // private var - user letters - used for returning what letters have been selected
		var _currentWord = ""; // private var - the word needed to be figured out.
		var _numberOfLetters = 0;
		var _currentLetterCount = 0;
		var _numberOfLettersIncorrect = 0;
		
		this.isLetterCorrect = false;
		
		this.buildGame = function(words){
			if(words){
				_words = words;
			}
			
			var ranNum = Math.round(Math.random() * _words.length) - 1;
			_currentWord = _words[ranNum];
			
			// if word had multiple letters reduce reference of number;
			var multipleLetterCondition = 0;
			switch(ranNum){
				case 0:
				case 1:
				multipleLetterCondition = 1;
				break;
				
				case 2:
				multipleLetterCondition = 2;
				break;
			}
			_numberOfLetters = _currentWord.split("").length - multipleLetterCondition;
		};
		
		this.currentWord = function(){
			return _currentWord;
		}
		
		// getter/Setter
		this.userLetters = function(letter){
			// dual purpose functionality - return condition of whether letter is correct and the user letter that are used up (only the letters that are incorrect)
			if(letter){
				// check if letter is correct
				var checkCurrentWord = _currentWord.split("")
				for(var i = 0; i < checkCurrentWord.length; i++){
					if(checkCurrentWord[i] == letter){
						this.isLetterCorrect = true;
						_currentLetterCount++;
						break;
					}else{
						this.isLetterCorrect = false;	
					}
				}
				_userLetters.push(letter);
				
				if(!this.isLetterCorrect) _numberOfLettersIncorrect++;
				
				if(_numberOfLettersIncorrect >= 6) this.isGameOver = true;
				
				if(_currentLetterCount == _numberOfLetters) this.allLettersFound = true;
				
				logger("this.allLettersFound " + this.allLettersFound);
				
			}else{
				return _userLetters;
			}
		}
			
	}
	
	
	// private functions 
	function logger(message){
		if(console){
			console.log(message);
		}else{
			alert(message);
		}
	}
	
	window.HangmanGame = HangmanGame;
	
}(window));