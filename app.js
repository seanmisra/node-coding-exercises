const express = require("express");
const PORT = 3000;
const HOST = 'localhost';
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, HOST, () => {
    console.log(`Listening at http://${HOST}:${PORT}`);
});