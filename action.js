const loader = document.querySelector('.overlay');



let dictionary = [];
let wordToGuess;
async function secretWord (){
	const url = 'https://random-words5.p.rapidapi.com/getMultipleRandom?count=15&wordLength=5';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '038067ceaamshd28482b59046714p19a668jsn3602b0ecd893',
		'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	dictionary = [...result];
	getWord();
} catch (error) {
	console.error(error);
}
}

let getWord = () => {
	if(dictionary.length === 0) return;
	if (dictionary.length > 0) {
		wordToGuess = dictionary[Math.floor(Math.random() * dictionary.length - 1)];
		loader.style.display = 'none';
		return wordToGuess;
	}


	
}

let gameState = {
	grid: Array(6).fill().map(() => Array(5).fill('')),
	row: 0,
	column: 0,
};
let renderGrid = () => {
	for (let i = 0; i < gameState.grid.length; i++) {
		for (let j = 0; j < gameState.grid[i].length; j++) {
			let gridBox = document.getElementById(`gridbox-${i}-${j}`);
			gridBox.textContent = gameState.grid[i][j];
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
	return gameState.grid[gameState.row].reduce((than, now) => than + now).toLowerCase();
};
let correctWord = (word) => {
	return dictionary.includes(word);
};
let showWord = (guess) => {
	
	let row = gameState.row;
	for (let i = 0; i < 5; i++) {
		let gridBox = document.getElementById(`gridbox-${row}-${i}`);
		let letter = gridBox.textContent;
		if (letter === wordToGuess[i]) {
			gridBox.classList.add("correct");
			gridBox.classList.add("tileAnimation");
		} else if (wordToGuess.includes(letter)) {
			gridBox.classList.add("tileAnimation");
			gridBox.classList.add("wrong");
		} else {
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
let newLetter = (letter) => {
	if (gameState.column === 5) {
		gameState.row++;
		return;}
	let gridBox = document.getElementById(`gridbox-${gameState.row}-${gameState.column}`);
	gridBox.innerHTML = letter;
	gameState.grid[gameState.row][gameState.column] =`${letter}`;
	gameState.column++;
};
let purgeLetter = () => {
	if (gameState.column === 0) return;
	gameState.column--;

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
	document.addEventListener('keypress', (e) => {
		let input = e.key;
		switch (input) {
			case 'Enter':

				evaluate();

				break;
			case 'Backspace':
				purgeLetter();
				break;
		}

		if (isALetter(input)) {
			newLetter(input);
		}
	});
	renderGrid();
};

const gamestart = () => {
	let game = document.querySelector('.game');
	createGrid(game);
	secretWord();
	getInput();
};
gamestart();


const inputKeys = document.querySelector('.btns');



// let guess = "";

// Event Listener
inputKeys.addEventListener('click', (e) => {
	let key = e.target.textContent;
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



});