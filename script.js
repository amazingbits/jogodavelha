
let board
const player1 = 'X'
const player2 = 'O'
let currentPlayer = player1
const winnerSequences = [
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,4,8],
	[6,4,2]
]

const box = document.querySelectorAll('.box')

start()

function start() {
	document.querySelector('.gameover-box').classList.remove('show')
	board = Array.from(Array(9).keys())
	for(let i = 0; i < box.length; i++) {
		box[i].innerText = ''
		box[i].style.removeProperty('background-color')
		box[i].addEventListener('click', turnConfirm, false)
	}
}

function turnConfirm(index) {

	if(typeof board[index.target.id] == 'number') {
		turn(board[index.target.id], currentPlayer)
		if(!checkIfWin(board, currentPlayer) && !checkIfDraw()){
			turnPlayer(currentPlayer)
		}
	}

}

function turn(index, player){
	board[index] = player
	document.getElementById(index).innerText = player
	let endGame = checkIfWin(board, player)
	if(endGame) {
		gameOver(endGame)
	}
}

function checkIfWin(board, player) {
	let sequences = board.reduce((array, element, index) => (element === player) ? array.concat(index) : array, [])
	let gameWon = null
	for (let [index, win] of winnerSequences.entries()){
		if(win.every(el => sequences.indexOf(el) > -1)){
			gameWon = {index: index, player: player}
			break
		}
	}
	return gameWon
}

function checkIfDraw() {
	if(emptyBoxes().length == 0){
		document.getElementById('winner').innerHTML = "Empate"
		document.querySelector('.gameover-box').classList.add('show')
		return true
	}else{
		return false
	}
}

function gameOver(objectWinner) {
	for(let index of winnerSequences[objectWinner.index]){
		document.getElementById(index).style.backgroundColor = 'yellow'
	}
	let winner = objectWinner.player == player1 ? 'Player 1 venceu' : 'Player 2 venceu'

	document.getElementById('winner').innerHTML = winner
	document.querySelector('.gameover-box').classList.add('show')

}

function emptyBoxes() {
	return board.filter(s => typeof s == 'number')
}

function turnPlayer(player){
	if(player == player1){
		currentPlayer = player2
	}else{
		currentPlayer = player1
	}
}