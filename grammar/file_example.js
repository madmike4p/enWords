const fs = require('fs');

var fileName = "phrasal.txt";
var type = 0;

var contents = fs.readFileSync(fileName, 'utf8');

var tab = contents.split("\n");

var i = 0;
while (tab.length > 0) {
  var newTab = tab.splice(0, 5);
  console.log();
  console.log(newTab);
  i += 1;
  break;
}

console.log(i);
