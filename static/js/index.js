function lightChkBox(cb) {
    //alert(cb.checked);
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/update_light/")
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.onload =() => console.log(xhr.responseText);
    let data = `
        "lightSts:" `+cb.checked+`
    `;
    xhr.send(data)
}
