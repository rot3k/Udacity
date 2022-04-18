const tripData = [];
const dotenv = require("dotenv");
dotenv.config();
const fetch = require("node-fetch");

var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(express.static("dist"));
console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.listen(4000, function () {
  console.log("Example app listening on port 4000!");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get("/trips", getTrips);
function getTrips(req, res) {
  console.log(tripData);
  res.send(tripData);
}

app.post("/geoNames", gnPost);

function gnPost(req, res) {
  let data = req.body;
  console.log(data);
  gnData = {
    latitude: data.latitude,
    longitude: data.longitude,
  };
  tripData.push(gnData);
  res.send(tripData);
  console.log("GeoNameData", tripData);
}

app.post("/wb", wbPost);

function wbPost(req, res) {
  let data = req.body;
  console.log(data);
  wbData = {
    high: data.high,
    low: data.low,
    description: data.description,
  };
  tripData.push(wbData);
  res.send(tripData);
}

app.post("/pixaBay", pbPost);

function pbPost(req, res) {
  let data = req.body;
  pbData = {
    picture: data.image,
  };
  tripData.push(pbData);
  res.send(tripData);
}
