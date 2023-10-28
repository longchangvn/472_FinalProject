global.Users = [
    {
        id: "1",
        userName: "admin",
        role: "Admin",
        password: "admin"
    },
    {
        id: "2",
        userName: "customer",
        role: "Customer",
        password: "customer"
    }, {
        id: "3",
        userName: "user3",
        role: "Customer",
        password: "3"
    },
    {
        id: "4",
        userName: "user4",
        role: "Customer",
        password: "4"
    },
    {
        id: "5",
        userName: "user5",
        role: "Admin",
        password: "5"
    }


];//{id: 1, userName:"abc",password:"123"}
global.Cars = [
    {
        make: "Toyota",
        model: "Camry",
        vin: "23456789ABC",
        isAvailable: true,
        unitPricePerDay: 90,
        year: 2013,
        milage: 150000,
        color: 'white',
        img: "/img/camry.webp"
    },
    {
        make: "Mercs",
        model: "S450",
        vin: "111222333",
        unitPricePerDay: 150,
        isAvailable: true,
        img: "/img/mercs450.jpeg",
        year: 2013,
        milage: 150000,
        color: 'grey',
    },
    {
        make: "Wolkswagen",
        model: "Tiguan",
        vin: "13456789ABC",
        unitPricePerDay: 150,
        isAvailable: true,
        img: "/img/tiguan.jpg",
        year: 2016,
        milage: 15000,
        color: 'blue',
    },    
    {
        make: "Toyota",
        model: "Prius",
        vin: "10000056789",
        unitPricePerDay: 100,
        isAvailable: true,
        img: "/img/prius.jpg",
        year: 2020,
        milage: 1000,
        color: 'silver',
    },
    {
        make: "Nissan",
        model: "Maxima",
        vin: "111222334",
        unitPricePerDay: 150,
        isAvailable: true,
        img: "/img/maxima.png",
        year: 2019,
        milage: 140000,
        color: 'red',
    }
];
global.Reservations = [
    // {
    //     id: "100",
    //     userId: "2",
    //     vin: "111222444",
    //     date: "2023-10-21",
    //     price: 150,
    //     status: "Active"
    // }
];//{id, date, userId,VIN, price, unit_by_day, status}

//console.log(global.Users)