const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hi docker changed");
});

const port = 8083;
app.listen(port, () => {
  console.log("Listening on port", port);
});
