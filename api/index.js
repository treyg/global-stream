import express from "express";
import "dotenv/config";
const app = express();
import * as notion from "./notion.js";
import cors from "cors";

app.use(cors());
app.use(express.json());
//notion.getDatabase();
app.post("/", (req, res) => {
  console.log(req.body);
  //notion.getTypes().then((types) => {
  notion.createWatchSuggestion({
    title: req.body.title,
    summary: req.body.summary,
    isWatched: false,
    media_type: req.body.type,
    url: req.body.url,
  });
  //});
  res.send("added item");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

