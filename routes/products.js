var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

/* mostrar formulario crear producto */
router.get('/create', productController.create);
/* recibo datos formulario crear producto */
router.post('/create', productController.store);

/* mostrar formulario editar producto */
router.get('/edit/:id', productController.edit);
/* recibo datos formulario edicion producto */
router.post('/edit/:id', productController.update);

/* eliminar producto */
router.get('/destroy/:id', productController.destroy);

/* listado de productos */
router.get('/list', productController.list);

module.exports = router;