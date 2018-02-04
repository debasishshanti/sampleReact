'use strict'

const fs = require('fs');
const path = require('path');
const mime = require('mime');

const http = require('http');

const PORT = process.env.PORT || 8080;

const server = http.createServer( onRequest);

function onRequest(req, res) {

    const reqPath = req.url === '/' ? '/index.html' : req.url;
    let content;

    try {
        content = fs.readFileSync(`${__dirname}${reqPath}`);
    }
    catch (e) {
        res.statusCode = 404;
        res.end();
        return;
    }

    const contentType = mime.getType(reqPath);

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
}

server.listen(PORT, (err) => {
    if (err) {
        console.error(err);
        return -1;
    }
    console.log(`Server listening to port ${PORT}`);
});