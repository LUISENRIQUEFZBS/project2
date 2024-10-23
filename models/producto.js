
const db = require('../utils/database')

module.exports = class Producto {
    constructor(id, nombreproducto, urlImagen, precio, descripcion, caracteristicas, categoria_id) {
        this.id = id;
        this.nombreproducto = nombreproducto;
        this.urlImagen = urlImagen;
        this.precio = precio;
        this.descripcion = descripcion;
        this.caracteristicas = caracteristicas;
        this.categoria_id = categoria_id;
    }

    save() {
        return db.execute(
            'INSERT INTO productos (nombreproducto, urlimagen, precio, descripcion, caracteristicas, categoria_id) VALUES (?, ?, ?, ?, ?, ?)',
            [this.nombreproducto, this.urlImagen, this.precio, this.descripcion,this.caracteristicas, this.categoria_id]
          );
    }

    static fetchAll(ruta) {
        return ruta!=null? db.execute('SELECT *,productos.id as producto_id  FROM productos left join categorias on categorias.id=productos.categoria_id where categoria_id=( select id from categorias where ruta =?)',[ruta]): 
        db.execute('SELECT *,productos.id as producto_id FROM productos left join categorias on categorias.id=productos.categoria_id');
    }

    static findById(id) {
        return db.execute('SELECT * FROM productos WHERE productos.id = ?', [id]);
    }

    static getCategorias() {
        return db.execute('SELECT * FROM categorias');
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
