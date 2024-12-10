const board = document.getElementById("board");
const shuffleButton = document.getElementById("shuffle");
const message = document.getElementById("message");

let tiles = [];
let emptyTileIndex = 15;
const gridSize = 4; // 4x4 grid
const tileSize = 80; // Size of each tile in pixels

// Initialize the board with tiles
function initializeBoard() {
  tiles = Array.from({ length: gridSize * gridSize - 1 }, (_, i) => i + 1).concat(null); // Add numbers 1 to 15 and one empty space
  emptyTileIndex = tiles.indexOf(null); // Set the empty tile index
  renderBoard();
}

// Render the board dynamically
function renderBoard() {
  board.innerHTML = ""; // Clear the board
  tiles.forEach((tile, index) => {
    const tileElement = document.createElement("div");
    tileElement.classList.add("tile");

    if (tile === null) {
      tileElement.classList.add("empty"); // Empty space
    } else {
      const row = Math.floor((tile - 1) / gridSize);
      const col = (tile - 1) % gridSize;
      tileElement.style.backgroundImage = "url('IMG-20240806-WA0056.jpg')";
      tileElement.style.backgroundSize = `${tileSize * gridSize}px ${tileSize * gridSize}px`;
      tileElement.style.backgroundPosition = `${-col * tileSize}px ${-row * tileSize}px`;
      tileElement.addEventListener("click", () => moveTile(index)); // Attach click handler
    }

    board.appendChild(tileElement);
  });
}

// Shuffle the board
function shuffleBoard() {
  do {
    tiles = tiles
      .slice(0, -1)
      .sort(() => Math.random() - 0.5)
      .concat(null); // Shuffle all except the empty tile
    emptyTileIndex = tiles.indexOf(null); // Ensure the empty space exists
  } while (!isSolvable(tiles)); // Ensure the puzzle is solvable
  renderBoard();
  message.textContent = ""; // Clear the win message
}

// Check if the puzzle is solvable
function isSolvable(arr) {
  let inversions = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] && arr[j] && arr[i] > arr[j]) {
        inversions++;
      }
    }
  }
  const emptyRow = Math.floor(emptyTileIndex / gridSize);
  return (inversions + emptyRow) % 2 === 0;
}

// Move a tile if possible
function moveTile(index) {
  const validMoves = [index - 1, index + 1, index - gridSize, index + gridSize];
  if (validMoves.includes(emptyTileIndex) && isValidMove(index)) {
    tiles[emptyTileIndex] = tiles[index];
    tiles[index] = null; // Set the clicked tile's position to empty
    emptyTileIndex = index; // Update empty tile index
    renderBoard();
    checkWin();
  }
}

// Check if the move is valid (to prevent row wrapping)
function isValidMove(index) {
  const row = Math.floor(index / gridSize);
  const emptyRow = Math.floor(emptyTileIndex / gridSize);
  return row === emptyRow || Math.abs(index - emptyTileIndex) === gridSize;
}

// Check if the puzzle is solved
function checkWin() {
  const isSolved = tiles.slice(0, -1).every((tile, i) => tile === i + 1);
  if (isSolved) {
    message.textContent = "You Win! \n Write use in our website from to get a 10% discount on any service !";
    message.style.color = "lightgreen";
    message.style.fontSize = "24px";
    message.style.fontWeight = "bold";
  }
}

// Attach event listeners
shuffleButton.addEventListener("click", shuffleBoard);

// Initialize the game
initializeBoard();
