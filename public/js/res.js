let reservations = []

async function refreshData() {
    let res = await getApi("reservations")
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
    if(cancel.ok){
        alert("Cancelled successfully - " + id)
        refreshData();    
    }
}

async function returnCar(id) {
    let ret = await postApi("reservation/" + id + "/return")
    if(ret.ok){
        alert("Return successfully - " + id)
        refreshData();    
    }
}
async function drawTable() {
    let tbody = document.getElementById("tblRes");
    reservations.forEach(r => {
        let tr = document.createElement("tr")
        tr.appendChild(createTd(r.id))
        tr.appendChild(createTd(r.userId))
        tr.appendChild(createTd(r.vin))
        tr.appendChild(createTd(r.date))
        tr.appendChild(createTd(r.price))
        tr.appendChild(createTd(r.status))
        tr.appendChild(createTd(`<a href='#'  class="action"  onclick='cancel(${r.id})'> Cancel</a> <a class="action" href='#' onclick='returnCar(${r.id})'> Return</a>`))

        tbody.appendChild(tr)
    })
}

window.onload = function () {
    refreshData()
}