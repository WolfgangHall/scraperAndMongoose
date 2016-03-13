var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');
var jade = require('jade');
var PORT = process.env.PORT || 3000;

var News = require('./models/news.js');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'jade');



var scrapeSite = 'https://news.bitofnews.com';


app.get('/', function (req, res) {

  News.find({})
  .exec(function(err, dbNews){
    if (err) {
      res.send(err);
    } else {
    res.send(dbNews);
    }
  });
});



app.get('/scrape', function(req, res) {
  request(scrapeSite, function(error, response, html) {
    var $ = cheerio.load(html);
    var title;
    $('h4.entry-title').each(function(i, element) {

      title = $(this).children('a').attr('title');

      var newTitle = new News(title);

      newTitle.save(function(err, doc){
        if (err) {
          return res.send("ERROR: " + err);
        }

        res.redirect('/');
      })
    });
  });
});



app.listen(PORT, function (){
  console.log("Listening on %s", PORT);
});
