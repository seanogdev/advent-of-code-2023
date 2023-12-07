import fs from 'fs/promises';

const test = true;
const filePath = test ? '7.input.test.txt' : '7.input.txt';
const file = await fs.readFile(filePath, 'utf-8');

const lines = file.split('\n');

const cardsInOrder = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

function isEq(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function getCardInOrderValue(card) {
  return cardsInOrder.indexOf(card);
}

function sortByCardsInOrder(a, b) {
  for (let i = 0; i < a.hand.length; i++) {
    if (a.hand[i] !== b.hand[i]) {
      return getCardInOrderValue(a.hand[i]) - getCardInOrderValue(b.hand[i]);
    }
  }
}

function calculateHandScore(hand) {
  const counts = Object.values(
    hand.split('').reduce((acc, card) => {
      acc[card] = acc[card] ? acc[card] + 1 : 1;
      return acc;
    }, {}),
  ).sort();

  if (isEq(counts, [5])) {
    return 7;
  }
  if (isEq(counts, [1, 4])) {
    return 6;
  }
  if (isEq(counts, [2, 3])) {
    return 5;
  }
  if (isEq(counts, [1, 1, 3])) {
    return 4;
  }
  if (isEq(counts, [1, 2, 2])) {
    return 3;
  }
  if (isEq(counts, [1, 1, 1, 2])) {
    return 2;
  }
  return 1;
}

const hands = lines.map((line) => {
  const [hand, bid] = line.split(' ');
  const handScore = calculateHandScore(hand);

  return {
    bid,
    hand: hand.split(''),
    handScore,
  };
});

const sortedHands = hands.sort((a, b) => {
  // If the hand scores are equal,
  // sort by the cards in order of value
  if (a.handScore === b.handScore) {
    return sortByCardsInOrder(a, b);
  }
  return a.handScore - b.handScore;
});

const part1Total = sortedHands.reduce((acc, hand, index) => {
  return acc + hand.bid * (index + 1);
}, 0);

console.log('Part 1:', part1Total);
