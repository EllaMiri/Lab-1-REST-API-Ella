import express from "express";
import { v4 as uuidV4 } from "uuid";
const app = express();
const port = 3000;
const host = "localhost";

let cats = [
  // {
  //   name: "Cocos",
  //   age: 2,
  //   color: "Cream",
  //   id: uuidV4(),
  // },
  // {
  //   name: "Twister",
  //   age: 5,
  //   color: "Gray",
  //   id: uuidV4(),
  // },
];

app.use(express.json());

app.get("/api/cats", (req, res) => {
  if (cats.length === 0) {
    res.status(404);
    res.send("No cats found");
  } else {
    res.status(200);
    res.json(cats);
  }
});

app.post("/api/cats", (req, res) => {
  const cat = req.body;
  cats.push({ ...cat, id: uuidV4() });
  res.status(201);
  // res.send("Cat added");
  res.json(cats);
});

app.put("/api/cats/:id", (req, res) => {
  const catId = req.params.id;
  const { age, name, color } = req.body;

  cats = cats.map(function (cat) {
    if (cat.id === catId) {
      return {
        name,
        age,
        color,
        id: cat.id,
      };
    }
    return cat;
  });
  res.status(200);
  res.json(cats);
});

app.delete("/api/cats/:id", (req, res) => {
  const catId = req.params.id;
  cats = cats.filter(function (cat) {
    return cat.id !== catId;
  });
  res.status(200);
  res.json(cats);
});

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
