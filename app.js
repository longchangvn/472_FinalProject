const express = require("express")
const cors = require("cors")
const security = require("./middleware/authen")
const resRouter = require("./routers/ResRouter")
const userRouter = require("./routers/UserRouter")

const carRouter = require("./routers/CarRouter")
const app = express();
require("./model/db")

app.use(cors())
app.use(express.json())
app.use(express.static("./public"))
app.use("/users", security.authen, userRouter)
app.use("/cars", security.authen, carRouter)
app.use("/reservations", security.authen, resRouter)

//authentication middleware
app.use(express.json())


app.listen(3000, () => {
    console.log("Server Started")
})