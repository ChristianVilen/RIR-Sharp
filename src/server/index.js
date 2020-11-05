const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000
const sharp = require('sharp');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.get('/resizedimage/:url/:height/:width', async function (req, res) {
    const height = parseInt(req.params.height);
    const width = parseInt(req.params.width);
    const url = req.params.url;
    const image = await axios
        .get(url, {
            responseType: 'arraybuffer'
        })
        .then(response => {
            return Buffer.from(response.data, 'binary').toString('base64');
        });

    const resizedImage = await sharp(new Buffer(image, 'base64'))
        .resize(height, width)
        .png()
        .toBuffer();
    res.setHeader('Content-Type', 'image/png')
    res.send(resizedImage);
})

app.post('/resizedimage', async function (req, res) {
    const height = parseInt(req.body.height);
    const width = parseInt(req.body.width);
    const image = req.body.image;
    const resizedImage = await sharp(new Buffer(image, 'base64'))
        .resize(height, width)
        .png()
        .toBuffer();
    res.setHeader('Content-Type', 'image/png')
    res.send(resizedImage);
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))