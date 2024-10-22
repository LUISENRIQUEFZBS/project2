const Producto = require('../models/producto');
const Carrito = require('../models/carrito');
const path = require('../utils/path');

exports.getProductos = (req, res) => {
    console.log(req.params);
    const categoria = req.params.categoria; // Obtener la categoría desde los parámetros de la ruta
    const categoriasDisponibles = {
        mobile: "Productos Mobile",
        tv_audio: "Productos TV & Audio",
        electrodomesticos: "Electrodomésticos",
        tecnologia_ai: "Tecnología AI",
        ventas_especiales: "Ventas Especiales"
    };

    Producto.fetchAll(productos => {
        let productosFiltrados = productos;

        if (categoria) {
            productosFiltrados = productos.filter(producto => producto.categoria === categoria);
        }

        const titulo = categoriasDisponibles[categoria] || "Página principal de la Tienda";

        res.render('tienda/index', {
            prods: productosFiltrados,
            titulo: titulo,
            path: `/${categoria || ''}`
        });
    });
};

exports.getCarrito = (req, res, next) => {
    Carrito.getCarrito(carrito => {
        Producto.fetchAll(productos => {
            const productosCarrito = [];
            if (carrito && carrito.productos) {
             for (producto of productos) {
                 const productoEnCarrito = carrito.productos.find(
                     prod => prod.id === producto.id
                 );
                 if (productoEnCarrito) {
                     productosCarrito.push({ dataProducto: producto, cantidad: productoEnCarrito.cantidad, nombreproducto: productoEnCarrito.nombreproducto});
                 }
             }
            }
            res.render('tienda/carrito', {
                titulo: 'Mi carrito',
                path: '/carrito',
                productos: productosCarrito
            });
        });
    });
};

exports.postCarrito = (req, res) => {
    const idProducto = req.body.idProducto;
    Producto.findById(idProducto, producto => {
        Carrito.agregarProducto(idProducto, producto.precio, producto.nombreproducto);
        res.redirect('/carrito');
    });
}

exports.postEliminarProductoCarrito = (req, res) => {
    const idProducto = req.body.idProducto;
    Producto.findById(idProducto, producto =>{
        Carrito.eliminarProducto(idProducto, producto.precio);
        res.redirect('/carrito');
    });
};

exports.getProducto = (req, res) => {
    const idProducto = req.params.idProducto;
    Producto.findById(idProducto, (producto) => {
        res.render('tienda/detalle-producto', {
            producto: producto,
            titulo: producto.nombre,
            path: "/"
        })
    })
}
