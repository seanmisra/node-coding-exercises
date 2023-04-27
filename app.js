const express = require("express");
const cors = require("cors");
const PORT = 3000;
const HOST = 'localhost';
const app = express();

app.use(
    cors({
        origin: "*"
    })
);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, HOST, () => {
    console.log(`Listening at http://${HOST}:${PORT}`);
});