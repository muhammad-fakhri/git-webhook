// Place your secret here
const secret = "you secret";

const http = require("http");
const crypto = require("crypto");
const exec = require("child_process").exec;
const url = require("url");

http
  .createServer(function (req, res) {
    req.on("data", function (chunk) {
      let sig =
        "sha1=" +
        crypto
          .createHmac("sha1", secret)
          .update(chunk.toString())
          .digest("hex");
      console.log("Nice");
      if (req.headers["x-hub-signature"] == sig) {
        const url_parts = url.parse(req.url, true);
        const query = url_parts.query;
        const origin = `https://${query.username}:${query.token}@github.com/${query.username}/${query.repo}.git ${query.branch}`;
        exec(`cd ${query.workdir} && git pull ${origin}`);
        if (query.command) exec(command);
        console.log("Git webhook triggered");
      }
    });

    res.end();
  })
  .listen(8080);
