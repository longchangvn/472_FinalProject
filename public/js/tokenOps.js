window.onload = function () {
    function checkToken(){
        if(!sessionStorage.getItem("token")){
            alert("not allowed")
            window.location.href = "login.html"
        }
    }
    checkToken();
}
document.getElementById("logoutBtn").addEventListener("click", () => {
    sessionStorage.removeItem("currentUser")
    sessionStorage.removeItem("token")
    window.location.href = "login.html";
})
