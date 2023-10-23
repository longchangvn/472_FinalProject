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
    }
    , //for customer car reservation
    findAvailableCarsByMake: function(query) {
        console.log(query);
        return global.Cars.filter(c=>c.isAvailable).filter(c=>c.make.includes(query));
    }
    , //for customer car reservation
    findAvailableCarsByModel: function(query) {
        console.log(query);
        return global.Cars.filter(c=>c.isAvailable).filter(c=>c.model.includes(query));
    }
    , //for customer car reservation
    findAvailableCarsByVin: function(query) {
        console.log(query);
        return global.Cars.filter(c=>c.isAvailable).filter(c=>c.model.includes(query));
    }
}