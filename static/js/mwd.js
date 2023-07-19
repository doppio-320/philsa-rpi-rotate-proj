let messages = [];

div_Mwd_segment_inner = document.getElementById('mwd_segment_inner');

function addMessage(msg) {
    samp = msg.toUpperCase();
    if (!messages.includes(samp)) {
        messages.push(samp)
    }
}

function removeMessage(msg) {
    samp = msg.toUpperCase();
    if (messages.includes(samp)) {
        idx = messages.indexOf(samp);
        if (idx !== -1) {
            messages.splice(idx, 1);
        }
    } else {
        //console.log("Trying to remove message from MWD that does not exist!");
    }
}

function drawAllMessages() {
    //clear all
    div_Mwd_segment_inner.innerHTML = '';

    //draw all
    for (var i = 0; i < messages.length; i++) {
        let new_para = document.createElement("p");
        new_para.setAttribute("class", "style_invalid");

        let tNode = document.createTextNode(messages[i]);
        new_para.appendChild(tNode);

        div_Mwd_segment_inner.appendChild(new_para);

        div_Mwd_segment_inner.appendChild(document.createElement("br"))
    }
}

function fetchMessages() {
    removeMessage("INIT MWD")

    if(isNaN(document.getElementById('sd_n1').innerHTML)) {
        addMessage("MTR N1 DISPLAY FAULT");
    } else {
        removeMessage("MTR N1 DISPLAY FAULT");
    }

    if(isNaN(document.getElementById('sd_tq').innerHTML)) {
        addMessage("MTR TORQUE DISPLAY FAULT");
    } else {
        removeMessage("MTR TORQUE DISPLAY FAULT");
    }

    if(isNaN(document.getElementById('sd_rpm').innerHTML)) {
        addMessage("MTR RPM DISPLAY FAULT");
    } else {
        removeMessage("MTR RPM DISPLAY FAULT");
    }
    
    if(isNaN(document.getElementById('sd_vdc').innerHTML)) {
        addMessage("ELEC DC V DISPLAY FAULT");
    } else {
        removeMessage("ELEC DC V DISPLAY FAULT");
    }

    if(isNaN(document.getElementById('sd_amp').innerHTML)) {
        addMessage("ELEC CURRENT DISPLAY FAULT");
    } else {
        removeMessage("ELEC CURRENT DISPLAY FAULT");
    }

    if(isNaN(document.getElementById('sd_temp').innerHTML)) {
        addMessage("TEMP DISPLAY FAULT");
    } else {
        removeMessage("TEMP DISPLAY FAULT");
    }

    if(true) {
        addMessage("CONTROLLER FAULT");
    } else {
        removeMessage("CONTROLLER FAULT");
    }

    if(true) {
        addMessage("MAG BRK FAULT");
    } else {
        removeMessage("MAG BRK FAULT");
    }

    if(true) {
        addMessage("CONTROLLER FAULT");
    } else {
        removeMessage("CONTROLLER FAULT");
    }

    if(true) {
        addMessage("POS ERR FAULT");
    } else {
        removeMessage("POS ERR FAULT");
    }

    if(true) {
        addMessage("TRQ LIM FAULT");
    } else {
        removeMessage("TRQ LIM FAULT");
    }
}

messages.push("INIT MWD")
drawAllMessages();

setInterval(() => {
    fetchMessages();
    drawAllMessages();
}, 500);