const dotenv = require("dotenv");
dotenv.config();

const fetch = require("node-fetch");
const FormData = require("form-data");

const apiURL = "https://api.meaningcloud.com/sentiment-2.1";
// process.env not working
console.log(`Your API key is ${key}`);

var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");

const app = express();

app.use(express.static("dist"));

console.log(__dirname);

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

app.get("/", function (req, res) {
  res.sendFile(path.resolve("dist/index.html"));
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

// Post function was created referring to "https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/dev-tools",
app.post("/nlp", (req, res) => {
  let inputText = req.query.input;
  const formdata = new FormData();
  formdata.append("key", key);
  formdata.append("txt", inputText);
  formdata.append("lang", "en");

  const postData = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(apiURL, postData)
    .then((response) => response.json())
    .then((data) => {
      console.log("response", data);
      res.send(data);
    })
    .catch((error) => {
      console.log("error", error);
    });
});
