// cars.js

function createCarItem(carData) {
  const li = document.createElement("li");
  li.className = "list-group-item";

  const row = document.createElement("div");
  row.className = "row";

  // Create car image
  const imageDiv = document.createElement("div");
  imageDiv.className = "col-4";
  const carImage = document.createElement("img");
  carImage.src = carData.img; // Replace with the image URL
  carImage.alt = carData.make + " " + carData.model;
  carImage.className = "img-fluid";
  imageDiv.appendChild(carImage);

  // Create car details
  const detailsDiv = document.createElement("div");
  detailsDiv.className = "col-8";
  const makeModelDiv = document.createElement("h4");
  makeModelDiv.textContent = `${carData.make} ${carData.model}`;
  const vinDiv = document.createElement("h5");
  vinDiv.textContent = `${carData.vin}`;
  const yearDiv = document.createElement("div");
  yearDiv.textContent = `Year: ${carData.year}`;
  const colorDiv = document.createElement("div");
  colorDiv.textContent = `Color: ${carData.color}`;
  const milageDiv = document.createElement("div");
  milageDiv.textContent = `Milage: ${carData.milage}`;
  const priceDiv = document.createElement("div");
  priceDiv.textContent = `Price: $${carData.unitPricePerDay} per day`;
  const availableDiv = document.createElement("isAvailable");
  availableDiv.textContent = `Availability: ${(carData.isAvailable) ? "Yes" : "No"}`;

  // Create Update button
  const updateButton = document.createElement("button");
  updateButton.className = "btn btn-success";
  updateButton.textContent = "Update";
  updateButton.id=carData.vin;
  updateButton.addEventListener("click", updateFunction)
  // Create Delete button
  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger";
  deleteButton.textContent = "Delete";
  deleteButton.id=carData.vin;
  deleteButton.addEventListener("click", deleteFunction)

  // Append all elements to the row
  detailsDiv.appendChild(makeModelDiv);
  detailsDiv.appendChild(vinDiv);
  detailsDiv.appendChild(yearDiv);
  detailsDiv.appendChild(colorDiv);
  detailsDiv.appendChild(milageDiv);
  detailsDiv.appendChild(availableDiv);

  detailsDiv.appendChild(priceDiv);
  detailsDiv.appendChild(updateButton);
  detailsDiv.appendChild(deleteButton);
  row.appendChild(imageDiv);
  row.appendChild(detailsDiv);
  
  // Append row to the car item
  li.appendChild(row);

  // Append the car item to the car list
  carList.appendChild(li);
}

async function deleteFunction(){
  res = await deleteApi("cars/" + this.id);
  if(res.ok){
    const deleteAlert = document.getElementById("deleteSuccess")
    deleteAlert.style.display = "block";
    const carList = document.getElementById("carList");
    carList.removeChild(this.parentElement.parentElement.parentElement);
    setTimeout(() => {
      deleteAlert.style.display = "none";
    }, 2000);
  }
  else{
    const deleteAlert = document.getElementById("deleteError")
    deleteAlert.style.display = "block";
    setTimeout(() => {
      deleteAlert.style.display = "none";
    }, 2000);
  }
}
async function updateFunction (){
  window.location.href = "/view/carForm.html?vin=" + this.id;
}

async function addCars(){
  res = await getApi("cars?admin=true");
  if (res.ok) {
      let cars = await res.json()
      cars.forEach(c =>{
        createCarItem(c)
      })
  }
}
window.onload = function () {    
    addCars();
}