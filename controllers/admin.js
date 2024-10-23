const Producto = require('../models/producto');

exports.getCrearProducto = async (req, res, next) => {

    const categorias=await Producto.getCategorias().then(([filas]) => {return filas})
    
    res.render('admin/editar-producto', { 
        titulo: 'Crear Producto', 
        path: '/admin/crear-producto',
        tienecaracteristicas: false,
        modoEdicion: false,
        categorias
    });
}

exports.postCrearProducto = (req, res, next) => {
    const nombreproducto = req.body.nombreproducto;
    const urlImagen = req.body.urlImagen;
    const precio = req.body.precio;
    const descripcion = req.body.descripcion;
    const caracteristicas = req.body.caracteristicas.split(', ');
    const categoria_id = req.body.categoria;  // Capturando la categoría

    const producto = new Producto(null, nombreproducto, urlImagen, precio, descripcion, caracteristicas, categoria_id);

    producto.save();
    res.redirect('/admin/productos');
}

exports.getProductos = (req, res, next) => {
    let productos;
    Producto.fetchAll().then(([filas, dataCampos])=> {
        productos = filas
        res.render('admin/productos', {
            prods: productos, 
            titulo: 'Administracion de Productos', 
            path: '/admin/productos'
        });
    });
}

// Controlador para obtener el producto a editar
exports.getEditProductos = async (req, res, next) => {
    const categorias=await Producto.getCategorias().then(([filas]) => {return filas})
    const productoId = req.params.id; // Obtiene el ID del producto de los parámetros de la URL
    Producto.findById(productoId).then(([filas]) => {
        
        const producto=filas[0];
        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }
        res.render('admin/editar-producto', {
            titulo: 'Editar Producto',
            path: '/admin/editar-producto',
            producto: producto, // Pasar el producto a la vista
            tienecaracteristicas: (producto.caracteristicas != null) ? true : false,
            modoEdicion: true,
            categorias
        });
    }).catch(err => console.log(err));
};

// Controlador para guardar los cambios del producto editado
exports.postEditProductos = (req, res, next) => {
    const productoId = req.body.idProducto; // Obtiene el ID del producto de los parámetros de la URL
    const updatedData = {
        nombreproducto: req.body.nombreproducto,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        urlImagen: req.body.urlImagen,
        categoria: req.body.categoria,
        caracteristicas: req.body.caracteristicas.split(',')
    };
    // Actualiza el producto
    Producto.update(productoId, updatedData).then(([filas]) => {
        res.redirect('/admin/productos'); // Redirige si la actualización fue exitosa
    }).catch(err => console.log(err));;

};

exports.getEliminarProducto = (req, res) => {
    const idProducto = req.body.idProducto;
    Producto.deleteById(idProducto).then(([filas]) => {
        res.redirect('/admin/productos'); // Redirige si la actualización fue exitosa
    }).catch(err => console.log(err));;
};
