const express = require("express");
const app = express();
const port = 3000;
const host = "localhost";

const cats = [
  {
    name: "Cocos",
    age: 5,
    color: "Cream",
    id: 1,
  },
  {
    name: "Twister",
    age: 3,
    color: "Black",
    id: 2,
  },
];

app.use(express.json());

app.get("/api/cats", (req, res) => {
  res.json(cats);
});

app.post("/api/cats", (req, res) => {
  cats.push(req.body);
  res.status(201);
  res.send("Cat added");
});

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
