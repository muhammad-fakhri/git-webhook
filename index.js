const express = require("express");
const bodyParser = require("body-parser");
const port = 6789;
const { exec } = require("child_process");
const secret = "your secret";

const app = express();
app.use(bodyParser.json()); // parse application/json

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Git Webhook created by Muhammad Fakhri" });
});

app.post("/webhook", (req, res) => {
  const payload = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    repo: req.body.repository,
    branch: req.body.branch,
    workdir: req.body.workdir,
    command: req.body.command,
    secret: req.body.secret,
  };

  if (
    !payload.username ||
    !payload.password ||
    !payload.name ||
    !payload.repo ||
    !payload.branch ||
    !payload.workdir ||
    !payload.command ||
    !payload.secret
  ) {
    return res
      .status(400)
      .json({ error: true, message: "Payload data is not meet requirement" });
  } else if (secret !== payload.secret) {
    return res.status(401).json({ error: true, message: "Secret mismatch" });
  } else {
    const origin = `https://${payload.username}:${payload.password}@github.com/${payload.name}/${payload.repo}.git ${payload.branch}`;
    const escapedOrigin = String(origin).replace(/([\"\'\$\`\\])/g, "\\$1");
    const escapedWorkdir = String(payload.workdir).replace(
      /([\"\'\$\`\\])/g,
      "\\$1"
    );
    const cmd = `cd ${escapedWorkdir} && git pull -f ${String(escapedOrigin)}`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ error: error.code, stdout, stderr, cmd });
      }
      if (payload.command) {
        exec(payload.command, (error, stdout, stderr) => {
          if (error) {
            return res
              .status(500)
              .json({ error: error.code, stdout, stderr, cmd });
          } else {
            return res.status(200).json({ stdout, stderr, cmd });
          }
        });
      } else {
        return res.status(200).json({ stdout, stderr, cmd });
      }
    });
  }
});

app.listen(port, () =>
  console.log(`Git webhook server running at port ${port}`)
);
