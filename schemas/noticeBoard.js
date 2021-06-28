const mongoose = require("mongoose");

const { Schema } = mongoose
const noticeBoardSchema = new Schema({
    usersId:{
        type: Number,
        required: true,     //필수로 들어가는 정보인가
        unique: true,   //유니크 값이 있어야하는가(겹치면 안되는가?)
    },
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