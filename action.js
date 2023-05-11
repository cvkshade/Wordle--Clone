const loader = document.querySelector('.overlay');
const WORDLENGTH = 5;
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
	console.log(result.word);
	wordToGuess = result.word;
	loader.style.display = 'none';
} catch (error) {
	console.error(error);
}
}

secretWord();
// let getWord = () => {
// 	if(dictionary.length === 0) return;
// 	if (dictionary.length > 0) {
// 		loader.style.display = 'none';
// 		wordToGuess = dictionary[Math.floor(Math.random() * dictionary.length - 1)];
// 		return wordToGuess;
// 	}
	
// }

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
let showWord = (guess) => {
	
	let row = gameState.row;
	for (let i = 0; i < 5; i++) {
		let key = document.querySelector('aphabet')
		let gridBox = document.getElementById(`gridbox-${row}-${i}`);
		let letter = gridBox.textContent;
		if (letter === wordToGuess[i]) {
			gridBox.classList.add("correct");
			gridBox.classList.add("animate__flipInX");
		} else if (wordToGuess.includes(letter)) {
			gridBox.classList.add("animate__flipInX");
			gridBox.classList.add("wrong");
		} else {
			gridBox.classList.add("animate__flipInX");
			gridBox.classList.add("empty");

		}
	}
	const winner = wordToGuess === guess;
	const gameEnd = gameState.row === 6;
	if (winner) {
		alert("winner");
	} else if (gameEnd) {
		alert("gameEnd");
	}

};
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
	if (gameState.column === 5) {
		return;}

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
	if (gameState.column === 5) {
		const activeWord = retrieveWord();
		if (correctWord(activeWord)) {
			showWord(activeWord);
			gameState.row++;
			gameState.column = 0;
		} else if (!correctWord(activeWord)) {
			showWord(activeWord);
			gameState.row++;
			gameState.column = 0;
		}else {
			alert('You can doit');

		}
	}
};
let getInput = () => {
	document.addEventListener('keydown', (e) => {
		let input = e.key;
		let guess = retrieveWord();
		
		switch (input) {
			case 'Enter':

				evaluate();

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
		evaluate();
		return;
	} else {
		newLetter(key)
	}
	let gridBox = document.querySelectorAll(`gridbox-${gameState.row}-${gameState.column}`);
		for(let i = 0; i < WORDLENGTH; i++) {
			if(key === gridBox.textContent){
			e.target.classList.add('correct');
		} else if (wordToGuess[i].contains(key)){
			e.target.classList.add('wrong');
		}else if (!wordToGuess[i].contains(key)){
			e.target.classList.add('empty');
		}
}});

const buttons = document.querySelectorAll('[data-key');

