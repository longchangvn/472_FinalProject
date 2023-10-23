window.onload = function () {
    //display();

    //event SEARCH
    document.getElementById("search-button").addEventListener("click", () => {
        let type = document.getElementById("search-select").value;
        let text = document.getElementById("search-text").value;
        let queryString = type + "=" + text;
        search(queryString);
    });
    //event VIEW details
    // let rows = document.getElementsByTagName("tr");
    // Array.from(rows).forEach(row=>{
    //     console.log(row);
    // })
    // document.getElementById("row-link-view-").addEventListener("click", () => {
    //     let loading = document.getElementById("loading");
    //     let content = document.getElementById("contentModal")
    //     loading.style.display = "block";
    //     content.style.display = "none";
    //     console.log(loading)
    //     console.log(content)
    //     viewDetail("23456789ABC")
    // });

    document.getElementById("makeReservation").addEventListener("click", () => {
        if (!currentCar) {
            alert("Car in invalid")
            return;
        }
        let data = {
            userId: getCurrentUser().id,
            vin: currentCar.vin,
            price: currentCar.unitPricePerDay,
            date: new Date()
        }
        postApi("reservations", data).then(res => {
            if (res.ok) {
                alert("reservation created successfull");
            }
        })
    })

}

async function search(query) {
    let response = await fetch("http://localhost:3000/customer/reserves?" + query);
    let json;
    if (response.ok) {
        json = await response.json();
        console.log(json);
        //build table result
        addTbody();
        let flag = 0;
        for (let e of json) {
            addRowToTable(e.vin, e.make, e.model, e.year, e.color, e.img, e.isAvailable, e.unitPricePerDay, flag);
            flag++;
        }
    }
    else alert("Error" + response.status);

}
function addTbody() {
    removeElementById('tbody-data');
    let tbody = document.createElement('tbody');
    tbody.setAttribute("id", "tbody-data");
    document.getElementById('mytable').appendChild(tbody);
}
function reset() {
    document.getElementById('myform').reset();
}
function removeElementById(elementId) {
    document.getElementById(elementId).remove();
}
function addRowToTable(vin, make, model, year, color, img, isAvailable, unitPricePerDay, flag) {
    let row = document.createElement('tr');
    if (flag % 2 == 0) {
        row.classList.add("table-active");
    } else {
        row.classList.add("table-info");
    }
    console.log(row.rowIndex + "=rowIndex");
    row.setAttribute("row-id-", vin);
    for (let i = 0; i < arguments.length - 1; i++) {
        let e = arguments[i];
        let cell = document.createElement('td');
        cell.appendChild(document.createTextNode(e));
        row.appendChild(cell);
    }
    let cellEnd = document.createElement('td');
    let button = document.createElement('button');

    button.addEventListener("click", (e) => {
        console.log("gohere");
        let loading = document.getElementById("loading");
        let content = document.getElementById("contentModal")
        loading.style.display = "block";
        content.style.display = "none";
        console.log(loading)
        console.log(content)
        viewDetail("23456789ABC");
        e.preventDefault();
    });

    button.setAttribute('id', "row-link-view-" + vin);
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.innerHTML = "View";
   

    cellEnd.appendChild(button);
    row.appendChild(cellEnd);

    document.getElementById('tbody-data').appendChild(row);
}
//handle view details

let currentCar;
async function viewDetail(vin) {
    let res = await getApi("cars/" + vin)
    if (res.ok) {
        let car = await res.json()
        currentCar = car;
        setTimeout(() => {
            let carImg = document.getElementById("car-img")
            let vin = document.getElementById("vin")
            let make = document.getElementById("make")
            let model = document.getElementById("model")
            let milage = document.getElementById("milage")
            let year = document.getElementById("year")
            let unitPrice = document.getElementById("unitPrice")
            let available = document.getElementById("available")

            carImg.src = car.img;
            vin.innerHTML = car.vin
            make.innerHTML = car.make
            model.innerHTML = car.model
            year.innerHTML = car.year
            unitPrice.innerHTML = car.unitPricePerDay
            milage.innerHTML = car.milage
            available.innerHTML = car.isAvailable ? "Yes" : "No"

            let loading = document.getElementById("loading");
            let content = document.getElementById("contentModal")
            loading.style.display = "none";
            content.style.display = "block";
            console.log(content)
            console.log(loading)
        }, 1000)

    }
    else
        alert("Cannot get car by vin")
}
