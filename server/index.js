const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser");
const connectToDatabase = require("./db/connection");
const startupRoute = require("./routes/Startup")
const industryRoute = require("./routes/Industry")
const app = express();
const PORT = 8800;
app.use(cors());
app.use(bodyParser.json())

//routes
app.use('/startups',startupRoute);
app.use('/industry',industryRoute)

//database connection
connectToDatabase();


app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})