let reservations = []
function isAdminLogin() {
    let currentUser = getCurrentUser();
    console.log(currentUser);
    console.log(currentUser && currentUser.role == "Admin")
    return currentUser && currentUser.role == "Admin"
}

async function refreshData() {
    let user = getCurrentUser();

    let query = isAdminLogin() ? "" : "?userId=" + user.id;

    let res = await getApi("reservations" + query)
    if (res.ok) {
        reservations = await res.json()
        drawTable();
    }
}
function createTd(content) {
    let td = document.createElement("td")
    td.innerHTML = content;
    return td;
}
async function cancel() {
    if (!currentRes) {
        alert("Reservation is not selected...")
        return;
    }
    let cancel = await postApi("reservations/" + currentRes.id + "/cancel")
    if (cancel.ok) {
        alert("Cancelled successfully - " + currentRes.id)
        refreshData();
    }
}

async function returnCar() {
    if (!currentRes) {
        alert("Reservation is not selected...")
        return;
    }
    let ret = await postApi("reservations/" + currentRes.id + "/return")
    if (ret.ok) {
        alert("Return successfully - " + currentRes.id)
        refreshData();
    }
}

async function reserved() {
    let obj = {
        userId: document.getElementById("userId").value,
        vin: document.getElementById("vin").value,
        date: document.getElementById("date").value,
        price: document.getElementById("price").value
    }
    let res = await postApi("reservations", obj);
    if (res.ok) {
        alert("Car is successfully reserved");
        refreshData();
    }
    else
        alert("Car is not able to reserved");
}
async function loadResForm() {
    let res = await getApi("users");
    if (res.ok) {
        let users = await res.json()
        await loadDll(users, "userId", "id", "userName")
    }

    res = await getApi("cars");
    if (res.ok) {
        let users = await res.json()
        await loadDll(users, "vin", "vin", "model")
    }
}
async function loadDll(data, id, valuefield, textfield) {
    let list = document.getElementById(id)
    list.innerHTML = '';

    data.forEach(s => {
        let option = document.createElement("option");
        option.value = s[valuefield];
        option.innerHTML = s[textfield];
        list.appendChild(option)
    });
}
let currentRes;
async function viewDetail(id) {
    document.getElementById("cancel").style.display = "none";
    document.getElementById("returnCar").style.display = "none";
    let res = await getApi("reservations/" + id)
    if (res.ok) {
        currentRes = await res.json()
        console.log("res - .....", currentRes)
        setTimeout(() => {
            let carImg = document.getElementById("car-img")
            let resId = document.getElementById("resId")
            let rentUser = document.getElementById("rentUser")
            let rentDate = document.getElementById("rentDate")
            let unitPrice = document.getElementById("unitPrice")
            let days = document.getElementById("numOfDays")
            let totalPrice = document.getElementById("totalPrice")
            carImg.src = currentRes.car.img;
            resId.innerHTML = currentRes.id
            rentUser.innerHTML = currentRes.user.userName
            rentDate.innerHTML = currentRes.date
            unitPrice.value = currentRes.price
            let dayCount = 5
            days.innerHTML = dayCount + " days"
            totalPrice.innerHTML = currentRes.price * dayCount + "$"


            let loading = document.getElementById("loading");
            let content = document.getElementById("contentModal")
            loading.style.display = "none";
            content.style.display = "block";
            console.log(content)
            console.log(loading)

            let isReadOnly = currentRes.status == "Cancelled" || currentRes.status == "Done"

            document.getElementById("cancel").style.display = isReadOnly ? "none" : "block";
            document.getElementById("returnCar").style.display = isReadOnly ? "none" : "block";
        }, 1500)

    }
    else
        alert("Cannot get reservation by Id")
}

async function drawTable() {
    let tbody = document.getElementById("tblRes");
    tbody.innerHTML = '';
    reservations.forEach(r => {
        let tr = document.createElement("tr")
        tr.appendChild(createTd(r.id))
        tr.appendChild(createTd(r.userId))
        tr.appendChild(createTd(r.vin))
        tr.appendChild(createTd(r.date))
        tr.appendChild(createTd(r.price))
        tr.appendChild(createTd(r.status))
        tr.appendChild(createTd(`
        <a href='#'  class="action" data-bs-toggle="modal" data-bs-target="#viewDetail"  onclick='viewDetail(${r.id})'>View</a> 
       `
        ))
        //  <a href='#'  class="action"  onclick='cancel(${r.id})'> Cancel</a> 
        // <a class="action" href='#' onclick='returnCar(${r.id})'> Return</a>
        tbody.appendChild(tr)
    })
}

window.onload = function () {
    refreshData()
    loadResForm()
    let form = document.getElementById("admin-form");
    console.log("isAdmin:" + isAdminLogin())
    form.style.display = isAdminLogin() ? "block" : "none";

    document.getElementById("btnReserved").addEventListener("click", () => {
        reserved();
    })
    let cancelCar = document.getElementById("cancel")
    let retCar = document.getElementById("returnCar")
    cancelCar.addEventListener('click', cancel)
    retCar.addEventListener('click', returnCar)

    document.getElementById("viewDetail").addEventListener('shown.bs.modal', function () {

        let loading = document.getElementById("loading");
        let content = document.getElementById("contentModal")
        loading.style.display = "block";
        content.style.display = "none";
        console.log(loading)
        console.log(content)


    })
    document.getElementById("showAll").addEventListener("change", () => {
        refreshData();
    })

}