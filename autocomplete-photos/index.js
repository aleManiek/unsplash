const fetch = require("node-fetch");
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();

// const url = `https://unsplash.com/nautocomplete/auto`;
// fetch(url).then((res) => res.json().then((data) => console.log(data)));
app.use(cors());

app.use(express.static(path.join(__dirname, "..", "build")));
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

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
