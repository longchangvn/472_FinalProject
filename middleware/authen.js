
module.exports = {
    authen: (req, res, next) => {
        let userId = req.headers["authorization"];
        if (!global.Users.find(u => u.id==userId)) {
            res.status(401).send("User Unauthorized")
            next("User Unauthorized");
        }
        next()
    }
}