import { time } from 'console';
import fs from 'fs/promises';

const test = false;
const filePath = test ? '6.input.test.txt' : '6.input.txt';
const file = await fs.readFile(filePath, 'utf-8');

const lines = file.split('\n');

function part1() {
  const races = [];
  const [times, distances] = lines.map((line) => {
    const [_, numbers] = line.split(':');
    return numbers.trim().split(' ').filter(Boolean).map(Number);
  });

  times.forEach((time, i) => {
    races.push([time, distances[i]]);
  });
  let totalWays = [];

  for (const [time, distance] of races) {
    let possibilities = 0;
    let holdDownDuration = 0;

    while (holdDownDuration < time) {
      // The distance can travel in the time left
      if (holdDownDuration * (time - holdDownDuration) > distance) {
        possibilities += 1;
      }
      holdDownDuration++;
    }
    totalWays.push(possibilities);
  }

  return totalWays.reduce((acc, curr) => acc * curr, 1);
}

console.log({ 'Part 1': part1() });

function part2() {
  const races = [];
  const [times, distances] = lines.map((line) => {
    const [_, numbers] = line.split(':');
    return [Number(numbers.trim().split(' ').filter(Boolean).join(''))];
  });

  times.forEach((time, i) => {
    races.push([time, distances[i]]);
  });

  let totalWays = [];

  for (const [time, distance] of races) {
    let possibleWays = 0;
    let holdDownDuration = 0;

    while (holdDownDuration < time) {
      if (holdDownDuration * (time - holdDownDuration) > distance) {
        possibleWays += 1;
      }
      holdDownDuration++;
    }
    totalWays.push(possibleWays);
  }

  return totalWays.reduce((acc, curr) => acc * curr, 1);
}

console.log({ 'Part 2': part2() });
