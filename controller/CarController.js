const model = require("../model/Cars")
const fileOps = require("../utils/fileOps")

const fs = require("fs")

module.exports = {
    gettAll: (req, res, next) => {
        res.status(200).json(model.getAvailableCars());
    },
    getByVin: (req, res, next) => {
        res.status(200).json(model.getByVin(req.params.vin))
    },
    addCar: (req, res, next) => {
        /*Download the base64 image in the server and returns the filename and path of image.*/
        let filepath = fileOps.saveImage(req.body.image, req.body.vin); 
        if(filepath){
            let car = req.body;
            car.img = fileOps.imgPath + "/" + car.vin
            const carObj = model.addCar(car);
            if(!carObj){
                fileOps.deleteImage(filepath)
                res.status(400).send("vin should be unique");
            }
            res.status(201).send(car);
        }
        else{
            res.status(500).send("error! try again");
        }
    }
}
