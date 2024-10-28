const Usuario = require("./usuario");

module.exports = class Carrito {
  static async agregarProducto(userId, productId, precio, nombreproducto, cantidad) {

    const usuario = await Usuario.findById(userId);
    const carrito = usuario.carrito || [];

    const productoYaAgregado = carrito.find((prod) =>
      prod._id.equals(productId)
    );

    if (productoYaAgregado) {
      productoYaAgregado.cantidad += 1;
    } else {
      carrito.push({
        _id: productId,
        precio: precio,
        nombreproducto: nombreproducto,
        cantidad: cantidad,
      });
    }

    const result = await Usuario.updateCarrito(userId, carrito);
    return result.acknowledged;
  }

  static async eliminarProducto(userId, productId) {

    const usuario = await Usuario.findById(userId);
    const carrito = usuario.carrito || [];

    const productoIndex = carrito.findIndex((prod) =>
      prod._id.equals(productId)
    );

    if (productoIndex >= 0) {
      carrito.splice(productoIndex, 1);
    }

    const result = await Usuario.updateCarrito(userId, carrito);
    return result.acknowledged;
  }

  static async getCarrito(userId) {
    const usuario = await Usuario.findById(userId);
    const { carrito } = usuario;
    return carrito;
  }
};
