const express = require('express');
const app = express()
const cors = require('cors');
const { default: axios } = require('axios');
const { connectDB } = require('./config/database')
const { CityModel } = require('./models/City');
const path = require('path');
const { cronTodo } = require('./cronData');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded());

var secretKey = process.env.SECRET_KEY_GOOGLE

connectDB()
app.get('/things-to-do', async (req, res) => {
    try {

        const data = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.latitude},${req.query.longitude}&radius=${req.query.radius}&keyword=things to do ${req.query.place ? "in " + req.query.place : ''}&rankby=prominence&periods&key=${secretKey}`
        )

        if (data.data.status === "OK") {
            let result = {
                response_code: "E_SUCCESS",
                data: data.data
            }
            return res.status(200).send(result)
        }
        else {
            console.log(data);
            return res.status(500).end();
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).end();
    }
});

app.get('/next-page', async (req, res) => {
    try {
        let token = req.query.token
        const data = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${token}&key=${secretKey}`
        )

        if (data.data.status === "OK") {
            let result = {
                response_code: "E_SUCCESS",
                data: data.data
            }
            console.log(data.data)
            return res.status(200).send(result);
        }
        else {
            console.log(data);
            return res.status(500).end();
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).end();
    }
});

app.get('/get-place-by-id', async (req, res) => {
    try {
        const data = await axios.get(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.query.place_id}&key=${secretKey}`
        )

        if (data.data.status === "OK") {
            let result = {
                response_code: "E_SUCCESS",
                data: data.data
            }
            return res.status(200).send(result);
        }
        else {
            return res.status(500).end(data);
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).end();
    }
});

app.get('/search-place', async (req, res) => {
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.query.place}&inputtype=textquery&key=${secretKey}`,
        headers: {}
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return res.status(200).send(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
})


app.use(express.static(path.join(__dirname, './public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/add-city', async (req, res) => {
    if (!req.body.name || !req.body.country || !req.body.latitude || !req.body.longitude) {
        return res.status(401).send({ code: "err", message: "mandatory fields" })
    }
    try {

        let city = await CityModel.findOne({ name: req.body.name })

        if (!city) {
            let obj = new CityModel({
                name: req.body.name,
                country: req.body.country,
                latitude: req.body.latitude,
                longitude: req.body.longitude
            })
            city = await obj.save()
            return res.status(200).send({ code: "success", message: "successfully saved" })
        } else {
            return res.status(401).send({ code: "err", message: "Already exist" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: "err", message: "Server Error", err: error })
    }
})

cronTodo()

let PORT = 8080

app.listen(PORT, function () {
    console.log(`server is running on http://localhost:${PORT}`)
})