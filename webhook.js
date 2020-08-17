const secret = "you secret";
const repo = "path to your project dir"; // example: "~/projectA/"

const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;
const url = require('url');

http.createServer(function (req, res) {
    req.on('data', function (chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
        
        if (req.headers['x-hub-signature'] == sig) {
            console.log("Git webhook triggered");
            exec('cd ' + repo + ' && git pull');
        }
    });

    res.end();
}).listen(8080);

var url = require('url'); 
var url_parts = url.parse(request.url, true);
var query = url_parts.query;
	const origin = 
`https://${payload.username}:${payload.password}@github.com/${payload.name}/${payload.repo}.git 
${payload.branch}`;
	
