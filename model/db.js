global.Users = [
    {
        id: "1",
        name: "user1",
        role: "Admin"
    },
    {
        id: "2",
        name: "user2",
        role: "Customer"
    }, {
        id: "3",
        name: "user3",
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
        isAvailable: true
    },
    {
        make: "Mercs",
        model: "S450",
        vin: "111222333",
        isAvailable: true
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