function removeHTML(text) {
  // return escapedHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
  return text.replace(/\</g,'&lt;').replace(/\>/g,'&gt;').replace(/&/g, '&amp;');
}

var test = removeHTML("<dupa>&");
console.log(test);
