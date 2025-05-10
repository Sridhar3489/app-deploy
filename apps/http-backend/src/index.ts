import {client} from "@repo/db/client"
import express from "express"

const app = express();

app.listen(3002)

app.use(express.json())

app.get("/", (req, res)=>{
    res.status(200).json({
        message : "Hello world!"
    })
})

app.post("/signup", async(req, res)=>{
    const {username, password} = req.body;
    const user = await client.user.create({
        data:{ 
            username: username,
            password: password
        }
    })
    res.status(200).json({
        message: "User created!",
        id: user.id
    })
})

app.get("/cd", async(req, res)=>{
    res.status(200).json({
        message: "CD Endpoint"
    })
})