const Producto = require("../models/producto");

exports.getCrearProducto = async (req, res, next) => {
  try {
    const categorias = await Producto.getCategorias();

    res.render("admin/editar-producto", {
      titulo: "Crear Producto",
      path: "/admin/crear-producto",
      tienecaracteristicas: false,
      modoEdicion: false,
      categorias,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postCrearProducto = async (req, res, next) => {
  const nombreproducto = req.body.nombreproducto;
  const urlImagen = req.body.urlImagen;
  const precio = Number(req.body.precio);
  const descripcion = req.body.descripcion;
  const caracteristicas = req.body.caracteristicas.split(", ");
  const categoria_id = req.body.categoria; // Capturando la categoría

  const producto = new Producto(
    null,
    nombreproducto,
    urlImagen,
    precio,
    descripcion,
    caracteristicas,
    categoria_id
  );

  try {
    await producto.save();
    res.redirect("/admin/productos");
  } catch (error) {
    console.log(error);
  }
};

exports.getProductos = async (req, res, next) => {
  try {
    const categorias = await Producto.getCategorias();
    const productos = await Producto.fetchAll();
    productos.forEach(producto => {
      producto.categoria = categorias.find(x => x._id.toString() == producto.categoria_id.toString()).categoria;
    })

    res.render("admin/productos", {
      prods: productos,
      titulo: "Administracion de Productos",
      path: "/admin/productos",
    });
  } catch (error) {
    console.log(error);
  }
};

// Controlador para obtener el producto a editar
exports.getEditProductos = async (req, res, next) => {
  console.log("[controllers/admin.js > getEditProductos]");

  try {
    const categorias = await Producto.getCategorias();
    const productoId = req.params.id; // Obtiene el ID del producto de los parámetros de la URL
    const producto = await Producto.findById(productoId);

    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("admin/editar-producto", {
      titulo: "Editar Producto",
      path: "/admin/editar-producto",
      producto: producto, // Pasar el producto a la vista
      tienecaracteristicas: producto.caracteristicas != null ? true : false,
      modoEdicion: true,
      categorias,
    });
  } catch (error) {
    console.log(error);
  }
};

// Controlador para guardar los cambios del producto editado
exports.postEditProductos = async (req, res, next) => {
  const productoId = req.body.idProducto; // Obtiene el ID del producto de los parámetros de la URL
  const updatedData = {
    nombreproducto: req.body.nombreproducto,
    precio: Number(req.body.precio),
    descripcion: req.body.descripcion,
    urlImagen: req.body.urlImagen,
    categoria: req.body.categoria,
    caracteristicas:
      req.body.caracteristicas != ""
        ? req.body.caracteristicas.split(",")
        : null,
  };
  // Actualiza el producto

  try {
    await Producto.update(productoId, updatedData);
    res.redirect("/admin/productos"); // Redirige si la actualización fue exitosa
  } catch (error) {
    console.log(error);
  }
};

exports.getEliminarProducto = async (req, res) => {
  const idProducto = req.body.idProducto;
  try {
    await Producto.deleteById(idProducto);
    res.redirect("/admin/productos"); // Redirige si la actualización fue exitosa
  } catch (error) {
    console.log(error);
  }
};
