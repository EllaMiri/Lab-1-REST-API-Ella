import express from "express";
import { v4 as uuidV4 } from "uuid";
const app = express();
const port = 3000;
const host = "localhost";

// Array of cats that contains all the different cats in form of objects.
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

{
  /* GET. Checks if there are any cats in the array, 
if no sends 404 and if yes displays cats and 200 status code. */
}
app.get("/api/cats", (req, res) => {
  if (cats.length === 0) {
    res.status(404);
    res.send("No cats found");
  } else {
    res.status(200);
    res.json(cats);
  }
});

{
  /* POST. Let's the user add a new cat to the array and gives the new cat a unique ID. */
}
app.post("/api/cats", (req, res) => {
  const cat = req.body;
  res.status(201);
  res.send("Cat created!");
  cats.push({ ...cat, id: uuidV4() });
  // res.json(cats);
});

{
  /* PUT. Let's the user update an existing cat based on ID. If the ID (cat) doesn't exist it throws 404 error.*/
}
app.put("/api/cats/:id", (req, res) => {
  const catId = req.params.id;
  const { age, name, color } = req.body;

  const cat = cats.find((element) => {
    if (element.id !== catId) {
      res.send("There is no cat with that ID to update.");
      res.status(404);
      return false;
    } else {
      cats = cats.map(function (cat) {
        res.status(200);
        res.send("Cat updated!");
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
    }
  });
  // res.json(cats);
});

{
  /* DELETE. Let's the user delete a cat based on ID. If the ID (cat) doesn't exist it throws 404 error.  */
}
app.delete("/api/cats/:id", (req, res) => {
  const catId = req.params.id;
  // let foundIndex = cats.findIndex((cat) => cat.id === catId);
  // if (foundIndex !== catId) {
  //   res.status(404);
  //   res.send("There is no cat with that ID");
  // } else {

  const cat = cats.find((element) => {
    if (element.id !== catId) {
      res.status(404);
      res.send("There is no cat with that ID to delete.");
      return false;
    } else {
      cats = cats.filter(function (cat) {
        res.status(200);
        res.send("Cat deleted!");
        return cat.id !== catId;
      });
    }
    // res.json(cats);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
