// cars.js

window.onload = function () {
    const carList = document.getElementById("carList");
  
    // Function to create a car item with buttons
    function createCarItem(carData) {
      const li = document.createElement("li");
      li.className = "list-group-item";
  
      const row = document.createElement("div");
      row.className = "row";
  
      // Create car image
      const imageDiv = document.createElement("div");
      imageDiv.className = "col-4";
      const carImage = document.createElement("img");
      carImage.src = carData.image; // Replace with the image URL
      carImage.alt = carData.make + " " + carData.model;
      carImage.className = "img-fluid";
      imageDiv.appendChild(carImage);
  
      // Create car details
      const detailsDiv = document.createElement("div");
      detailsDiv.className = "col-8";
      const makeModelDiv = document.createElement("div");
      makeModelDiv.textContent = `${carData.make} ${carData.model}`;
      const yearDiv = document.createElement("div");
      yearDiv.textContent = `Year: ${carData.year}`;
      const colorDiv = document.createElement("div");
      colorDiv.textContent = `Color: ${carData.color}`;
      const mileageDiv = document.createElement("div");
      mileageDiv.textContent = `Mileage: ${carData.mileage}`;
      const priceDiv = document.createElement("div");
      priceDiv.textContent = `Price: $${carData.price} per day`;
  
      // Create Update button
      const updateButton = document.createElement("button");
      updateButton.className = "btn btn-success";
      updateButton.textContent = "Update";
      updateButton.id=carData.div;
      updateButton.addEventListener.onclick  
      // Create Delete button
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger";
      deleteButton.textContent = "Delete";
  
      // Append all elements to the row
      detailsDiv.appendChild(makeModelDiv);
      detailsDiv.appendChild(yearDiv);
      detailsDiv.appendChild(colorDiv);
      detailsDiv.appendChild(mileageDiv);
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
  

    // You can continue adding more car items as needed.
    const newCarData = {
        make: "New Make",
        model: "New Model",
        year: 2023,
        color: "Red",
        mileage: 0,
        price: 50,
        image: "car3.jpg", // Replace with the image URL
      };
      createCarItem(newCarData);
    
    // Add more car items here by calling createCarItem with your car data
    const carData2 = {
      make: "Car Make 2",
      model: "Car Model 2",
      year: 2022,
      color: "Blue",
      mileage: 10000,
      price: 60,
      image: "car4.jpg", // Replace with the image URL
    };
    createCarItem(carData2);
    
    const carData3 = {
      make: "Car Make 3",
      model: "Car Model 3",
      year: 2021,
      color: "Silver",
      mileage: 5000,
      price: 70,
      image: "car5.jpg", // Replace with the image URL
    };
    createCarItem(carData3);
    
};
