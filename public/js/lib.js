let apiUrl = "http://localhost:3000/"
let postApi = function (url, data) {
    url = apiUrl + url;
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

        headers: {
            "Content-Type": "application/json",
            'Authorization': sessionStorage.getItem("token") ?? "",
        },

        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
}

let getApi = function (url, data) {
    url = apiUrl + url;
    return fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

        headers: {
            "Content-Type": "application/json",
            'Authorization': sessionStorage.getItem("token") ?? "",
        }
    });
}


let putApi = function (url, data) {
    url = apiUrl + url;
    return fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

        headers: {
            "Content-Type": "application/json",
            'Authorization': sessionStorage.getItem("token") ?? "",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
}


let deleleApi = function (url, data) {
    url = apiUrl + url;
    return fetch(url, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

        headers: {
            "Content-Type": "application/json",
            'Authorization': sessionStorage.getItem("token") ?? "",
        }
    });
}

function getCurrentUser() {
    let user = sessionStorage.getItem("currentUser")
    if (user) {
        return JSON.parse(user)
    }
    return {};
}
function logout() {
    sessionStorage.removeItem("currentUser")
    sessionStorage.removeItem("token")
    window.location.href = "login.html";
}
$("#nav-placeholder").load("../view/nav.html",function(data){
    let user = JSON.parse(sessionStorage.getItem("currentUser"))
    document.getElementById("navbar_role").innerHTML = user.role
    document.getElementById("navbar_username").innerHTML = "Welcome " + user.userName + "!"

    //data.getElementById("navbar_username").innerHTML = sessionStorage.getItem("currentUser").username
});