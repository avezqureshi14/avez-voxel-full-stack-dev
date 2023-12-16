const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const startupController = require("../controllers/Startup")
const startupRoute = express();

startupRoute.use(bodyParser.json());
startupRoute.use(bodyParser.urlencoded({ extended: true }));
startupRoute.use(express.static(path.resolve(__dirname, "public")));
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  },
});
var upload = multer({ storage: storage });

//this route is for converting csv provided dataset into json format and pushing into mongodb database
startupRoute.post('/',upload.single('file'),startupController.importStartUps);

startupRoute.post('/new',startupController.createStartup);
startupRoute.get('/paginate',startupController.getStartupsPaginate);
startupRoute.get('/',startupController.getStartups);
startupRoute.get('/search',startupController.searchStartUps);
startupRoute.get('/len',startupController.getLength);
startupRoute.get('/invest',startupController.getInvestmentType);
startupRoute.get('/inds',startupController.getIndustry);
startupRoute.get('/:id',startupController.getStartupById);
startupRoute.put('/update/:id',startupController.updateStartup);
startupRoute.delete('/:id',startupController.deleteStartup);


module.exports = startupRoute;