const overlay = document.querySelector('.overlay');
const rePlay = document.querySelector('.playAgain');
const WORDLENGTH = 5;
let COUNTER = 0;
// let animateddictionary = ["apple", "beach", "chair", "dance", "earth", "fruit", "grape", "house", "igloo", "jolly",
// 		"knife", "lemon", "mango", "navy", "ocean", "pearl", "queen", "radio", "sunny", "table",
// 		"umbra", "vodka", "water", "xerox", "yacht", "zebra", "abuse", "badge", "chair", "dance",
// 		"early", "flute", "grain", "horse", "igloo", "joker", "knock", "lemon", "mango", "night",
// 		"oasis", "peace", "quilt", "radio", "sugar", "table", "uncle", "virus", "wreck", "xenon",
// 		"yield", "zebra", "abide", "baker", "cable", "daisy", "elite", "frank", "glide", "hazel",
// 		"issue", "jolly", "knead", "lemon", "mango", "noise", "olive", "peach", "quiet", "radar",
// 		"siren", "tulip", "uncle", "voice", "world", "xerox", "yield", "zebra", "abuse", "bride",
// 		"charm", "dance", "early", "flame", "grade", "house", "igloo", "joker", "knack", "lemon",
// 		"mango", "novel", "ocean", "piano", "queen", "radio", "sunny", "table", "umbra", "vodka",
// 		"water", "xenon", "yield", "zebra", "acorn", "bloom", "candy", "dream", "eager", "fable",
// 		"glory", "hedge", "ivory", "jolly", "knock", "lemon", "mango", "night", "oasis", "proud",
// 		"quail", "radio", "sugar", "table", "uncle", "virus", "wreck", "xerox", "yield", "zebra",
// 		"abide", "beach", "chair", "dance", "early", "flute", "grain", "horse", "igloo", "joker",
// 		"knack", "lemon", "mango", "noise", "olive", "peace", "quiet", "radar", "siren", "tulip",
// 		"uncle", "vivid", "world", "xerox", "yield", "zebra", "abuse", "badge", "chair", "dance",
// 		"early", "flame", "grape", "house", "igloo", "jolly", "knock", "lemon", "mango", "novel",
// 		"ocean", "pearl", "quiet", "radar", "sugar", "table", "umbra", "vodka", "water", "xerox",
// 		"yield", "zebra", "abide", "bloom", "candy", "dance", "early", "fable", "glory", "hazel",
// 		"issue", "jolly", "knead", "lemonn"	  
// ];

let wordToGuess;
let wordArray;
async function secretWord (){
	const url = 'https://random-word-api.p.rapidapi.com/L/5';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '04bc19bd87mshd399b62baa34ec3p180442jsn9245eaaae5da',
		'X-RapidAPI-Host': 'random-word-api.p.rapidapi.com'
	}
};
try {
	const response = await fetch(url, options);
	const result = await response.json();
	wordToGuess = result.word;
	overlay.style.display = 'none';
	displayGuessWord();
} catch (error) {
	console.error("Sorry The API is not Responding");
}
}


let displayGuessWord = () => {
		wordArray = Array.from(wordToGuess);
		// return wordArray;
};
let gameState = {
	data: Array(6).fill().map(() => Array(5).fill('')),
	row: 0,
	column: 0,
};
let renderGrid = () => {
	for (let i = 0; i < gameState.data.length; i++) {
		for (let j = 0; j < gameState.data[i].length; j++) {
			let gridBox = document.getElementById(`gridbox-${i}-${j}`);
			gridBox.textContent = gameState.data[i][j];
		}
	}
};
let newBox = (parent, row, column, input) => {
	const gridBox = document.createElement('div');
	gridBox.id = `gridbox-${row}-${column}`;
	gridBox.setAttribute('class', 'gridbox');
	gridBox.textContent = input;

	parent.appendChild(gridBox);
	return gridBox;
};


let createAnswer = (ele) => {
	for (let i = 0; i < wordArray.length; i++) {
		text = wordArray[i];
		winningWord(text, ele);
	}
}
let winningWord = ( input, ele) => { 
	const wordBox = document.createElement('div');
	wordBox.setAttribute('class', 'wordbox');
	wordBox.textContent = input;
	ele.appendChild(wordBox);
	return wordBox;
};


let createGrid = (parent) => {
	const container = document.createElement('div');
	container.className = 'display';

	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < 5; j++) {
			newBox(container, i, j);
		}
	}
	parent.appendChild(container);
};

let retrieveWord = () => {
	return gameState.data[gameState.row].reduce((than, now) => than + now).toLowerCase();
};
let correctWord = (word) => {
	return wordToGuess.includes(word);
};

