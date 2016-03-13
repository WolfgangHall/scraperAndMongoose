var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');
var jade = require('jade');
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'jade');


mongoose.connect('mongodb://localhost/scrapedDB');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});




var scrapeSite = 'https://news.bitofnews.com';

request(scrapeSite, function(error, response, html) {
  var $ = cheerio.load(html);

  var result = [];

  $('h4.entry-title').each(function(i, element){
    var title = $(this).children('a').attr('title');


    result.push({
      title: title
    });
  });
  console.log(result);
});



app.get('/', function (req, res) {
  res.render('index');
});

app.listen(PORT, function (){
  console.log("Listening on %s", PORT);
});