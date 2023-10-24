window.onload = function () {
    function checkToken(){
        if(!sessionStorage.getItem("token")){
            alert("Unauthorization, please login first. FOR this demotration, you can login with 2 users: admin/admin OR customer/customer")
            window.location.href = "/view/login.html"
        }
    }
    checkToken();
}
