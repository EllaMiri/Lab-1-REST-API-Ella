import express from "express";
import { v4 as uuidV4 } from "uuid";
const app = express();
const port = 3000;
const host = "localhost";

// Array of cats that contains all the different cats in form of objects.
let cats = [
  {
    name: "Cocos",
    age: 2,
    color: "Cream",
    id: "61160fba-ec1f-4905-8e39-9ce9db2f362c",
  },
  {
    name: "Twister",
    age: 4,
    color: "Gray",
    id: "32cbd8aa-c888-4978-8107-1230b9d25848",
  },
];

app.use(express.json());

{
  /* GET. Shows current cats */
}
app.get("/api/cats", (req, res) => {
  res.status(200);
  res.json(cats);
});

{
  /* POST. Let's the user add a new cat to the array and gives the new cat a unique ID. */
}
app.post("/api/cats", (req, res) => {
  const cat = req.body;
  res.status(201);
  res.send("Cat created!");
  cats.push({ ...cat, id: uuidV4() });
});

{
  /* PUT. Let's the user update an existing cat based on ID. If the ID (cat) doesn't exist it throws 404 error.*/
}
app.put("/api/cats/:id", (req, res) => {
  const catId = req.params.id;
  const { age, name, color } = req.body;

  const foundCat = cats.find((cat) => cat.id === catId);

  if (!foundCat) {
    res.status(404);
    res.send("There is no cat with that ID to update.");
  } else {
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
    res.send("Cat updated!");
  }
});

{
  /* DELETE. Let's the user delete a cat based on ID. If the ID (cat) doesn't exist it throws 404 error.  */
}
app.delete("/api/cats/:id", (req, res) => {
  const catId = req.params.id;

  const foundCat = cats.find((cat) => cat.id === catId);

  if (!foundCat) {
    res.status(404);
    res.send("There is no cat with that ID to delete.");
  } else {
    cats = cats.filter(function (cat) {
      return cat.id !== catId;
    });
    res.status(200);
    res.send("Cat deleted!");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
