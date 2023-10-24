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
