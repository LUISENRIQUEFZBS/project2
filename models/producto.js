
const db = require('../utils/database')

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

    static fetchAll(ruta) {
        return ruta!=null? db.execute('SELECT *,productos.id as producto_id  FROM productos left join categorias on categorias.id=productos.categoria_id where categoria_id=( select id from categorias where ruta =?)',[ruta]): db.execute('SELECT *,productos.id as producto_id FROM productos left join categorias on categorias.id=productos.categoria_id');
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
        return db.execute('DELETE FROM productos WHERE productos.id = ?', [id]);
    }    
}
