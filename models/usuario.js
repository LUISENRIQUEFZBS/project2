const { ObjectId } = require("mongodb");

const db = require("../utils/database");
const usuarios = db.collection("usuarios");

module.exports = class Usuario {
  constructor(id, nombres, apellidos, email, password, isAdmin) {
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
  }

  async save() {
    console.log("[models/usuario.js > save]");
    const result = await usuarios.insertOne({
      nombres: this.nombres,
      apellidos: this.apellidos,
      email: this.email,
      password: this.password,
      isAdmin: this.isAdmin,
    });
    return result;
  }

  static async updateCarrito(userId, carrito) {
    console.log("[models/usuario.js > updateCarrito]");
    const result = await usuarios.updateOne(
      { _id: userId },
      { $set: { carrito: carrito } }
    );
    return result;
  }

  static async findById(id) {
    console.log("[models/usuario.js > findById]");
    const user = await usuarios.findOne({ _id: new ObjectId(id) });
    return user;
  }

  static async findByEmail(email) {
    console.log("[models/usuario.js > findByEmail]");
    const user = await usuarios.findOne({ email: email });
    return user;
  }

  static async fetchAll() {
    return await usuarios.find().toArray();
  }
};
