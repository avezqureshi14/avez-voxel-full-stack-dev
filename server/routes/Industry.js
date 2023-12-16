const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const startupController = require("../controllers/Industry")
const industryRoute = express();

industryRoute.use(bodyParser.json());
industryRoute.use(bodyParser.urlencoded({ extended: true }));
industryRoute.use(express.static(path.resolve(__dirname, "public")));
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  },
});
var upload = multer({ storage: storage });

industryRoute.post('/',startupController.extractUniqueIndustryAndInsert);
industryRoute.post('/filterByIndustry',startupController.filterStartupsByIndustry);

module.exports = industryRoute