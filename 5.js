import fs from 'fs/promises';

const test = false;
const filePath = test ? '5.input.test.txt' : '5.input.txt';
let file = await fs.readFile(filePath, 'utf-8');

const [seedsString, ...mapStrings] = file.split('\n\n');

// seeds
const seeds = seedsString.replace('seeds: ', '').split(' ').map(Number);

let mappings = [];
for (let i = 0; i < mapStrings.length; i++) {
  const mapLines = mapStrings[i].split('\n');
  let ranges = [];
  for (let j = 1; j < mapLines.length; j++) {
    const [toStart, fromStart, range] = mapLines[j].split(' ').map(Number);
    ranges.push({
      fromStart,
      fromEnd: fromStart + range,
      offset: toStart - fromStart,
    });
  }
  mappings.push(ranges);
}

function trackSeed(seed) {
  let value = seed;
  for (let i = 0; i < mappings.length; i++) {
    for (let j = 0; j < mappings[i].length; j++) {
      const { fromStart, fromEnd, offset } = mappings[i][j];
      // if in range, update value with the toStart value + the difference between the fromStart and the value
      if (value >= fromStart && value <= fromEnd) {
        value = value + offset;
        break;
      }
    }
  }
  return value;
}

/**
 * Part 1 - Array of seeds
 * @returns {number} lowest location
 */
async function part1() {
  let location = Infinity;
  for (let i = 0; i < seeds.length; i++) {
    const newLocation = trackSeed(seeds[i]);
    if (newLocation < location) {
      location = newLocation;
    }
  }

  console.log('Part 1 result:', location, ', test:', test);
  return location;
}

part1();

/**
 * Part 2 - Range of seeds. This does take 5+ minutes to run.
 * OK BYEEEEEEE!
 * @returns {number} lowest location
 */
function part2() {
  let lowestLocation = Infinity;

  for (let i = 0; i < seeds.length; i += 2) {
    // The range of seeds is from seeds[i] to seeds[i+1] inclusive
    for (let j = seeds[i]; j <= seeds[i] + seeds[i + 1]; j++) {
      const location = trackSeed(j); // Get the final location for the seed

      // If the location is lower than any seen so far, update lowestLocation
      if (location < lowestLocation) {
        lowestLocation = location;
        console.log('lowestLocation:', lowestLocation);
      }
    }
  }
  console.log('Part 2 result:', lowestLocation, ', test:', test);
  return lowestLocation;
}
part2();
