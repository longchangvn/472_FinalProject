const express = require("express")
const cors =require("cors")
const app = express();
require("./model/db")

app.use(cors())

//authentication middleware
app.use(express.json())


app.listen(3000,()=>{
    console.log("Server Started")
})