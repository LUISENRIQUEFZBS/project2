const Producto = require("../models/producto");
const Carrito = require("../models/carrito");
const path = require("../utils/path");

exports.getProductos = (req, res) => {
  console.log("[controllers/producto.js > getProductos]");
  const categoria_ruta = req.params.categoria_ruta; // Obtener la categoría desde los parámetros de la ruta
  Producto.fetchAll(categoria_ruta).then((data) => {
    const productos = data;
    const titulo = "Página principal de la Tienda";
    res.render("tienda/index", {
      prods: productos,
      titulo: titulo,
      path: `/${categoria_ruta || ""}`,
    });
  });
};

exports.getCarrito = async (req, res, next) => {
  const user = res.locals.user;
  const userId = user.id;

  const carrito = await Carrito.getCarrito(userId);

  const productos = await Producto.fetchAll();

  const productosCarrito = [];
  if (carrito) {
    for (producto of productos) {
      const productoEnCarrito = carrito.find((prod) => prod.id === producto.id);
      if (productoEnCarrito) {
        productosCarrito.push({
          dataProducto: producto,
          cantidad: productoEnCarrito.cantidad,
          nombreproducto: productoEnCarrito.nombreproducto,
        });
      }
    }
  }
  res.render("tienda/carrito", {
    titulo: "Mi carrito",
    path: "/carrito",
    productos: productosCarrito,
  });
};

exports.postCarrito = async (req, res) => {
  console.log("[controllers/producto.js > postCarrito]");
  const user = res.locals.user;
  const idProducto = Number(req.body.idProducto);
  const producto = await Producto.findById(idProducto);
  Carrito.agregarProducto(
    user.id,
    producto.id,
    producto.precio,
    producto.nombreproducto
  );
  res.redirect("/carrito");
};

exports.postEliminarProductoCarrito = async (req, res) => {
  console.log("[controllers/producto.js > postEliminarProductoCarrito]");
  const user = res.locals.user;
  const idProducto = Number(req.body.idProducto);
  Carrito.eliminarProducto(user.id, idProducto);
  res.redirect("/carrito");
};

exports.getProducto = (req, res) => {
  const idProducto = Number(req.params.idProducto);
  Producto.findById(idProducto).then((producto) => {
    res.render("tienda/detalle-producto", {
      producto: producto,
      titulo: producto.nombre,
      path: "/",
    });
  });
};
