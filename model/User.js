
module.exports =
{
    login: (user) => {
        return global.Users.find(u => u.userName == user.userName && u.password == user.password);
    },
    getAll:()=>{
        return global.Users;
    }
}