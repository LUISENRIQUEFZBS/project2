const Producto = require("../models/producto");
const Carrito = require("../models/carrito");
const Pedido = require("../models/pedido");
const Usuario = require("../models/usuario");

exports.getProductos = async (req, res) => {
  const categorias = await Producto.getCategorias();
  const categoria_ruta = req.params.categoria_ruta; // Obtener la categoría desde los parámetros de la ruta
  const productos = await Producto.fetchAll(categoria_ruta);
  const titulo = "Página principal de la Tienda";
  productos.forEach(producto => {
    producto.categoria = categorias.find(x => x._id.toString() == producto.categoria_id.toString()).categoria;
  })
  res.render("tienda/index", {
    prods: productos,
    titulo: titulo,
    path: `/${categoria_ruta || ""}`,
  });

};

exports.getCarrito = async (req, res, next) => {
  
  const user = res.locals.user;
  const userId = user._id;

  const carrito = await Carrito.getCarrito(userId);

  const productos = await Producto.fetchAll();

  const productosCarrito = [];
  if (carrito) {
    for (producto of productos) {
      const productoEnCarrito = carrito.find((prod) =>
        prod._id.equals(producto._id)
      );
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
  
  const user = res.locals.user;
  const idProducto = req.body.idProducto;
  const producto = await Producto.findById(idProducto);
  const cantidad = Number(req.body.quantity);
  await Carrito.agregarProducto(
    user._id,
    producto._id,
    producto.precio,
    producto.nombreproducto,
    cantidad
  );
  res.redirect("/carrito");
};

exports.postEliminarProductoCarrito = async (req, res) => {
  
  const user = res.locals.user;
  const idProducto = req.body.idProducto;
  await Carrito.eliminarProducto(user._id, idProducto);
  res.redirect("/carrito");
};

exports.getProducto = (req, res) => {
  const idProducto = req.params.idProducto;
  Producto.findById(idProducto).then((producto) => {
    res.render("tienda/detalle-producto", {
      producto: producto,
      titulo: producto.nombre,
      path: "/",
    });
  });
};

exports.getPedidos = async(req, res, next) => {

  const userId = res.locals.user._id;
  const userPedidos = await Pedido.fetchAll(userId);

  try {
    res.render('tienda/pedidos', {
        path: '/pedidos',
        titulo: 'Mis Pedidos',
        pedidos: userPedidos
    });
  }
  catch { console.log(err) } 
};

exports.postPedido = async (req, res, next) => {
  const userId = res.locals.user._id;
  const carrito = await Carrito.getCarrito(userId);

  const pedido = new Pedido(null, userId, carrito)
  
  try {
    await pedido.save();
    await Usuario.updateCarrito(userId, null)
    res.redirect('/pedidos');
  } catch (error) {
    console.log(error);
  }
}; 