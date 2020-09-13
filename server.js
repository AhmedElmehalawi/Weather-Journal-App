// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder which is "website"
app.use(express.static("website"));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}

// GET Route
app.get("/all", sendData);

function sendData(req, res) {
  res.send(projectData);
  console.log(projectData);
}

// POST Route
app.post("/addWeatherData", addWeatherData);

function addWeatherData(req, res) {
  projectData.temperature = req.body.temperature;
  projectData.date = req.body.date;
  projectData.user_res = req.body.user_res;
  res.end();
  console.log(projectData);
}
