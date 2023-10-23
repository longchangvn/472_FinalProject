global.Users = [
    {
        id: "1",
        userName: "user1",
        role: "Admin"
    },
    {
        id: "2",
        userName: "user2",
        role: "Customer"
    }, {
        id: "3",
        userName: "user3",
        role: "Customer"
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
        make: "toyota",
        model: "camry",
        vin: "23456789ABC",
        isAvailable: true,
        unitPricePerDay: 90,
        year: 2013,
        milage: 150000,
        color: 'black',
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
        color: 'black',
    }
];
global.Reservations = [
    {
        id: "123",
        userId: "2",
        vin: "111222333",
        date: "2023-10-21",
        price: 150,
        status: "Active"
    }
];//{id, date, userId,VIN, price, unit_by_day, status}

//console.log(global.Users)