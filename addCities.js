const fs = require('fs-extra');
const { CityModel } = require('./models/City');
const { connectDB } = require('./config/database')
connectDB()

let dataInsert = async (data) => {
    let data1 = await CityModel.insertMany(data)
    console.log(data1)
    return data1
}


let data = async () => {

    try {
        let data = fs.readJSONSync('PlacesCount.json')
        let country,
            cityData = []
        for (let i = 0; i < data.Sheet1.length; i++) {
            const element = data.Sheet1[i];
            console.log(element);

            if (element.Country) {
                country = element.Country
            } else {
                let Obj = {
                    name: element.City,
                    country: country,
                    latitude: element.Latitude,
                    longitude: element.Longitude,
                    added: false
                }
                cityData.push(Obj);
            }
        }
        console.log(cityData)
        await dataInsert(cityData)

    } catch (error) {
        console.log(error);
    }
}

data()
