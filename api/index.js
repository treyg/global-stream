import express from "express";
import "dotenv/config";
const app = express();
import * as notion from "./notion.js";
import cors from "cors";

app.use(cors());
app.use(express.json());
console.log(notion);

app.post("/", (req, res) => {
  console.log(req.body);
  //notion.getTypes().then((types) => {
  notion.createWatchSuggestion({
    title: req.body.title,
    summary: req.body.summary,
    isWatched: false,
    //url: req.body.url,
    //types: req.body.types,
  });
  //});
  res.send("added item");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
