const seneca = require('seneca')({log:'silent'});

seneca.add({"api": "products", "company": "DM"}, (products, done) => {
    console.log('products', products);
    const average = products.data.reduce((sum, product) => sum + +product.price, 0) / products.data.length;
    done(null, {average});
});

seneca.listen(9898);