var book = {};
book[1] = {
  1: {
    1: {
      pl: 'dupa',
      en: 'arse'
    }
  },

  2: {}
};

console.log(book[1][1][1].pl);
console.log(book[1][1][1].en);

console.log(book.length);
