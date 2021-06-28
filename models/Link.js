const mongoose = require('mongoose')

const linkSchema = mongoose.Schema({
    badaLink:{
        type: String,
        required:true
    },
    chhotaLink:{
        type:String,
        required:true
    },
    addedTime:{
        type:Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Link",linkSchema)