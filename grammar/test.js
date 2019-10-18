const fs = require('fs');

var sqlBooks = [];
var sqlChapters = [];
var sqlSentences = [];
var bookChapters = [26, 26, 26, 26, 26, 26, 16, 16, 16, 35, 35, 35];
var books = [
  'Grammar 1',
  'Grammar 2',
  'Grammar 3',
  'Grammar 4',
  'Grammar 5',
  'Grammar 6',
  'Prasal verbs 1',
  'Prasal verbs 2',
  'Prasal verbs 3',
  'Business 1',
  'Business 2',
  'Business 3'
  ];

var db_chapter_id = 1;
var db_sentence_id = 1;
for (var bookId = 1; bookId <= books.length; bookId++) {
  var sql = 'insert into books (id, book) values(?, "?")';
  sql = sql.replace("?", bookId);
  sql = sql.replace("?", books[bookId - 1]);;
  sqlBooks.push(sql);

  var dir = '';
  dir = bookId < 10 ? "0" + bookId : bookId;
  var fileName = dir + "/00.txt";

  // odczyt rozdzialow
  var contents = fs.readFileSync(fileName, 'utf8');
  var chapters = contents.split("\n");

  for (var chapterId = 1; chapterId <= chapters.length; chapterId++) {
    sql = 'insert into chapters (id, bookId, chapterId, title) values(?, ?, ? "?")';
    sql = sql.replace("?", db_chapter_id++);
    sql = sql.replace("?", bookId);
    sql = sql.replace("?", chapterId);
    sql = sql.replace("?", chapters[chapterId - 1]);; 
    sqlChapters.push(sql);

    // console.log("Book nr " + bookId + ', chapter nr ' + chapterId);
    var chapterFile = dir + '/';
    chapterFile = chapterId < 10 ? chapterFile + "0" + chapterId : chapterFile + chapterId;
    chapterFile += '.txt'
    //console.log(chapterFile + " " + bookId + " " + chapterId + " " + db_sentence_id);
    //db_sentence_id++;
    
    var contents = fs.readFileSync(chapterFile, 'utf8');
    var sentences = contents.trim().split('\n');
    var count = Math.floor(sentences.length / 2);

    for (var x = 0; x < count; x++) {
      var sql = 'insert into sentences (id, bookId, chapterId, pl, en) value(?, ?, ?, "?", "?")';

      
      var pl = sentences[x].replace(/\"/g,"'").replace(/\`/g,"'");
      var en = sentences[x + 1 + count].replace(/\"/g,"'").replace(/\`/g,"'");

      sql = sql.replace("?", db_sentence_id++); 
      sql = sql.replace("?", bookId); 
      sql = sql.replace("?", chapterId); 
      sql = sql.replace("?", pl); 
      sql = sql.replace("?", en); 
      sqlSentences.push(sql);
    }

  }

}

console.log(sqlBooks.length);
console.log(sqlChapters.length);
console.log(sqlSentences.length);

//console.log(sqlBooks.join('\n'));
//console.log();
//console.log(sqlChapters.join('\n'));
//console.log();
console.log(sqlSentences.join('\n'));

