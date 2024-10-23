const fs = require('fs');
const path = require('path');
const db = require('../utils/database')


const raizDir = require('../utils/path.js');
const p = path.join(raizDir, 'data', 'productos.json');
const c = path.join(raizDir, 'data', 'info.json');

const getProductosFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            console.error('No se pudo leer el archivo de productos.');
            cb([]);
        } else {
            cb(JSON.parse(fileContent)); // Convierte los datos del archivo a legibles
        }
    });
}

module.exports = class Producto {
    constructor(id, nombreproducto, urlImagen, precio, descripcion, caracteristicas, categoria) {
        this.id = id;
        this.nombreproducto = nombreproducto;
        this.urlImagen = urlImagen;
        this.precio = precio;
        this.descripcion = descripcion;
        this.caracteristicas = caracteristicas;
        this.categoria = categoria;
    }

    save() {
        return db.execute(
            'INSERT INTO productos (nombreproducto, urlimagen, precio, descripcion) VALUES (?, ?, ?, ?)',
            [this.nombreproducto, this.urlImagen, this.precio, this.descripcion]
          );
    }

    // static fetchAll() {
    //     return db.execute('SELECT * FROM productos');
    // }
    static fetchAll(ruta) {
        return ruta!=null? db.execute('SELECT * FROM productos left join categorias on categorias.id=productos.categoria_id where categoria_id=( select id from categorias where ruta =?)',[ruta]): db.execute('SELECT * FROM productos left join categorias on categorias.id=productos.categoria_id');
    }

    static findById(id) {
        return db.execute('SELECT * FROM productos WHERE productos.id = ?', [id]);
    }

    static update(id, updatedData) {
        return db.execute(
            'UPDATE  productos SET nombreproducto=? , precio=?,descripcion=?, urlimagen=?,categoria_id=?, caracteristicas=? WHERE id=?',
            [updatedData.nombreproducto, updatedData.precio,updatedData.descripcion,updatedData.urlImagen,  updatedData.categoria, updatedData.caracteristicas, id]
          );
       
       
    }

    static deleteById(id) {
        getProductosFromFile(productos => {
            const productosActualizados = productos.filter(prod => prod.id !== id); // Filtrar el producto por id
            fs.writeFile(p, JSON.stringify(productosActualizados), err => { // Guardar la nueva lista sin el producto
                if (err) {
                    console.error('No se pudo eliminar el producto.');
                } else {
                    console.log(`Producto con ID: ${id} eliminado correctamente.`);
                }
            });
        });
    }    
}
