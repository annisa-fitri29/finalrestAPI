const mongoose = require('mongoose')

const datamhs = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    nim: {
        type: String,
        required: true
    },
    umur: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Data', datamhs)