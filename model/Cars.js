const fs = require('fs');

module.exports = {
    setUnavailable: (vin) => {
        let car = global.Cars.find(c => c.vin == vin);
        if (car) {
            car.isAvailable = false;
        }

    },
    setAvailable: (vin) => {
        let car = global.Cars.find(c => c.vin == vin);
        if (car) {
            car.isAvailable = true;
        }
    },
    getByVin: (vin) => {
        return global.Cars.find(c => c.vin == vin);
    },
    getAvailableCars:()=>{
        return global.Cars.filter(c=>c.isAvailable);
    },
    getCars:()=>{
        return global.Cars;
    }
    , //for customer car reservation
    findAvailableCarsByMake: function(query) {
        return global.Cars.filter(c=>c.isAvailable).filter(c=>c.make.includes(query));
    }
    , //for customer car reservation
    findAvailableCarsByModel: function(query) {
        return global.Cars.filter(c=>c.isAvailable).filter(c=>c.model.includes(query));
    }
    , //for customer car reservation
    findAvailableCarsByVin: function(query) {
        return global.Cars.filter(c=>c.isAvailable).filter(c=>c.vin.includes(query));
    },
    addCar: function(car){
        car.image = '';
        let carObj = car;
        if(global.Cars.find(c => c.vin == car.vin)){
            return null;
        }
        global.Cars.push(carObj);
        return carObj;
    },
    deleteCar: function(vin){
        const index = global.Cars.findIndex(c => c.vin == vin);
        if(index == -1){
            return null;
        }
        else{
            let carObj = global.Cars[index];
            global.Cars.splice(index, 1);
            return carObj;
        }
    },
    updateCar: function(vin,reqBody){
        reqBody.image = '';
        console.log(reqBody)
        const index = global.Cars.findIndex(c => c.vin == vin);
        if(index == -1){
            return null;
        }
        else{
            global.Cars[index] = reqBody;
            return reqBody;
        }
    }
}