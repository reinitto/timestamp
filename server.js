// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  
  res.json({greeting: 'hello API'});
});

//My ugly timestamp microservice

app.get("/api/timestamp/:date_string?", function(req, res){
  //get the datestring from request object
  var dateString = req.params.date_string
  //function that checks if the date is a number or not
function isNum(string){
  var re = /^\d+$/g
  let match = re.exec(string)
  console.log("is num?: ",match? true: false)
  return match? true: false
}
  //creates the final result obj based on the entered value
  //if no value is provided, it returns result using current time
  let result = (value)=>{
    if(value === undefined) {return {unix: new Date().getTime(), utc: new Date().toUTCString()}}
  else {
return {
unix: new Date(value).getTime(),
  utc: new Date(value).toUTCString()
}
  }
  
  }
  //Checking if datestring is empty, a number or a string and executing the apropriate method
  //if undefined use current time 
  if(dateString === undefined){
    res.json(result())}
  // if given string consists of only numbers it's converted to a number
  else if(isNum(dateString)){
    let dateNum = Number(dateString)
    res.json(result(dateNum))
    //in all other cases it's converted to a date and displayed. if date is not valid it display's invalid by default
  }else if(dateString) {
res.json(result(dateString))
}
  
  
})
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});