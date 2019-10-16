var date = new Date();
console.log(date);
var dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
console.log(dateStr);

var tab = [];
for (var x = 0; x < 450; x++) {
  tab.push(x);
}


function shuffle(array) {
  var counter = array.length;
  while (counter > 0) {
    var index = Math.floor(Math.random() * counter);
    counter--;
    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
}

shuffle(tab);

console.log(tab.join(" "));

while (tab.length > 0) {
  var smallTab = tab.splice(0, 100);
  console.log();
  console.log(smallTab.join(" "));
}
:w

