async function login(user, pass) {
    let res = await postApi("login", { userName: user, password: pass })
    if (res.ok) {
        let user = await res.json()
        sessionStorage.setItem("token", user.id)
        sessionStorage.setItem("currentUser", JSON.stringify(user))
        if(user.role == 'Admin')
            window.location.href = "adminPanel.html"
        else if(user.role == 'Customer')
            window.location.href = "customerPanel.html"
        else
            alert("role is not found!!!")

    }
    else{
        document.getElementById("loginError").style.display = "block";
        setTimeout(() => {
            loginError.style.display = "none";
        }, 2000);
    }
}
document.getElementById("btnLogin").addEventListener("click", () => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    console.log(username.value)    
    if(!username || !password){
        document.getElementById("fillError").style.display = "block";
        setTimeout(() => {
            fillError.style.display = "none";
        }, 2000);
    }
    else{
        login(document.getElementById("username").value , document.getElementById("password").value);
    }
})
