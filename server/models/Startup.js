const mongoose = require("mongoose");
const startupSchema = new mongoose.Schema({
    Date:{
        type:String,
    },
    StartupName:{
        type:String,
    },
    IndustryVertical:{
        type:String,
    },
    SubVertical:{
        type:String,
    },
    CityLocation:{
        type:String,
    },
    InvestorsName:{
        type:String,
    },
    InvestmentType:{
        type:String,
    },
    AmountInUSD:{
        type:String,
    },
    Remarks:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:new Date()
    }

})

module.exports = mongoose.model('Startup',startupSchema)