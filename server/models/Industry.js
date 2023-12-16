const mongoose = require("mongoose")
const industryScheama = new mongoose.Schema({
    IndustryVertical:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})

module.exports = mongoose.model("Industry",industryScheama);