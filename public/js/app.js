const roll_dice_msg = "rollDice";
let latestDiceId = 0;
const getDiceHtml = color => {
    latestDiceId++;
    return `<ol class="die-list even-roll" data-roll="1" id="die-${latestDiceId}">
    <li class="die-item ${color}" data-side="1">
      <span class="dot"></span>
    </li>
    <li class="die-item ${color}" data-side="2">
      <span class="dot"></span>
      <span class="dot"></span>
    </li>
    <li class="die-item ${color}" data-side="3">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </li>
    <li class="die-item ${color}" data-side="4">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </li>
    <li class="die-item ${color}" data-side="5">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </li>
    <li class="die-item ${color}" data-side="6">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </li>
  </ol>`
}


let socket = new WebSocket("ws://localhost:8081");

socket.onopen = function (e) {
    console.log("[open] Connection established");
    console.log("Sending to server");
    socket.send("My name is John");
};

socket.onmessage = function (event) {
    //console.log(`[message] Data received from server: ${event.data}`);
    let objData = JSON.parse(event.data);
    switch (objData.action) {
        case roll_dice_msg:
            // todo add reasoable mapping
            let dieMapping = ["#die-1","#die-2","#die-3","#die-4","#die-5","#die-6"];
            dieMapping.forEach(e => {
                let die = document.querySelector(e);
                toggleClasses(die);
                die.dataset.roll = objData.value[e];
            })

            break;
    }
    //document.getElementById("divtext").innerHTML = event.data;
    //here is reaction to event

};

socket.onclose = function (event) {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
    }
};

socket.onerror = function (error) {
    console.log(`[error] ${error.message}`);
};

function myFunction() {
    //document.getElementById("demo").style.color = "red";
    socket.send(roll_dice_msg);
}


function rollDice() {
    const dice = [...document.querySelectorAll(".die-list")];
    dice.forEach(die => {
        toggleClasses(die);
        die.dataset.roll = getRandomNumber(1, 6);
    });
}

function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//document.querySelector("#roll-button").addEventListener("click", rollDice);


function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes[0];
}
//add dices to page
// todo add reasoable mapping
document.querySelector("#rowWrapper").appendChild(htmlToElements(getDiceHtml("white")));
document.querySelector("#rowWrapper").appendChild(htmlToElements(getDiceHtml("white")));
document.querySelector("#rowWrapper").appendChild(htmlToElements(getDiceHtml("red")));
document.querySelector("#rowWrapper").appendChild(htmlToElements(getDiceHtml("yellow")));
document.querySelector("#rowWrapper").appendChild(htmlToElements(getDiceHtml("green")));
document.querySelector("#rowWrapper").appendChild(htmlToElements(getDiceHtml("blue")));