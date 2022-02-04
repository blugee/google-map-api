const mongoose = require('mongoose')
const { Schema } = mongoose

const CountrySchema = new Schema({
    name: {
        type: String
    },
    iso3: {
        type: String
    },
    iso2: {
        type: String
    },
    numeric_code: {
        type: String
    },
    phone_code: {
        type: String
    },
    capital: {
        type: String
    },
    currency: {
        type: String
    },
    currency_symbol: {
        type: String
    },
    tld: {
        type: String
    },
    native: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    region: {
        type: String
    },
    subregion: {
        type: String
    },
    timezones: {
        type: Array
    },
    status: {
        type: String
    },
    modified_by: {
        type: Schema.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    versionKey: false
});

const CountryModel = mongoose.model('Country', CountrySchema)

module.exports = {
    CountryModel
}