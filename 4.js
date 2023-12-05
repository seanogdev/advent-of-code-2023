import fs from 'fs/promises';

const test = false;
const filePath = test ? '4.input.test.txt' : '4.input.txt';
let file = await fs.readFile(filePath, 'utf8');

const array = file.split('\n');

function calculateCountOfMatchingNumbers(winningNumbers, userNumbers) {
  return winningNumbers.filter((winningNumber) => userNumbers.includes(winningNumber));
}

const cards = array.map((line) => {
  const [name, numbers] = line.split(': ');
  const [winningNumbers, userNumbers] = numbers
    .split(' | ')
    .map((numbers) => numbers.split(' ').filter(Boolean).map(Number));
  const matches = calculateCountOfMatchingNumbers(winningNumbers, userNumbers);
  return {
    cardId: Number(name.replace('Card', '').trim()),
    matchCount: matches.length,
  };
});

// 1 point for the first score
// double the score for each additional score
function calculatePointScore(matchCount) {
  return matchCount === 0 ? 0 : Math.pow(2, matchCount - 1);
}

function part1() {
  const score = [...cards].reduce((acc, { cardId, matchCount }) => {
    const matchResult = calculatePointScore(matchCount);
    return acc + matchResult;
  }, 0);
  return score;
}
console.log('Part 1', part1());

function createRewardCards(card, cards) {
  return Array(card.matchCount)
    .fill(null)
    .map((_, index) => {
      return cards[card.cardId + index];
    });
}

function part2() {
  let index = 0;
  while (index < cards.length) {
    const card = cards[index];
    if (card.matchCount) {
      cards.push(...createRewardCards(card, cards));
    }
    index++;
  }
  return index;
}

console.log('Part 2', part2());
