let reservations = []

async function refreshData() {
    let user = getCurrentUser();
    let query = user.role == "Admin" ? "" : "?userId=" + user.id;
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
async function cancel(id) {
    let cancel = await postApi("reservation/" + id + "/cancel")
    if (cancel.ok) {
        alert("Cancelled successfully - " + id)
        refreshData();
    }
}

async function returnCar(id) {
    let ret = await postApi("reservation/" + id + "/return")
    if (ret.ok) {
        alert("Return successfully - " + id)
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
        await loadDll(users, "userId", "id", "name")
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

async function viewDetail() {

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
        <a href='#'  class="action"  onclick='cancel(${r.id})'> Cancel</a> 
        <a class="action" href='#' onclick='returnCar(${r.id})'> Return</a>`
        ))

        tbody.appendChild(tr)
    })
}

window.onload = function () {
    refreshData()
    loadResForm()
    document.getElementById("btnReserved").addEventListener("click", () => {
        reserved();
    })

}