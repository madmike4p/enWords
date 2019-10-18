const fs = require('fs');

var fileName = "01/01.txt";
var contents = fs.readFileSync(fileName, 'utf8');
var tab = contents.trim().split('\n');
var count = Math.floor(tab.length / 2);

for (var x = 0; x < count; x++) {
  console.log(tab[x]);
  console.log(tab[x + 1 +  count]);
  console.log();
}
