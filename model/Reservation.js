const dt = require("../utils/date")
const cars = require("./Cars")
const users = require("./User")
const STATUS = {
    Cancelled: "Cancelled",
    Scheduled: "Scheduled",
    Active: "Active",
    Done: "Done"
}

module.exports = {
    add: (res) => {
        console.log(res)
        res.status = STATUS.Active
        if (dt.compareDate(res.date, new Date()) > 0)
            res.status = STATUS.Scheduled
        res.id = new Date().getTime()
        global.Reservations.push(res)
        cars.setUnavailable(res.vin)
        console.log(global.Cars)
        return res;
    },
    getById: (id) => {
        let res = global.Reservations.find(r => r.id == id)
        if(res){
            res.car = cars.getByVin(res.vin)
            res.user = users.getById(res.userId)
        }
        return res
    },
    search: ({ vin, date, userId }) => {
        let result = global.Reservations;
        if (vin)
            return result.filter(r => r.vin == vin)
        if (date)
            return result.filter(r => r.date == date)
        if (userId)
            return result.filter(r => r.userId == userId)
        return result;
    },
    update: (res) => {
        let index = global.Reservations.findIndex(r => r.id == res.id);
        if (index < 0)
            return null;
        return global.Reservations.splice(index, 1, res)[0];
    },
    delete: (id) => {
        let index = global.Reservations.findIndex(r => r.id == res.id);
        if (index < 0)
            return null;
        return global.Reservations.splice(index, 1, res)[0];
    },
    cancelReservation: (id) => {
        let res = global.Reservations.find(r => r.id == id);
        if (!res)
            return null;
        res.status = STATUS.Cancelled
        cars.setAvailable(res.vin)
        return { message: "succeed" }
    },
    returnCar: (id) => {
        let res = global.Reservations.find(r => r.id == id);
        if (!res)
            return null;
        res.status = STATUS.Done
        cars.setAvailable(res.vin)
        return { message: "succeed" }

    }
}