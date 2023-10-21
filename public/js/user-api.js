function login(user,pass){
    return postApi("/users",{userName:user,password:pass})
}