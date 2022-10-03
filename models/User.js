const mongoose = require('mongoose')

const User = mongoose.model('User',{
    nome:String,
    saldo:Number,
    PosX:Number
})

module.exports = User