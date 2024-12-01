const express = require("express");
const redis = require("redis");
const process = require("process");

const app = express();
const client = redis.createClient({
  // url: "redis://redis-server:6379",
  host: "redis-server", //docker-service or your redis-server url
  port: 6379,
});
client.set("visits", 0);

app.get("/", (req, res) => {
  process.exit(0);

  client.get("visits", (err, visits) => {
    res.send(`Number of visits is ${visits}`);
    client.set("visits", parseInt(visits) + 1);
  });
});

const port = 8083;
app.listen(port, () => {
  console.log("Listening on port", port);
});
