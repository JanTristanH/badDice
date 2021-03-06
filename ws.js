const { json } = require("body-parser");
const roll_dice_msg = "rollDice";

// 0 bis max
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

let initialiseWs = (WebSocket, wss,dbClient) => {
    wss.broadcast = function (data) {
        this.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                console.log('sending');
                client.send(data);
            }
        });

    };

    wss.on('connection', function (ws) {
        ws.on('message', function (message) {
            console.log('received: %s', message);
            let obj = {};
            if (message === roll_dice_msg){
            obj.action = roll_dice_msg;
             obj.value = {
                "#die-1" : getRandomInt(6) + 1,
                "#die-2" : getRandomInt(6) + 1,
                "#die-3" : getRandomInt(6) + 1,
                "#die-4" : getRandomInt(6) + 1,
                "#die-5" : getRandomInt(6) + 1,
                "#die-6" : getRandomInt(6) + 1,
                }
            }
            wss.broadcast(JSON.stringify(obj)); //message
        });
        ws.send(JSON.stringify({
            user: 'NODEJS',
            text: 'Hallo from server'
        }));
    });

}
module.exports.initialiseWs = initialiseWs;