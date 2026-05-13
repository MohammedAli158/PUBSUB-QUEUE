import express from 'express';
import { createClient } from 'redis';
const app = express();
const client = createClient();
const subscriber = createClient({
    url: "redis://localhost:6379"
});
subscriber.connect();
client.connect();
app.use(express.json());
app.post("/submit", (req, res) => {
    const { problemId, code, language } = req.body;
    client.lPush("submissions", JSON.stringify({ problemId, code, language }));
    return res.json({ "success": true });
});
subscriber.subscribe("publish", (message) => {
    console.log(message);
});
app.listen(8000);
//# sourceMappingURL=index.js.map