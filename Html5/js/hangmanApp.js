/**
 * @author Dennis Biron
 */

// Global Variables
	var canvas;
	var stage;
	var stageWidth;
	var stageHeight;
	var debug = true;
	
	var update = true; // boolean - update display
	var start = true; // boolean - game started
	
	var myHangmanGame; // game object
	
	var startButton; // Start button instance 
	
	var gameTitle; // text title 
	
	var gameLettersDisplay; // container for letter displayed
	
	var hangmanPanel; // hangman display
	
	var lettersUserPanel; // display of letters used
	
	var HANGMAN_PANEL_YPOS; // x and y position
	var HANGMAN_PANEL_XPOS;
	
	var canvasRef = document.getElementById('mainCanvas');	// hook to canvas reference
	var letterFieldEle = document.getElementById('letterField'); // reference to letter textbox
	var submitLetterBtnEle = document.getElementById('submitLetterBtn'); // reference to submit button

//initialize call	
	init(canvasRef);

	function init(canvas){
		// get instance of stage and add listener to Ticker - Provides a centralized tick or heartbeat broadcast at a set interval.
		// Note: The default is 20 FPS.
		stage = new Stage(canvas);
		stage.enableMouseOver();
		stageWidth =  canvas.width; //should be 700;
		stageHeight =  canvas.height; // should be 675;
		
		HANGMAN_PANEL_YPOS = stageHeight/2 - 150;
		HANGMAN_PANEL_XPOS = stageWidth/2 - 200;
		
		myHangmanGame = new HangmanGame();
		
		myHangmanGame.buildGame();
		
		submitLetterBtnEle.onclick = onSubmitLetter;
		
	 	Ticker.addListener(window);
	} 
	
	// animation tick event
	function tick(){
		if(update){ // update stage
			stage.update();
			update = false;	
		}
		
		if(start){
			onStart();
			start = false;
		}
	
	}
	
	// start function
	function onStart(){
		//createBackground(); // create background
		
		createTitle("Hangman"); // create title text
		
		createStartButton(); // create startbutton
		
		createHangmanPanel(); // create hangman panel with elements
		
		createLettersDisplay(); // create letters display
		
		createLettersUserPanel(); // create Letters User Panel
		
	}
	
	// create function for creating background area - not used at this time
	function createBackground(){
		var bg = createSquare(stageWidth, stageHeight, 0, 0, null, Graphics.getRGB(0,0,0,0));
		stage.addChild( bg );
		update = true;
	}
	
	// create title instance - can be updated throughout
	function createTitle(text){
		if(gameTitle){
			stage.removeChild(gameTitle);
		}
		gameTitle = new Text();
		gameTitle.text = text;
		gameTitle.font = "bold 32px Arial";
		gameTitle.x = 20;
		gameTitle.y = 32 + 10;
		stage.addChild(gameTitle);
		
	}
	
	// create letters - references to the letter in the word
	function createLettersDisplay(text){
		if(gameLettersDisplay){
			stage.removeChild(gameLettersDisplay);
		}
		gameLettersDisplay = new Text();
		gameLettersDisplay.text = text; // ;
		gameLettersDisplay.font = "bold 42px Arial";
		gameLettersDisplay.x = 20;
		gameLettersDisplay.y = 550;
		stage.addChild(gameLettersDisplay);
		update = true;
	}
	
	function createLettersUserPanel(text){
		if(lettersUserPanel){
			stage.removeChild(lettersUserPanel);
		}
		lettersUserPanel = new Text();
		lettersUserPanel.text = text; // ;
		lettersUserPanel.font = "bold 12px Arial";
		lettersUserPanel.x = 300;
		lettersUserPanel.y = 550;
		stage.addChild(lettersUserPanel);
		update = true;
	}
	
	// create start button - text and event handler for onPress
	function createStartButton(){
		startButton = new Container();
		var startButtonBG = createSquare(100, 25, 0, 0, Graphics.getRGB(255,255,255,1), Graphics.getRGB(0,0,0,1), 12);
		startButton.addChild( startButtonBG );
		
		var startLabel = new Text();
		startLabel.text = "Start";
		startLabel.font = "bold 12px Arial";
		
		startButton.addChild( startLabel );
		startLabel.x = 100/2 - startLabel.text.length * 3;
		startLabel.y = 25/2 + 11/2;
		
		startButton.x = stageWidth/2 - 100/2;
		startButton.y = stageHeight/2 - 25/2;
		stage.addChild( startButton );
		startButton.onPress = onStartButtonPress;
		update = true;
	}
	
	// create hangman panel - with all elements
	function createHangmanPanel(){
		hangmanPanel = new Container();
		
		var head = createCircle(25, 0, 0, Graphics.getRGB(0,0,0,1), Graphics.getRGB(0,0,0,1));
		hangmanPanel.addChild(head);
		head.alpha = 0;
		
		var arm1 = createSquare(10, 80, -45, 40, Graphics.getRGB(0,0,0,1), Graphics.getRGB(0,0,0,1) );
		hangmanPanel.addChild(arm1);
		arm1.alpha = 0;
		
		var body = createSquare(10, 120, -5, 30, Graphics.getRGB(0,0,0,1), Graphics.getRGB(0,0,0,1) );
		hangmanPanel.addChild(body);
		body.alpha = 0;
		
		var arm2 = createSquare(10, 80, 40, 40, Graphics.getRGB(0,0,0,1), Graphics.getRGB(0,0,0,1) );
		hangmanPanel.addChild(arm2);
		arm2.alpha = 0;
		
		var leg1 = createSquare(10, 100, -38, 150, Graphics.getRGB(0,0,0,1), Graphics.getRGB(0,0,0,1) );
		hangmanPanel.addChild(leg1);
		leg1.alpha = 0;
		
		var leg2 = createSquare(10, 100, 30, 150, Graphics.getRGB(0,0,0,1), Graphics.getRGB(0,0,0,1) );
		hangmanPanel.addChild(leg2);
		leg2.alpha = 0;
		
		var nooseTop = createSquare(160, 20, -5, -80, Graphics.getRGB(0,0,0,1), Graphics.getRGB(0,0,0,1) );
		hangmanPanel.addChild(nooseTop);
		
		var nooseLeft = createSquare(20, 400, 140, -80, Graphics.getRGB(0,0,0,1), Graphics.getRGB(0,0,0,1) );
		hangmanPanel.addChild(nooseLeft);
		
		var nooseBottom = createSquare(350, 20, -80, 300, Graphics.getRGB(0,0,0,1), Graphics.getRGB(0,0,0,1) );
		hangmanPanel.addChild(nooseBottom);
		
		var noose = createSquare(20, 40, -10, -80, Graphics.getRGB(0,0,0,1), Graphics.getRGB(0,0,0,1) );
		hangmanPanel.addChild(noose);
		
		hangmanPanel.x = HANGMAN_PANEL_XPOS;
		hangmanPanel.y = -1000; //stageHeight/2 - 200;
		stage.addChild(hangmanPanel);
	}
	
	// handler for button press of start button
	function onStartButtonPress(e){
		Tween.get(hangmanPanel).wait(100).to({y:HANGMAN_PANEL_YPOS}, 500).call(onHangmanPanelAppear);
		Tween.get(startButton).to({alpha:0, y:-100}, 500);
	}
	
	// handle call to create letters from selected word
	function onHangmanPanelAppear(){
		var word = myHangmanGame.currentWord();
		var wordLength = word.length;
		var displayWordPadding = "";
		
		//console.log( myHangmanGame.userLetters() );
		
		for(var i = 0; i < wordLength; i++){
			
			var selectedLetter = "";
			
			for(var x = 0; x < myHangmanGame.userLetters().length; x++){
				
				if(word[i] == myHangmanGame.userLetters()[x]){
					selectedLetter = word[i];
					break;
				}
			}
			//console.log( word[i] );
			if(selectedLetter == ""){
				displayWordPadding += " _ ";
			}else{
				displayWordPadding += " " + selectedLetter + " ";
			}
			
		}
		
		createLettersDisplay(displayWordPadding);
		
		// display text input box
		document.getElementById("letterFields").style.visibility = "visible";
		
	}
	
	// handler for input box button
	function onSubmitLetter(){
		
		if(myHangmanGame.isGameOver || myHangmanGame.allLettersFound) return;
		
		//console.log("Clicked " + letterFieldEle.value);
		
		myHangmanGame.userLetters(String(letterFieldEle.value).toLowerCase())
		 
		//console.log("userletter " + myHangmanGame.userLetters());
		
		onHangmanPanelAppear();
		
		if(!myHangmanGame.isLetterCorrect){
			for(var i = 0; i < hangmanPanel.getNumChildren(); i++){
				if(hangmanPanel.children[i].alpha == 0){
					hangmanPanel.children[i].alpha = 1;
					update = true;
					break;
				}
			}
		}
		
		createLettersUserPanel("Letters Used: " + myHangmanGame.userLetters())
		
		if( myHangmanGame.isGameOver || myHangmanGame.allLettersFound) {
			var status = "";
			console.log("GAME OVER");
			status = "GAME OVER - ";
			if(myHangmanGame.allLettersFound){
				console.log("You Won");
				status = status + " You Won.";
			}else{
				console.log("You Lost");
				status = status + " You Lost.";
			}
			
			createTitle("Hangman - " + status);
		}
	}
	
