var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// Require mongoose
var mongoose = require('mongoose');
// Connect to mongoose
// Change <  > to match your DB name
mongoose.connect('mongodb://localhost/quote');
// Create Schema
var quoteSchema = new mongoose.Schema({
 name: String,
 quote: String,
 created: Date
})
mongoose.model('quote', quoteSchema); // We are setting this Schema in our Models as 'quote'
var quote = mongoose.model('quote') // We are retrieving this Schema from our Models, named 'quote'

app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
// app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  
  // Make call to DB to get all quote
  quote.find({}, function(err, quote) {
    if(err) {
      console.log(err);
      res.render('index', {'error': "Things messed up"});
    } else {
      // console.log(quote);

      // console.log("at render");
      res.render('index', {'quote': quote});
    }
  });
})


app.get('/quotes', function(req, res) {
  
  // Make call to DB to get all quote
  quote.find({}, function(err, quote) {
    if(err) {
      console.log(err);
      res.render('quotes', {'error': "Things messed up"});
    } else {
      // console.log(quote);

      // console.log("at render");
      res.render('quotes', {'quote': quote});
    }
  });
})



// Add quote Request 
app.post('/add_quote', function(req, res) {
    console.log("POST DATA", req.body);

    var newQuote = new quote({name: req.body.name, quote: req.body.quote, created: req.body.created});
   
    newQuote.save(function(err) {
      if(err) {
        console.log(name, quote, created);
        
      } else {        
      
        res.redirect('/quotes');
      }
    });    
})
app.listen(8000, function() {
    console.log("listening on port 8000");
})