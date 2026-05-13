import express from 'express';
import { createClient } from 'redis';
const app = express();
const client = createClient();
client.connect();
app.use(express.json());
app.post("/submit", (req, res) => {
    const { problemId, code, language } = req.body;
    client.lPush("submissions", JSON.stringify({ problemId, code, language }));
    return res.json({ "success": true });
});
app.listen(8000);
//# sourceMappingURL=index.js.map