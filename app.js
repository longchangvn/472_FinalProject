const express = require("express")
const cors = require("cors")
const security = require("./middleware/authen")
const resRouter = require("./routers/ResRouter")
const app = express();
require("./model/db")

app.use(cors())
app.use(express.json())
app.use("/reservations", security.authen, resRouter)

//authentication middleware
app.use(express.json())


app.listen(3000, () => {
    console.log("Server Started")
})