const keys = require("./keys");

//EXPRESS_SETUP
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const process = require("process");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//PG_CLIENT_SETUP
const { Pool } = require("pg");
const pgClient = new Pool({
  host: keys.pgHost,
  port: keys.pgPort,
  user: keys.pgUser,
  password: keys.pgPass,
  database: keys.pgDb,
  ssl:
    process.env.NODE_ENV !== "production"
      ? false
      : { rejectUnauthorized: false },
});

pgClient.on("connect", (client) => {
  client
    .query(
      "CREATE TABLE IF NOT EXISTS fib_sequence (seq_no INT, fib_value INT)"
    )
    .catch((err) => console.log(err));
});

//REDIS_CLIENT_SETUP
const redis = require("redis");
const redisClient = redis.createClient({
  // url: "redis://redis-server:6379",
  host: keys.redisHost, //docker-service or your redis-server url
  port: keys.redisPort,
  retry_strategy: () => 1000,
});

//await redisClient.connect();

const redisPublisher = redisClient.duplicate();

//ROUTE_HANDLER
app.get("/", (req, res) => {
  res.send("Hi");
  //process.exit(0);

  // client.get("visits", (err, visits) => {
  //   res.send(`Number of visits is ${visits}`);
  //   client.set("visits", parseInt(visits) + 1);
  // });
});

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM fib_sequence");
  res.send(values.rows);
});
app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.send(values);
  });
});

app.post("/values", async (req, res) => {
  const index = req.body.index;
  const fibIndex = parseInt(index);
  if (fibIndex > 40) {
    return res.status(422).send("Index too high");
  }
  redisClient.hset("values", index, "Nothing yet!");
  redisPublisher.publish("insert", index);
  pgClient.query("INSERT INTO fib_sequence(seq_no, fib_value) VALUES($1, $2)", [
    fibIndex,
    0,
  ]);

  res.send({ working: true });
});

const port = 5000;
app.listen(port, () => {
  console.log("Listening on port", port);
});
