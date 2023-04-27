const http = require("http");
const PORT = 3000;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Hello World");
        res.end();
    }
});

server.listen(PORT, HOST, () => {
    console.log(`server is running at http://${HOST}:${PORT}`);
});