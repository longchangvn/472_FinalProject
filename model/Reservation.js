const dt = require("../utils/date")
const STATUS = {
    Cancelled: -1,
    Scheduled: 0,
    Active: 1,
    Done: 10
}

module.exports = {
    add: (res) => {
        res.status = STATUS.Active
        if (dt.compareDate(res.date, new Date()) > 0)
            res.status = STATUS.Scheduled
        global.Reservations.push(res)
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
    }
}