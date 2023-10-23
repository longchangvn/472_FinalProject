window.onload = function () {
    function checkToken(){
        if(!sessionStorage.getItem("token")){
            alert("not allowed")
            window.location.href = "login.html"
        }
    }
    checkToken();
}
