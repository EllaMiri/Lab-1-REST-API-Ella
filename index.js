import express from "express";
const app = express();
const port = 3000;
const host = "localhost";

let cats = [
  {
    name: "Cocos",
    age: 2,
    color: "Cream",
    id: 1,
  },
  {
    name: "Twister",
    age: 5,
    color: "Gray",
    id: 2,
  },
];

app.use(express.json());

app.get("/api/cats", (req, res) => {
  res.status(200);
  res.json(cats);
});

app.post("/api/cats", (req, res) => {
  cats.push(req.body);
  res.status(201);
  res.send("Cat added");
});

app.delete("/api/cats:id", (req, res) => {
  const id = req.params.id;
  cats = cats.filter((i) => {
    if (i.id !== id) {
      return true;
    }
    return false;
  });
  res.send("Cat has been removed");
});

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
