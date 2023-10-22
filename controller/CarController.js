const model = require("../model/Cars")
module.exports = {
    gettAll: (req, res, next) => {
        res.status(200).json(model.getAvailableCars());
    }
}