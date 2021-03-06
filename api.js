let fs = require('fs');

const odatafy = results => {
    return  { 
        "d" : results
      }
};
let initialiseApi = (app,express) => {
/*
    var path = require('path');
    app.get('/', function (req, res) {
        console.log("req for root");
        res.sendFile(path.join(__dirname + '/index.html'));
    });
    */
    app.use(express.static('public'));
}
module.exports.initialiseApi = initialiseApi;