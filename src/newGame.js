export default function newGame() {
  const grid = []
  const mines = new Set();
  while (mines.size < 10) {
    mines.add(Math.floor(Math.random() * 100));
  }
  for (let i = 0; i < 100; i++) {
    const adjacentMines = getAdjacentMines(i, mines);
    grid.push({
      id: i + 1,
      mine: mines.has(i),
      uncovered: false,
      flag: false,
      minesNear: adjacentMines
    });
  }
  return grid;
}

function getAdjacentMines(cellId, mineSet) {
  let count = 0;
  const adjacentCells = getAdjacentCells(cellId);
  adjacentCells.forEach(cell => {
    if (mineSet.has(cell)) {
      count++;
    }
  });
  return count;
}

function getAdjacentCells(cellId) {
  const adjacentCells = [];
  const row = Math.floor(cellId / 10);
  const col = cellId % 10;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const adjacentRow = row + i;
      const adjacentCol = col + j;
      if (adjacentRow >= 0 && adjacentRow <= 9 && adjacentCol >= 0 && adjacentCol <= 9) {
        const adjacentCellId = adjacentRow * 10 + adjacentCol;
        if (adjacentCellId !== cellId) {
          adjacentCells.push(adjacentCellId);
        }
      }
    }
  }
  return adjacentCells;
}
