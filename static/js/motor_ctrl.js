function motor_ctrl_sliderChanged(val) {
    rpm = findRPMfromSlider(val)
    // document.getElementById('sd_rpm').innerHTML = String(rpm);
    // document.getElementById('sd_rpm').setAttribute("class", "style_val");
    // document.getElementById('tape_rpm').value = val;

    sendRPMUpdate(rpm)
}

function sendRPMUpdate(rpm) {
    var xhr = new XMLHttpRequest();
    var url = `http://${location.host}/ctrl_update/rpm`
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    var data = JSON.stringify(
        {"ctrl_rpm": rpm}
    );
    xhr.send(data)
}

function findRPMfromSlider(slider) {
    if (slider < 500) {
        return ((9 - 0.1) / (-499.0)) * (slider - 499.0) + 0.1
    } else if (slider > 500) {
        return ((9 - 0.1)/ (499.0)) * (slider - 501.0) + 0.1
    } else {
        return 0
    }
}

function findIntervalfromRPM(rpm) {    
    return ((60) / ((10000) * (rpm))) - 1.66 * 0.0001
}