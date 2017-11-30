const express = require('express')
    , axios = require('axios')
    , bodyParser = require('body-parser')
    , app = express()
    , port = 3344
    , seneca = require('seneca')({ log: 'silent' });
    
seneca.client(9898);

app.use(bodyParser.json())
    .use((req, res, next) => { console.log(req.method, req.url); next(); });

app.get('/api/products', (req, res) => {
    axios.get('https://practiceapi.devmountain.com/products')
        .then(response => {
            seneca.act({ "api": "products", "company": "DM", "data": response.data }, (err, avg) => {
                return res.status(200).send({ products: response.data, average: avg.average });
            });
        })
        .catch(err => console.log('ERROR:', err));
});

app.listen(port, () => { console.log(`Listening on ${port}.`); });