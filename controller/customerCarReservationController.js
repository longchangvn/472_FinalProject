const modelCars = require("../model/Cars");
const modelReservation = require("../model/Reservation");

module.exports = {
    findAvailabeCars: (req, res, next) => {
        if (req.query.make != null) {
            res.status(200).json(modelCars.findAvailableCarsByMake(req.query.make));
        } else if (req.query.model != null) {
            res.status(200).json(modelCars.findAvailableCarsByModel(req.query.model));
        } else if (req.query.vin != null) {
            res.status(200).json(modelCars.findAvailableCarsByVin(req.query.vin));
        } else {
            res.status(200).json(modelCars.getAvailableCars());
        }
        
    }
    ,
    getCarByVin: (req, res, next) => {
        res.status(200).json(modelCars.getByVin(req.params.vin))
    }
    ,
    reserveACar: function(req, res, next) {
        console.log(req.body)
        res.status(201).json(modelReservation.add(req.body));
    }
    
}