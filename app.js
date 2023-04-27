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

app.use(
    express.json()
);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/sum", (req, res) => {
    const input = req.body;

    if (!input || (!Array.isArray(input) && input.size === undefined)) {
        res.status(400).send({
            message: "Input must be an array of integers"
        });
        return;
    } else if (input.length === 0) {
        res.status(400).send({
            message: "Array must include at least one integer"
        });
        return;
    }

    const allNumbers = input.every(x => !isNaN(parseInt(x)))
    if (!allNumbers) {
        res.status(400).send({
            message: "Not all inputs are numbers"
        })
        return;
    }

    const sum = input.reduce((nextInt, total) => nextInt + total);
    return res.send({sum: sum});
})

app.listen(PORT, HOST, () => {
    console.log(`Listening at http://${HOST}:${PORT}`);
});