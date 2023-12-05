import fs from 'fs/promises';
const filePath = await fs.readFile('2.input.txt', 'utf8');

const games = filePath.split('\n');

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

const regex = /(?<red>\d+(?= red))|(?<blue>\d+(?= blue))|(?<green>\d+(?= green))/g;

function extractCountFromRound(round) {
  const result = {
    red: 0,
    blue: 0,
    green: 0,
  };
  const matches = [...round.matchAll(regex)];
  matches.forEach((match) => {
    if (match) {
      const { red, blue, green } = match.groups;
      if (red) {
        result.red = parseInt(red);
      }
      if (blue) {
        result.blue = parseInt(blue);
      }
      if (green) {
        result.green = parseInt(green);
      }
    }
  });
  return result;
}

const gameInfo = games.map((game) => {
  const [_id, _rounds] = game.split(':');
  const gameId = parseInt(_id.replace('Game ', ''));
  const rounds = _rounds.split(';').map((game) => game.trim());

  return {
    gameId,
    rounds,
  };
});

const total1 = gameInfo.reduce((acc, { gameId, rounds }) => {
  function isRoundValid(round, index) {
    const { red, blue, green } = extractCountFromRound(round);
    return red <= maxRed && blue <= maxBlue && green <= maxGreen;
  }

  const isValidGame = rounds.every(isRoundValid);
  return isValidGame ? acc + gameId : acc;
}, 0);

console.log('part 1 total:', total1);

const total2 = gameInfo.reduce((acc, { rounds }) => {
  let maxRed = 0;
  let maxGreen = 0;
  let maxBlue = 0;

  rounds.forEach((round) => {
    console.log('round:', round);
    const { red, green, blue } = extractCountFromRound(round);
    if (red > maxRed) {
      maxRed = red;
    }
    if (green > maxGreen) {
      maxGreen = green;
    }
    if (blue > maxBlue) {
      maxBlue = blue;
    }
  });
  return acc + maxRed * maxGreen * maxBlue;
}, 0);

console.log('part 2 total:', total2);
