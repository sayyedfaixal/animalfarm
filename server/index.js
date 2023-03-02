import express from "express";
import cors from "cors";
import Chance from "chance";
// Initialize the express app
const app = express();
app.use(cors());

// Middleware use to parse the response in the JSON format
app.use(express.json());

// Getting the data from the Chancejs which generates fake data
const chance = new Chance();

// Creating an array of 300 elements each having different property that we get from chancejs, this data will be searched by the user at UI
const animals = [...Array(300).keys()].map((id) => {
  return {
    id,
    animalType: chance.animal(),
    age: chance.age(),
    name: chance.name(),
  };
});

// Creating an endpoint
app.get("", (req, res) => {
  // Filtering query by the search result
  const searchQuery = req.query.searchQuery?.toLocaleLowerCase() || "";

  //   Filtering the animals based on the searched value by the user
  const results = animals.filter((animal) =>
    animal.animalType.toLowerCase().includes(searchQuery)
  );
  res.send(results);
});

app.listen(8080, () => console.log(`LISTENING ON PORT http://localhost:8080`));
