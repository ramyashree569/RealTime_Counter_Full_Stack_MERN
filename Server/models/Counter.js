const mongoose = require('mongoose')

const CounterSchema = new mongoose.Schema({
    ButtonId:{
        type:String,
        required:true
    },
    ButtonValue:{
        type:String,
        required:true
    }
});


const CounterCollection = mongoose.model('Counter',CounterSchema)
module.exports = CounterCollection;