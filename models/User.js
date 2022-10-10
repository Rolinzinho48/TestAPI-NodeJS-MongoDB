const mongoose = require('mongoose')

const User = mongoose.model('Player',{
    name:String,
    progress:Number,
    XP:Number
})

module.exports = User