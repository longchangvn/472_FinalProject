module.exports = {
    setUnavailable: (vin) => {
        let car = global.Cars.find(c => c.vin == vin);
        if (car) {
            car.isAvailable = true;
        }

    },
    setAvailable: (id) => {
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
}