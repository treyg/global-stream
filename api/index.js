import express from "express";
//import fetch from "node-fetch";
import "dotenv/config";
//import * as notion from "./notion.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

cors({ credentials: true, origin: true });

app.listen(process.env.PORT, () => {
  console.log("server started");
});

let watchlist = [];

app.get("/", (req, res) => {
  res.send(watchlist);
});

app.post("/", (req, res) => {
  // // We will be coding here
  const item = { name: "John", age: 30, car: null };

  // Output the book to the console for debugging
  console.log("Got body:", req.body);
  watchlist.push(item);

  res.send("Item is added to the database");

  // console.log(req.body);
  // res.status(201).send("created user");
});
