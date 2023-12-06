import fs from 'fs/promises';

const test = false;
const filePath = test ? '5.input.test.txt' : '5.input.txt';
const file = await fs.readFile(filePath, 'utf-8');
const lines = file.split('\n');

const seeds = lines[0].split(' ').map(Number).filter(Boolean);

const maps = [];

// Start at the mappings
let i = 2;
while (i < lines.length) {
  // skip the title
  maps.push([]);
  i++;
  while (i < lines.length && lines[i] !== '') {
    const line = lines[i].split(' ').map(Number);
    maps[maps.length - 1].push(line);
    i++;
  }
  // sort by the from column
  maps[maps.length - 1].sort((a, b) => a[1] - b[1]);
  i++;
}

/**
 * Part 1 - Array of seeds
 * @returns {number} lowest location
 */
function part1() {
  let locations = [];
  for (const seed of seeds) {
    let location = seed;
    // if its not in any mappings, then it's the last defined location
    for (const map of maps) {
      for (const [to, from, range] of map) {
        const isInFromRange = location >= from && location <= from + range;
        if (isInFromRange) {
          location = to + (location - from);
          break;
        }
      }
    }
    locations.push(location);
  }
  const lowestLocation = Math.min(...locations);
  return lowestLocation;
}

console.log({ 'Part 1': part1() });

/**
 * Part 2 - Range of seedRanges.
 * @returns {number} lowest location
 */
function part2() {
  let seedRanges = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push([seeds[i], seeds[i] + seeds[i + 1]]);
  }

  for (let map of maps) {
    let newSeeds = [];
    while (seedRanges.length > 0) {
      let isInRange = false;

      const [seedRangeStart, seedRangeEnd] = seedRanges.pop();

      for (const [rangeTo, rangeFrom, range] of map) {
        let minRangeInMap = Math.max(seedRangeStart, rangeFrom);
        let maxRangeInMap = Math.min(seedRangeEnd, rangeFrom + range);

        if (minRangeInMap < maxRangeInMap) {
          isInRange = true;
          newSeeds.push([minRangeInMap - rangeFrom + rangeTo, maxRangeInMap - rangeFrom + rangeTo]);

          // possible ranges
          if (minRangeInMap > seedRangeStart) {
            seedRanges.push([seedRangeStart, minRangeInMap]);
          }

          if (seedRangeEnd > maxRangeInMap) {
            seedRanges.push([maxRangeInMap, seedRangeEnd]);
          }
          break;
        }
      }
      if (!isInRange) {
        newSeeds.push([seedRangeStart, seedRangeEnd]);
      }
    }
    seedRanges = newSeeds;
  }

  const lowestLocation = Math.min(...seedRanges.map(([s, e]) => s));
  return lowestLocation;
}

console.log({ 'Part 2': part2() });
