// ------------------------------------------------------------------------------------
// Name: Jimmy Klein
// Abstract: Connect Four Project
// ------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------
//                      -----------Connect Four-----------------------
//  Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
//  column until a player gets four-in-a-row (horiz, vert, or diag) or until
//  board fills (tie)
// ------------------------------------------------------------------------------------




// ------------------------------------------------------------------------------------
// Part One: The Board
// Abstract: Declare variables for width, height, player, and make a function for board 
// and the html board and manipulate the DOM in HTML board for columns and rows
// ------------------------------------------------------------------------------------

const WIDTH = 7;
const HEIGHT = 6;
 
 let currentPlayer = 1; // This will active player one or two
 let board = []; // The empty array, array of rows, each row is array of cells  (board[y][x])
 
// Make the board
// makeBoard: create in-JavaScript board structure:
// board = array of rows, each row is array of cells (board[y][x])

 
 function makeBoard() {
   for (let y = 0; y < HEIGHT; y++) {
     board.push(Array.from({ length: WIDTH }));
   }
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
   const board = document.getElementById('board');
 
   // Make column tops (clickable area for adding a piece to that column)
   const top = document.createElement('tr');
   top.setAttribute('id', 'column-top');
   top.addEventListener('click', handleClick);
 
   for (let x = 0; x < WIDTH; x++) {
     const headCell = document.createElement('td');
     headCell.setAttribute('id', x);
     top.append(headCell);
   }
 
   board.append(top);
 
   // Make main part of board
   for (let y = 0; y < HEIGHT; y++) {
     const row = document.createElement('tr');
 
     for (let x = 0; x < WIDTH; x++) {
       const cell = document.createElement('td');
       cell.setAttribute('id', `${y}-${x}`);
       row.append(cell);
     }
 
     board.append(row);
   }
 }
 
 // findSpotForCol: given column x, return top empty y (null if filled) 
 
 function findSpotForCol(x) {
   for (let y = HEIGHT - 1; y >= 0; y--) {
     if (!board[y][x]) {
       return y;
     }
   }
   return null;
 }
 
 // placeInTable: update DOM to place piece into HTML table of board 
 
 function placeInTable(y, x) {
   const piece = document.createElement('div');
   piece.classList.add('piece');
   piece.classList.add(`p${currentPlayer}`);
   piece.style.top = -50 * (y + 2);
 
   const spot = document.getElementById(`${y}-${x}`);
   spot.append(piece);
 }
 



// ------------------------------------------------------------------------------------
// Part Two: Game Announcements and Checking for Win/Loss/Tie
// Abstract: Declare variables for width, height, player, and make a function for board 
// and the html board and manipulate the DOM in HTML board for columns and rows
// ------------------------------------------------------------------------------------

 // endGame: announce game end 
 
 function endGame(msg) {
   alert(msg);
 }
 
 // handleClick: handle click of column top to play piece 
 
 function handleClick(evt) {
   // Get x from ID of clicked cell
   const x = +evt.target.id;
 
   // Get next spot in column (if none, ignore click)
   const y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // Place piece in board and add to HTML table
   board[y][x] = currentPlayer;
   placeInTable(y, x);
   
   // Check for win
   if (checkForWin()) {
     return endGame(`Player ${currentPlayer} won the game! Congratulations!`);
   }
   
   // Check for tie
   if (board.every(row => row.every(cell => cell))) {
     return endGame('The Game is a Tie!');
   }
     
   // Switch players
   currentPlayer = currentPlayer === 1 ? 2 : 1;
 }
 
 // checkForWin: check board cell-by-cell for "does a win start here?" 
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currentPlayer
     );
   }
 
   for (let y = 0; y < HEIGHT; y++) {
     for (let x = 0; x < WIDTH; x++) {
       // Get "check list" of 4 cells (starting here) for each of the different
       // ways to win
       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
 
       // Find winner (only checking each win-possibility as needed)
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();
 