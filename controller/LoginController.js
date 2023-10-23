const model = require("../model/User")
module.exports = {
    login: (req, res, next) => {
        let user = model.login(req.body);
        console.log("err")
        if (user){
            return res.send(user)
        }
        res.status(404).json({ message: "User not found" });
    }
}