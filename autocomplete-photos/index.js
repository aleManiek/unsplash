const fetch = require("node-fetch");
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 80;

app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("public"));

app.get("/autocomplete/:query", async (req, res) => {
  const { query } = req.params;
  const url = `https://unsplash.com/nautocomplete/${query}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.autocomplete);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: true });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
