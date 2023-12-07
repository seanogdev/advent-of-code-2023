import fs from 'fs/promises';

const test = true;
const filePath = test ? '7.input.test.txt' : '7.input.txt';
const file = await fs.readFile(filePath, 'utf-8');

const lines = file.split('\n');

const cardsInOrder = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

function calculateHand(hand) {
  const cards = hand
    .split('')
    .sort((a, b) => cardsInOrder.indexOf(a) - cardsInOrder.indexOf(b))
    .map((card) => card.trim());
  console.log('cards:', cards);
  const highestCards = cards[0];

  switch (cards) {
    /* Five of a kind, where all five cards have the same label: AAAAA */
    case cards.every((card) => card === cards[0]): {
    }

    /* Four of a kind, where four cards have the same label and one card has a different label: AA8AA */
    /* Full house, where three cards have the same label, and the remaining two cards share a different label: 23332 */
    /* Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98 */
    /* Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432 */
    /* One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4 */
    /* High card, where all cards' labels are distinct: 23456 */
  }
}

lines.forEach((line) => {
  const [hand, score] = line.split(' ');

  console.log({ hand, score, result: calculateHand(hand) });
});