async function validWord (word) {
	const url = `https://dictionary-data-api.p.rapidapi.com/definition/${word}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '04bc19bd87mshd399b62baa34ec3p180442jsn9245eaaae5da',
		'X-RapidAPI-Host': 'dictionary-data-api.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
	return true;
} catch (error) {
	console.error(error);
	return false;
}
}
let showWord = (guess) => {
	
	COUNTER++;
	let row = gameState.row;
	for (let i = 0; i < 5; i++) {
		let gridBox = document.getElementById(`gridbox-${row}-${i}`);
		let letter = gridBox.textContent;
		if (letter === wordToGuess[i]) {
			gridBox.classList.add("correct");
			gridBox.classList.add("flipAnimation");
		} else if (wordToGuess.includes(letter)) {
			gridBox.classList.add("flipAnimation");
			gridBox.classList.add("wrong");
		} else {
			gridBox.classList.add("flipAnimation");
			gridBox.classList.add("empty");

		}
	}
	const winner = wordToGuess === guess;
	const gameEnd = gameState.row === 6;
	if (winner) {

	let loader = document.querySelector('.loader');
	let overview = document.querySelector('.overview');
	let gameEnd = document.querySelector('.gameEnd');
	let answer = document.querySelector('.wordBowl')


	overlay.style.display = 'flex';
	loader.style.display = 'none';
	gameEnd.style.display = 'none';
	overview.style.display = 'flex';

		// alert("winner");
	    createAnswer(answer);
		console.log("winner");
		

	} else if (gameEnd) {
		// alert("gameEnd");
		let  = document.querySelector('.playAgain');
		let gameEnd = document.querySelector('.gameEnd');
		let loader = document.querySelector('.loader');
		let failAnswer = document.querySelector('.failWordBowl');


		loader.style.display = 'none';
		overview.style.display = 'none';
		gameEnd.style.display = 'flex';

	createAnswer(failAnswer);

		createAnswer();
	}

};
let gameEnding = () => {
	if(gameState.row === 6){
		alert('Game ended successfully')
	}
};
gameEnding();
// let colorKeyboard = (word) => {

// 	let buttons = document.querySelectorAll('.aphabet');
// 	for (let i = 0; i < buttons.length; i++){
// 		for(let j = 0; j < 5; j++){
// 			let gridBox = document.getElementById(`gridbox-${row}-${j}`);
// 			let letter = gridBox.textContent;
// 		if (letter === buttons[i].textContent && gridBox.classList.includes('correct')){
// 			buttons[i].classList.add("correct");
// 		}else if(word.includes(buttons[i].textContent) && wordToGuess.includes(buttons[i].textContent)){
// 			buttons[i].classList.add("wrong");
// 		} else if(!wordToGuess.includes(buttons[i].textContent) && word.includes(buttons[i].textContent)){
// 			buttons[i].classList.add("empty");

// 		} 
// 	};
// 	};

	
// };

let isALetter = (key) => {
	return key.length === 1 && key.match(/[a-z]/i);
};

let glitch = (gridBox) => {
	gridBox.forEach(box => {
		gridBox.classList.add("glitch");
		gridBox.addEventListener("animationend", () => {
			gridBox.classList.remove("glitch");
		});
	});
};
let newLetter = (letter) => {
	if (gameState.column === 5  ) {
		for (let i = 0; i < gameState.column; i++){
			let gridBox = document.getElementById(`gridbox-${gameState.row}-${i}`);
			gridBox.classList.add("glitch");
		}
		return;
	}
	
	let gridBox = document.getElementById(`gridbox-${gameState.row}-${gameState.column}`);
	gameState.data[gameState.row][gameState.column] =`${letter}`;
	gridBox.textContent = gameState.data[gameState.row][gameState.column];

	gameState.column++;
};
let purgeLetter = () => {
	if (gameState.column === 0) return;
	gameState.data[gameState.row][gameState.column - 1] = '';
	gameState.column--;
	renderGrid();
};
let evaluate = () => {
	const activeWord = retrieveWord();
	if (gameState.column === 5) {
		if (validWord(activeWord)) {
			showWord(activeWord);
			// colorKeyboard(activeWord);
			gameState.row++;
			gameState.column = 0;
		} else if (!validWord(activeWord)) {
			return;
			showWord(activeWord);
			// gameState.row++;
			gameState.column = 0;
		}else {
			alert('You can doit');

		}
	}
	// colorKeyboard(activeWord);
};
let getInput = () => {
	document.addEventListener('keydown', (e) => {
		let input = e.key;
		let guess = retrieveWord();
		
		switch (input) {
			case 'Enter':

				evaluate(input);

				break;
			case 'Backspace':
				purgeLetter();
				break;
		}
		if(wordToGuess === guess) return;

		if (isALetter(input)) {
			newLetter(input);
		}
	});
	renderGrid();
};

const gamestart = () => {
	let game = document.querySelector('.game');
	createGrid(game);
	getInput();
	secretWord();

};
gamestart();

const inputKeys = document.querySelector('.btns');

inputKeys.addEventListener('click', (e) => {
	
	let key = e.target.getAttribute('data-key');
	if (!e.target.classList.contains('aphabet')) return;
	if (e.target.classList.contains('delete')) {
		 purgeLetter();
		return;
	} else if (e.target.classList.contains('enter')) {
		evaluate(key);
		return;
	} else {
		newLetter(key, e);
	}
	});

let restartGame = () => {

	let game = document.querySelector('.game');
	let gridBox = document.querySelector('.gridbox');
	gridBox.textContent = "";
	gameState.row = 0;
	gameState.column = 0;
	game.innerHTML = "";
	for (let i = 0; i < gameState.data.length; i++) {
		for (let j = 0; j < gameState.data[i].length; j++) {
			if(gameState.data[i][j] !== ""){
				gameState.data[i][j] = '';
			};
		};
	};
};
rePlay.addEventListener('click', () => {
	
	overlay.style.display = 'none';
	restartGame()
	gamestart();
	console.log('gamestart');
});


