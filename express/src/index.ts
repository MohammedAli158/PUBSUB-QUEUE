import express from 'express'
import { createClient } from 'redis'
const app = express();
const client = createClient();
const subscriber = createClient({
    url:"http://localhost:6380/"
})
subscriber.connect()
client.connect()
app.use(express.json())
app.post("/submit",(req,res)=>{
    const {problemId,code,language} = req.body;
    client.lPush("submissions",JSON.stringify({problemId,code,language}))
    return res.json({"success":true})
})
subscriber.on("publish",(data)=>{
    console.log(data,"coming from pubsub \n");
})
app.listen(8000)