const express = require('express')
    , axios = require('axios')
    , bodyParser = require('body-parser')
    , app = express()
    , seneca = require('seneca')({log: 'silent'}).client(9898)
    , port = 3344;

app
    .use(bodyParser.json())
    // .use((req, res, next) => { console.log(req.method, req.url); next(); })
    .get('/api/products', (req, res) => {
        console.log('server GO!')
        axios.get('https://practiceapi.devmountain.com/products')
        .then(response => {
            console.log('response', response)
            seneca.act({"api": "products", "company": "DM", "data": response.data}, (err, avg) => {
                console.log('avg', avg);
                return res.status(200).send({products: response.data, average: avg.average});
            });
        })
        .catch(err => console.log('ERROR:', err));
    })
    .listen(port, () => { console.log(`Listening on ${port}.`); });