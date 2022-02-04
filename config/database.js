const mongoose = require('mongoose');

/**
 * @note Database Connection
 */
const connectDB = async () => {
    mongoose.connect('mongodb://localhost:27017/things-to-do',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(async (res) => {
            console.log('Database Connected')
        })
        .catch(err => console.log(err));
}

module.exports = {
    connectDB
}