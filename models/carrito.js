const fs = require('fs');
const path = require('path');

const raizDir = require('../utils/path');
//const { fileLoader } = require('ejs');

const p = path.join(raizDir, 'data', 'carrito.json')

module.exports = class Carrito{
    static agregarProducto(id, precio, nombreproducto){

        fs.readFile(p, (err, fileContent) => {
            let carrito = {productos: [], precioTotal: 0};
            if (!err && fileContent.length > 0) {
                try {
                    carrito = JSON.parse(fileContent);
                } catch (parseErr) {
                    console.error("Error al analizar JSON:", parseErr);
                }
            }

            // Asegurarse de que `carrito.productos` esté definido
            if (!carrito.productos) {
                carrito.productos = [];
            }

            const indiceProductoExistente = carrito.productos.findIndex(prod => prod.id === id);
            const productoExistente = carrito.productos[indiceProductoExistente];
            let productoActualizado;
            //Si el producto existe
            if(productoExistente){
                //Incrementar la cantidad
                productoActualizado = {...productoExistente};
                productoActualizado.cantidad = productoActualizado.cantidad + 1;
                carrito.productos = [...carrito.productos];
                carrito.productos[indiceProductoExistente] = productoActualizado;
            //Si el producto no existe    
            }else{
                //Empezar la cantidad con 1 unidad
                productoActualizado = {id: id, cantidad: 1, nombreproducto: nombreproducto, precio: precio};
                carrito.productos = [...carrito.productos, productoActualizado];
            }
            carrito.precioTotal = carrito.precioTotal != null ? +carrito.precioTotal + +precio : precio;
            fs.writeFile(p, JSON.stringify(carrito), err => {
                console.log(err);
            })
        })
    }

    static eliminarProducto(id, precio){
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const carritoActualizado = { ...JSON.parse(fileContent) };
            const producto = carritoActualizado.productos.find(prod => prod.id === id);
            if (!producto) {
                return;
            }
            const cantidadProducto = producto.cantidad;
            carritoActualizado.productos = carritoActualizado.productos.filter(
                prod => prod.id !== id
            );
            carritoActualizado.precioTotal = carritoActualizado.precioTotal - precio * cantidadProducto;
            fs.writeFile(p, JSON.stringify(carritoActualizado), err =>{
                console.log(err);
            });
        });
    }

    static getCarrito(callback) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                callback(null); //Se maneja el error de lectura
            } else {
                const carrito = JSON.parse(fileContent);
                callback(carrito); // Devolver el contenido del carrito
            }
        });
    }
}