const model = require("../model/Reservation")
module.exports = {
    add: (req, res, next) => {
        console.log(req.body)
        res.status(201).json(model.add(req.body))
    },
    update: (req, res, next) => {
        res.status(200).json(model.update(req.body))
    },
    delete: (req, res, next) => {
        res.status(200).json(model.add(req.params.id))
    },
    search: (req, res, next) => {

        res.status(200).json(model.search(req.query))
    },
    getById: (req, res, next) => {
        res.status(200).json(model.getById(req.params.id))
    },
    cancel: (req, res, next) => {
        console.log("Cancelling.....")
        res.status(200).json(model.cancelReservation(req.params.id))
    },
    returnCar: (req, res, next) => {
        console.log("return.....")
        res.status(200).json(model.returnCar(req.params.id))
    },
}