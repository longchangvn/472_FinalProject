// This script is responsible for dynamically populating the "Model" dropdown based on the selected "Make."
//TODO add make page.get it from server.
var carData = {
    "Toyota": ["Camry", "Corolla", "Rav4", "Highlander", "Prius"],
    "Honda": ["Civic", "Accord", "CR-V", "Pilot"],
    "Ford": ["F-150", "Escape", "Focus", "Explorer"],
    "Chevrolet": ["Silverado", "Malibu", "Equinox", "Traverse"],
    "Volkswagen": ["Jetta", "Passat", "Tiguan", "Golf"],
    "Nissan": ["Altima", "Maxima", "Rogue", "Pathfinder"],
    "Mercs": ["S450", "E-Class", "S-Class", "GLC", "GLE"],

    // Add more makes and models here
  };
var colors = ["red", "blue", "green", "white", "black", "silver", "gray", "orange", "pink"];
var vin; 
window.onload = function () {
    let makeDdl = document.getElementById("make")
    for (var make in carData) {
        let option = document.createElement("option");
        option.value = make;
        option.textContent= make;
        makeDdl.appendChild(option)
    }
    let colorDdl = document.getElementById("color")
    for (var color of colors) {
        let option = document.createElement("option");
        option.value = color;
        option.textContent= color;
        colorDdl.appendChild(option)
    }
    const urlParams = new URLSearchParams(window.location.search);
    vin = urlParams.get("vin")
    let headElem = document.getElementById("head")
    if(vin){
        headElem.innerHTML = "Update car"
        getCar(vin);   
    }
    else{
        headElem.innerHTML = "Add car"
    }
}
document.getElementById('make').addEventListener('change', function(){
    const modelElement = document.getElementById("model")
    while (modelElement.options.length > 0) {
        modelElement.remove(0);
    }
    populateModel(this.value);
});
function populateModel(make) {
    var modelSelect = document.getElementById('model');
    if (make !== '') {
        carData[make].forEach(function(model) {
            var option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }
}
  document.getElementById('imgInp').addEventListener('change', function() {
    const file = this.files[0]
    if(file){
        let imgElement = document.getElementById("imgElement")
        imgElement.src = URL.createObjectURL(file);
        imgElement.style.display = "block"
    }
});
document.getElementById("submitBtn").addEventListener('click', function(){
    let carForm = document.getElementById("carForm");
    carForm.reportValidity();
    let img = document.getElementById('imgInp').files[0]
    const formData = new FormData(carForm);
    let reqBody = {
        make : formData.get("make"),
        model : formData.get("model"),
        vin : formData.get("vin"),
        year : formData.get("year"),
        milage : formData.get("milage"),
        unitPricePerDay : formData.get("unitPricePerDay"),
        color : formData.get("color"),
        isAvailable: formData.get("isAvailable")== 1
    }
    function readFileAndSend(file) {
        return new Promise((resolve, reject) => {
            let myReader = new FileReader();
            myReader.onloadend = function (e) {
                resolve(myReader.result);
            };
            if(file instanceof Blob){
                myReader.readAsDataURL(file);
            }
        });
    };
    readFileAndSend(img).then(function(base64string){
        /*do next steps here like sending image base64string to the server. you can send this in the body of request and in backend, receive in req.body.*/
        reqBody.image = base64string;
        submit(reqBody) 
    })
    readFileAndSend(img);
});
document.getElementById("submitBtn").addEventListener('submit', function(event){
    event.preventDefault();
});
async function submit(reqBody){
    let ret;
    let succMessage;
    if(!vin){
        ret = await postApi("cars", reqBody);
        succMessage = "saved successfully"
    }
    else{
        ret = await putApi("cars/" + vin, reqBody);
        succMessage = "updated successfully"
    }
    if(ret.ok){
        alert(succMessage);
        window.location = "cars.html"
    }    
    else{
        let err = await ret.json()
        alert(err.message);
        document.getElementById("vin").value = '';
        
    }
}
async function getCar(vin){
    let ret = await getApi("cars/" + vin)
    if(ret.ok){
        let car = await ret.json()
        populateModel(car["make"])
        for(elem in car){
            let elemHtml = document.getElementById(elem)
            if (elemHtml) {
                document.getElementById(elem).value = car[elem]
            }
        }
        document.getElementById("vin").readOnly=true
        document.getElementById("isAvailable").value = (car.isAvailable) ? 1:0
    }
    else{
        alert(ret.body);
    }
}