const express = require("express")
const cors = require("cors")
const security = require("./middleware/authen")
const resRouter = require("./routers/ResRouter")
const userRouter = require("./routers/UserRouter")
const loginRouter = require("./routers/LoginRouter")
const carRouter = require("./routers/CarRouter")
const custRouter = require("./routers/customerCarReservationRouter");//for customer reservation page

const app = express();
require("./model/db")

app.use(cors())
app.use(express.json())
app.use(express.static("./public"))
app.use("/users", security.authen, userRouter)
app.use("/cars", security.authen, carRouter)
app.use("/reservations", security.authen, resRouter)
app.use("/login", loginRouter)
app.use("/customer", security.authen, custRouter);//for customer reservation page

//authentication middleware
app.use(express.json())

app.use(function(req,res,next){
    res.status(404).json({'message': "404 Page not found!!! Please visit http://localhost:3000/ to LOGIN"});
})

app.listen(3000, () => {
    console.log("Server Started on PORT:3000")
})