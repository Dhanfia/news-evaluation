var path = require('path')
const fetch = require('node-fetch')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const app = express()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('dist'))


// designates what port the app will listen to for incoming requests
const port = 8081;
const server = app.listen(port, () => console.log(`Running on port: ${port}`));

app.get("/", function (req, res) {
    res.sendFile("dist/index.html")
})

app.get('/test', function (req, res) {
  res.send(mockAPIResponse)
});

app.post('/processLanguage', (req, res) => {
    const key = process.env.API_KEY;
    const url = req.body.url;
    console.log(key, url);
    fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${key}&url=${url}&lang=en`, { method: 'POST' })
        .then(response => response.json())
        .then(data => res.send(data))
        .catch(error => console.log('error', error));
});