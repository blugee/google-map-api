const mongoose = require('mongoose')
const { Schema } = mongoose

const ThingToDoSchema = new Schema({
    business_status: {
        type: String
    },
    geometry: {
        type: Object
    },
    icon: {
        type: String
    },
    icon_background_color: {
        type: String
    },
    icon_mask_base_uri: {
        type: String
    },
    photos: {
        type: Array
    },
    place_id: {
        type: String
    },
    plus_code: {
        type: Object
    },
    rating: {
        type: String
    },
    reference: {
        type: String
    },
    scope: {
        type: String
    },
    types: {
        type: Array
    },
    user_ratings_total: {
        type: String
    },
    vicinity: {
        type: String
    },
    name: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
});

const ThingToDoModel = mongoose.model('ThingToDo', ThingToDoSchema)

module.exports = {
    ThingToDoModel
}