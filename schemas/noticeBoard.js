const mongoose = require("mongoose");

const { Schema } = mongoose
const noticeBoardSchema = new Schema({
   
    writer:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true,
    },
    contents:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    writeDate:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("writing", noticeBoardSchema);