// Place your secret here
const secret = "you secret";

const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;
const url = require('url');

http.createServer(function (req, res) {
    req.on('data', function (chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

        if (req.headers['x-hub-signature'] == sig) {
            const url_parts = url.parse(req.url, true);
            const query = url_parts.query;
            let workdir = query.workdir;
            exec('cd ' + workdir + ' && git pull');
            console.log("Git webhook triggered");
        }
    });

    res.end();
}).listen(8080);