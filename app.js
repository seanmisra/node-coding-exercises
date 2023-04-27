const express = require("express");
const cors = require("cors");
const PORT = 3000;
const HOST = 'localhost';
const app = express();
const fs = require("fs");
const path = require("path");
const tester = require("./tester.js");
require('dotenv').config({ path: './local.env' });
const { MongoClient } = require("mongodb");

// need to add local.env and add your own mongo url
let uri = process.env.DATABASE_URL;
let mongoClient = new MongoClient(uri);

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

app.post("/concat", (req, res) => {
    const { stringOne } = req.body;
    const { stringTwo } = req.body;

    if (!stringOne || !stringTwo) {
        res.status(400).send({
            message: "must include both strings"
        });
        return;
    }

    return res.send(stringOne + stringTwo);
})

app.get("/range", (req, res) => {
    const min = req.query.min ? parseInt(req.query.min) : 0; // default min to 0
    const max = req.query.max ? parseInt(req.query.max) : 100; // default max to 0

    if (min > max) {
        return res.status(400).send({
            message: "min cannot be greater than max"
        })
    }

    const returnedInts = [];

    for (let i = min; i <= max; i++) {
        returnedInts.push(i);
    }

    return res.send(returnedInts);
})


app.get("/readFile", async (req, res) => {
    // can change the file name to test error scenario
    filePath = path.join(__dirname, 'mockData.json');
    const readable = fs.createReadStream(filePath, 'utf8');

    readable.on('error', err => {
        console.log("ERROR: ");
        console.log(err.stack);
    });

    let allData = []
    for await (let chunk of readable) {
        const parsedChunk = JSON.parse(chunk);
        allData.push(...parsedChunk);
    }
    
    const activeUsers = allData.filter(user => user.active);
    return res.send(activeUsers);
});

app.listen(PORT, HOST, () => {
    console.log(`Listening at http://${HOST}:${PORT}`);
});

async function connectToDB() {
    try {
        let database = mongoClient.db(process.env.DATABASE_NAME);
        let movies = database.collection(process.env.COLLECTION_NAME);

        // will show up if connection succeeded
        console.log(database);
    } finally {
        await mongoClient.close();
    }
}
connectToDB().catch(console.error);