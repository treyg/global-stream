import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//let watchlist = [];

// app.post("/watchlist", (req, res) => {
//   // // We will be coding here
//   // const item = req.body;

//   // // Output the book to the console for debugging
//   // console.log("Got body:", req.body);
//   // watchlist.push(item);

//   // res.send("Item is added to the database");

//   console.log(req.body);
//   res.status(201).send("created user");
// });

app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
    user: {},
  });
});

app.post("/", (req, res) => {
  // // We will be coding here
  // const item = req.body;

  // // Output the book to the console for debugging
  // console.log("Got body:", req.body);
  // watchlist.push(item);

  // res.send("Item is added to the database");

  console.log(req.body);
  res.status(201).send("created user");
});
