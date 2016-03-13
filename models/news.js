var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/scrapedDB');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

var NewsSchema = new Schema({
  title: String
});

var News = mongoose.model('News', NewsSchema);

module.exports = News;
