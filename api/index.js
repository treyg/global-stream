import express from "express";
//import fetch from "node-fetch";
import "dotenv/config";
const app = express();
import * as notion from "./notion.js";

console.log(notion);

//const API_URL = `https://api.notion.com/v1/databases/${process.env.VUE_APP_NOTION_DATABASE_ID}`;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT);
