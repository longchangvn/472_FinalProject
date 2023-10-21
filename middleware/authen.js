
module.exports = {
    authen: (req, res, next) => {
        let userId = req.headers["Authorization"];
        if (!global.Users.find(u => u.id)) {
            next("User Unauthorized");
        }
    }
}