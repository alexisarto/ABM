const fs = require('fs');
var products = JSON.parse(fs.readFileSync(__dirname + '/../data/products.json', { encoding: "utf-8" }));

const productController = {
    create: function(req, res, next) {
        res.render('products/create');
    },
    store: function(req, res, next) {
        products.push(req.body);
        let productsJSON = JSON.stringify(products);
        fs.writeFileSync(__dirname + '/../data/products.json', productsJSON);
        res.redirect('/products/list');
    },
    edit: function(req, res, next) {
        var idProduct = req.params.id;
        var productFound;
        for (var i = 0; i < products.length; i++) {
            if (products[i].id == idProduct) {
                productFound = products[i];
                break;
            }
        }
        if (productFound) {
            res.render('products/edit', {productFound});
        } else {
            res.send('Producto invalido');
        }
    },
    update: function(req, res, next) {
        var idProduct = req.params.id;
        var editProducts = products.map(function(product) {
            if (product.id == idProduct) {
                let productEditado = req.body;
                productEditado.id = idProduct;
                return productEditado;
            }
            return product;
        });
        editProductsJSON = JSON.stringify(editProducts);
        fs.writeFileSync(__dirname + '/../data/products.json', editProductsJSON);
        products = editProducts;
        res.redirect('/products/list');
    },
    destroy: function(req, res, next) {
        var idProduct = req.params.id;
        var productFound;
        for (var i = 0; i < products.length; i++) {
            if (products[i].id == idProduct) {
                productFound = products[i];
                break;
            }
        }
        if (productFound) {
            var productDestroy = products.filter(function(product) {
                return product.id != idProduct;
            });
            productsDestroyJSON = JSON.stringify(productDestroy);
            fs.writeFileSync(__dirname + '/../data/products.json', productsDestroyJSON);
            products = productDestroy;
            res.redirect('/products/list');
        } else {
            res.send('Producto invalido');
        }
    },
    list: function(req, res, next) {
        res.render('products/list', {products});
    }    
}

module.exports = productController;