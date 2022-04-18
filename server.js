// Refer to Udacity Web APIs and Asynchronous Applications Lecture
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require("express");

// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

const port = 3000;

// Setup Server

const server = app.listen(port, listening);

function listening() {
  console.log("server is running");
  console.log(`running on localhost: ${port}`);
}

//add a GET route that returns projectData
app.get("/all", (req, res) => {
  res.send(projectData);
});

//add a POST route that store the data in projectData
app.post("/add", (req, res) => {
  let data = req.body;
  console.log("data", data);
  let newData = {
    date: data.date,
    temp: data.temp,
    content: data.content,
  };
  console.log("newData", newData);
  projectData = newData;
  console.log("projectData", projectData);
  res.send(projectData);
});
