const express  = require("express");

const app = express();

app.get("/register",(req,res)=>{
res.send("welcome to register page")
})

const PORT = 8080
app.listen(PORT,()=>{
    console.log(`server is running at port : ${PORT}`)
})