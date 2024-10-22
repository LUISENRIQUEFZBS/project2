const express = require('express');

const router = express.Router();
const usuarioController= require('../controllers/usuario')
const productosController= require('../controllers/productos')

router.get('/carrito', usuarioController.isLoggedIn, productosController.getCarrito);
router.post('/carrito', usuarioController.isLoggedIn, productosController.postCarrito)
router.post('/eliminar-producto-carrito', usuarioController.isLoggedIn, productosController.postEliminarProductoCarrito);
router.get('/:categoria?', usuarioController.isLoggedIn, productosController.getProductos);

router.get('/productos/:idProducto', productosController.getProducto);

module.exports = router;