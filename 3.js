import fs from 'fs/promises';

const test = false;
const filePath = test ? '3.input.test.txt' : '3.input.txt';
let file = await fs.readFile(filePath, 'utf8');

const array = file.split('\n');


function isDigit( char ){
    return /\d/.test( char );
}

function isSymbol( char ){
    return /[^\d.]/.test( char );
}

function isGear( char ){
    return char === '*';
}

const adjacentCellsDiff = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function getAdjacentCells(array, i, j) {
  return adjacentCellsDiff.map(([x, y]) => {
    const newX = Math.max(0, Math.min(array.length - 1, i + x));
    const newY = Math.max(0, Math.min(array.length - 1, j + y));
    return array[newX][newY];
  })
}

const numbers = [];

let number = '';
let doesHaveSymbolAroundPositionResult = false;

for (let i = 0; i < array.length; i++) {
  for (let j = 0; j < array[i].length; j++) {
    const char = array[i][j];
    if (isDigit(char)) {
      number += char;
      if (getAdjacentCells(array, i, j).some(isSymbol)) {
        doesHaveSymbolAroundPositionResult = true;
      }
    } else if (number.length) {
      if (doesHaveSymbolAroundPositionResult) {
        numbers.push(Number(number));
      }
      doesHaveSymbolAroundPositionResult = false;
      number = '';
    }
  }
}

console.log('Part 1 total:', numbers.reduce((acc, number) => acc + number, 0))


// Part 2
// Find the * that have two numbers around it and multiply those numbers

const gearCells = new Map();
const ratios = [];

for (let i = 0; i < array.length; i++) {
  for (let j = 0; j < array[i].length; j++) {
    const char = array[i][j];
    if (char === '*') {
      gearCells.set([i, j], []);
    }
  }
}

let digitCellIndices = '';
for (let i = 0; i < array.length; i++) {
  for (let j = 0; j < array[i].length; j++) {
    const char = array[i][j];
    if (isDigit(char)) {
      number += char;
      // Can't use getAdjacentCells, need the index of the gear cell
      adjacentCellsDiff.forEach(([x, y]) => {
        const newX = Math.max(0, Math.min(array.length - 1, i + x));
        const newY = Math.max(0, Math.min(array.length - 1, j + y));
        const adjacentChar = array[newX][newY];
        if (isGear(adjacentChar)) {
          digitCellIndices = [newX, newY].join(',');
        }
      })
    } else if (number.length) {
      const finalNumber = Number(number)
      if (digitCellIndices) {
        const gearCell = gearCells.get(digitCellIndices) ?? [];
        if (gearCell) {
          gearCell.push(finalNumber);
          gearCells.set(digitCellIndices, gearCell);
        }
      }
      doesHaveSymbolAroundPositionResult = false;
      digitCellIndices = '';
      number = '';
    }
  }
}

gearCells.forEach((gearCell) => {
  if (gearCell.length === 2) {
    ratios.push(gearCell[0] * gearCell[1]);
  }
})

console.log('Part 2 total:', ratios.reduce((acc, number) => acc + number, 0))