const express = require("express")
const { connectDB } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { notesRouter } = require("./routes/notes.routes")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())
app.use("/users", userRouter)
app.use("/notes", notesRouter)



connectDB().then(()=>{
    app.listen(process.env.port, async()=>{
        try {
            console.log(`Server running at port ${process.env.port}`);
        } catch (error) {
           console.log(error.message); 
           console.log("Something went wrong!");
        }
    })
})

