console.clear();
const date = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));

const day = date.getDate();

console.log('Day ' + day);
import(`./${day}.js`);
