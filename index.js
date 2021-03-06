/**
 * UI5 WebSocket minimalistic chat example by Holger Schäfer
 * using node.js and NPM package ws
 */
var express = require('express'),
    path = require('path'),
    httpPort = process.env.PORT || 80,
    wsPort = 8081,
    app = express();

// middle ware bidy parser
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())
// all environments
//express.static.mime.default_type = "text/xml";
//app.use(express.compress());
//app.use(express.static(path.join(__dirname, 'public')));

let apiHandler = require('./api');
let wsHandler = require('./ws');
let dbClient = {};//require('./database/mockDBclient').dbClient;
apiHandler.initialiseApi(app,express);

// start web socket server
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: wsPort });

wsHandler.initialiseWs(WebSocket,wss,dbClient);


// start http server
app.listen(httpPort, function () {
    console.log('HTTP Server: http://localhost:' + httpPort);
    console.log('WS Server: ws://localhost:' + wsPort);
});