var express = require('express');
var app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.get('/', function (req, res) {
   const webApiDataFile = require('./SampleResponse.json')
   console.log("Loaded data: ", webApiDataFile.SampleData)
   res.send(webApiDataFile.SampleData);
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})