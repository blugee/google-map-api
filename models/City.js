const mongoose = require('mongoose')
const { Schema } = mongoose

const CitySchema = new Schema({
    name: {
        type: String
    },
    country: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    added: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});

const CityModel = mongoose.model('City', CitySchema)

module.exports = {
    CityModel
}