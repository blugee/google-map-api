var cron = require('node-cron');
const { CityModel } = require('./models/City');
const { ThingToDoModel } = require('./models/things_to_do');
const { connectDB } = require('./config/database');
var secretKey = process.env.SECRET_KEY_GOOGLE

const thingsTodo = async () => {
    connectDB()
    const { default: axios } = require('axios');
    const fs = require('fs-extra');

    let City = await CityModel.find({ added: false });
    console.log("total city remain", City.length);
    let dataTodo = []

    const nextPageToken = async (next) => {
        try {

            const data = await axios.get(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${next}&key=${secretKey}`
            )

            if (data.data.status === "OK") {
                dataTodo = dataTodo.concat(data.data.results)
                if (data.data.next_page_token) {
                    await nextPageToken(data.data.next_page_token)
                } else {
                    return
                }
            }
            else {
                console.log(data);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const dataFn = async (latitude, longitude, radius, place, country, id) => {
        try {
            const data = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&keyword="things to do in ${place}"&rankby=prominence&periods&key=${secretKey}`)

            if (data.data.status === "OK") {
                dataTodo = dataTodo.concat(data.data.results)

                if (data.data.next_page_token) {
                    await nextPageToken(data.data.next_page_token)
                }
                for (let index = 0; index < dataTodo.length; index++) {
                    const element = dataTodo[index];
                    let things = await ThingToDoModel.findOne({ name: element.name })
                    if (!things) {
                        await ThingToDoModel.create(element);
                    }
                }
                // let todo = await ThingToDoModel.insertMany(dataTodo)
                let updateCity = await CityModel.updateOne({ _id: id }, { added: true })
                console.log(updateCity)
                // console.log(todo)
                let dirPath = __dirname + '/countries/' + country
                fs.mkdirsSync(dirPath)
                fs.writeJSONSync(dirPath + '/' + place + '.json', dataTodo)
                return
            }
            else {
                console.log(data);
                return
            }
        } catch (error) {
            console.log(error);
            return
        }
    }
    for (let i = 0; i < City.length; i++) {
        const element = City[i];
        await dataFn(element.latitude, element.longitude, 50000, element.name, element.country, element._id)
        dataTodo = []
    }
}

const cronTodo = () => {
    console.log("cronStarted")
    cron.schedule('*/5 * * * *', async () => {
        console.log('running a task every minute');
        await thingsTodo()
    });
}
// thingsTodo()

module.exports = { cronTodo }