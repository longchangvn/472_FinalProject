
module.exports =
{
    login: (req, res, next) => {
        let user = req.body;
        let foundUser = global.Users.find(u => u.userName == user.userName && u.password == user.password)
        if (foundUser)
            return res.send(foundUser)
        res.status(404).json({ message: "User not found" });
    },
    getAll:()=>{
        return global.Users;
    }
}