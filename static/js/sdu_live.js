document.addEventListener("DOMContentLoaded", function(event) {
    const requestTempProbeReading = function() {
        fetch(`http://${location.host}/sd_update/temp`)
        .then((resp) => resp.json())
        .then(function(response) {
            sd_temp = response.data_temp.toFixed(1);
            document.getElementById('sd_temp').innerHTML = sd_temp;
            document.getElementById('sd_temp').setAttribute("class", "style_val");
            document.getElementById('tape_temp').value = (1000.0/80.0) * (response.data_temp + 20.0);
        });
    }

    setInterval(requestTempProbeReading, 1000);
});

document.addEventListener("DOMContentLoaded", function(event) {
    const requestRPMReading = function() {
        fetch(`http://${location.host}/sd_update/rpm`)
        .then((resp) => resp.json())
        .then(function(response) {
            sd_rpm = response.data_rpm.toFixed(1);
            sd_rpm_isCW = response.dir_is_cw            

            document.getElementById('sd_rpm').innerHTML = sd_rpm;
            document.getElementById('sd_rpm').setAttribute("class", "style_val");
            document.getElementById('tape_rpm').value = findSliderFromRPM(sd_rpm, sd_rpm_isCW);
        });
    }

    setInterval(requestRPMReading, 1000);
});

function findSliderFromRPM(rpm, isCW) {
    if (isCW) {
        return (((rpm - 0.1) * (499))/(9 - 0.1)) + 501
    } else if (!isCW) {
        return (((rpm - 0.1) * (-499))/(9 - 0.1)) + 499
    }
}