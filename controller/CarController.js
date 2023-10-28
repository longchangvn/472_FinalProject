const model = require("../model/Cars")
const fileOps = require("../utils/fileOps")

const fs = require("fs")
 
module.exports = {
    gettAll: (req, res, next) => {
        if(req.query.admin){
            res.status(200).json(model.getCars());
        }
        else{
            res.status(200).json(model.getAvailableCars());
        }
    },
    getByVin: (req, res, next) => {
        res.status(200).json(model.getByVin(req.params.vin))
    },
    addCar: (req, res, next) => {
        /*Download the base64 image in the server and returns the filename and path of image.*/
        let filepath = fileOps.saveImage(req.body.image, req.body.vin); 
        if(filepath){
            let car = req.body;
            car.img = filepath
            const carObj = model.addCar(car);
            if(!carObj){
                fileOps.deleteImage(filepath)
                res.status(400).send({message: "vin should be unique"});
            }
            else{
               res.status(201).send(car);
            }
        }
        else{
            res.status(500).send("error! try again");
        }
    },
    deleteCar: (req, res, next) => {
        const deleteVin = req.params.vin;
        const deletedCar = model.deleteCar(deleteVin);
        if(!deletedCar){
            res.status(404).send({message: "car is not found"});
        }
        else{
            fileOps.deleteImage(deletedCar.img);
            res.status(200).send(deletedCar);
        }
    },
    updateCar: (req,res,next) => {
        let filepath = fileOps.saveImage(req.body.image, req.params.vin); 
        if(filepath){
            let car = req.body;
            car.img = filepath
            const carObj = model.updateCar(req.params.vin, car);
            if(!carObj){
                fileOps.deleteImage(filepath)
                res.status(404).send({message: "car not found"});
            }
            res.status(200).send({data: carObj});
        }
        else{
            res.status(500).send("error! try again");
        }
    }
}
