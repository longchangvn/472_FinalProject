const dt = require("../utils/date")
const cars = require("./Cars")
const STATUS = {
    Cancelled: "Cancelled",
    Scheduled: "Scheduled",
    Active: "Active",
    Done: "Done"
}

module.exports = {
    add: (res) => {
        res.status = STATUS.Active
        if (dt.compareDate(res.date, new Date()) > 0)
            res.status = STATUS.Scheduled
        global.Reservations.push(res)
        cars.setUnavailable(res.vin)
    },
    getById: (id) => {
        return global.Reservations.find(r => r.id == id)
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
        let res = global.Reservations.find(r => r.id == res.id);
        if (!res)
            return null;
        res.status = STATUS.Cancelled
        return { message: "succeed" }
    }
}