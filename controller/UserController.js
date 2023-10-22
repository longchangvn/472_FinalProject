const model = require("../model/User")
module.exports = {
    getAll: (req, res, next) => {
        res.status(200).json(model.getAll());
    }
}