function publish(item, author, callback){
  console.log(item);
  var date = new Date();

  callback(author, date);
}

function messages(author, time){
  var sendTime = time.toLocaleTimeString();
  console.log('Sent from ' + author + ' at ' + sendTime);
}

function articles(author, date){
  var pubDate = date.toDateString();
  console.log('Written by ' + author);
  console.log('Published ' + pubDate);
}

publish('This is a message!', 'Lenny', messages);
publish('Learning how not to be a dick', 'Sir Lyon Richy', articles);