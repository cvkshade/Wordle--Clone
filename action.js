let dictionary = ['crane', 'spoon', 'house', 'lover'];

let gameState = {
	grid: Array(6).fill().map(() => Array(5).fill('')),
	row: 0,
	column: 0,
	secretWord: dictionary[Math.floor(Math.random() * (dictionary.length - 1))],
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
		console.log(gridBox);
		if (letter === gameState.secretWord[i]) {
			gridBox.classList.add("correct");
		} else if (gameState.secretWord.includes(letter)) {
			gridBox.classList.add("wrong");
		} else {
			gridBox.classList.add("empty");

		}
	}
	const winner = gameState.secretWord === guess;
	const gameEnd = gameState.row === 5;
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
	console.log(letter)
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
		} else {
			alert('You can doit');
		}
		// console.log(activeWord)
	}
};
let getInput = () => {
	document.addEventListener('keypress', (e) => {
		let input = e.key;
		switch (input) {
			case 'Enter':
				console.log(gameState.grid.textContent);

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
	getInput();
	console.log(gameState.secretWord);
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