// utility for creating graphics and text
	function createSquare(width, height, x, y, fillColor, strokeColor, radius){
		var square;
		var g = new Graphics();
		
		if(strokeColor){
			g.setStrokeStyle(1);
			g.beginStroke(strokeColor);
			//if(debug) console.log("stroke Color " + strokeColor); 
		}
		
		if(fillColor){
			g.beginFill(fillColor);
			//if(debug) console.log("fill Color " + fillColor); 
		}
		
		if(radius){
			g.drawRoundRect(x, y, width, height, radius);
		}else{
			g.drawRect(x, y, width, height);
		}
		
		g.endFill();
		square = new Shape(g);
		return square;
	}
	
	function createCircle(radius, x, y, fillColor, strokeColor){
		var circle;
		var g = new Graphics();
		
		if(strokeColor){
			g.setStrokeStyle(1);
			g.beginStroke(strokeColor);
			//if(debug) console.log("stroke Color " + strokeColor); 
		}
		
		if(fillColor){
			g.beginFill(fillColor);
			//if(debug) console.log("fill Color " + fillColor); 
		}
		
		g.drawCircle(x, y, radius);
		g.endFill();
		circle = new Shape(g);
		return circle;
	}
	
	function createText(text, fontSettings, hexColor, x, y){
		var txtField = new Text(text, fontSettings, hexColor); //"20px Arial" "#000000"
		txtField.x = x;
		txtField.y = y;
		txtField.width = 100;
		txtField.height = 20;
		txtField.font = fontSettings;
		txtField.color = hexColor;
		txtField.align = "left";
		return txtField;
	}
