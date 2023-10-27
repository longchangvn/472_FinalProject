// This script is responsible for dynamically populating the "Model" dropdown based on the selected "Make."
//TODO add make page.get it from server.
var carData = {
    "Toyota": ["Camry", "Corolla", "Rav4", "Highlander"],
    "Honda": ["Civic", "Accord", "CR-V", "Pilot"],
    "Ford": ["F-150", "Escape", "Focus", "Explorer"],
    "Chevrolet": ["Silverado", "Malibu", "Equinox", "Traverse"],
    "Volkswagen": ["Jetta", "Passat", "Tiguan", "Golf"],
    "Nissan": ["Altima", "Maxima", "Rogue", "Pathfinder"],
    // Add more makes and models here
  };
var colors = ["Red", "Blue", "Green", "White", "Black", "Silver", "Gray", "Orange"];

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
}
document.getElementById('make').addEventListener('change', function() {
    var selectedMake = this.value;
    var modelSelect = document.getElementById('model');
    modelSelect.innerHTML = "<option value=''>Select Model</option>";  
    if (selectedMake !== '') {
    carData[selectedMake].forEach(function(model) {
        var option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
    });
    }
});
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
    let img = document.getElementById('imgInp').files[0]
    const formData = new FormData(carForm);
    let reqBody = {
        make : formData.get("make"),
        model : formData.get("model"),
        vin : formData.get("vin"),
        year : formData.get("year"),
        mileage : formData.get("mileage"),
        unitPricePerDay : formData.get("unitPricePerDay"),
        color : formData.get("color"),
    }
    function readFileAndSend(file) {
        return new Promise((resolve, reject) => {
            let myReader = new FileReader();
            myReader.onloadend = function (e) {
                resolve(myReader.result);
            };
            myReader.readAsDataURL(file);
        });
    };
    readFileAndSend(img).then(function(base64string){
        /*do next steps here like sending image base64string to the server. you can send this in the body of request and in backend, receive in req.body.*/
        reqBody.image = base64string;
        submitAddNewCar(reqBody) 
    })
    readFileAndSend(img);
});
document.getElementById("submitBtn").addEventListener('submit', function(event){
    event.preventDefault();
});
async function submitAddNewCar(reqBody){
    console.log(reqBody)
    let ret = await postApi("cars", reqBody)
    if(ret.ok){
        alert("saved successfully");
    }    
    else{
        alert(ret.body);
    }
}