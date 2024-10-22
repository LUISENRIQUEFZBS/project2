
const fs = require('fs');
const path = require('path');

const raizDir = require('../utils/path');
const db = require('../utils/database')


const u = path.join(
    raizDir,
    'data',
    'usuarios.json'
  );

const getUsuariosFromFile =   cb => {
    fs.readFile(u, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Usuario{
    constructor(id,nombres, apellidos,email,password,isAdmin){
        this.id=id;
        this.nombres=nombres;
        this.apellidos=apellidos;
        this.email=email;
        this.password=password;
        this.isAdmin=isAdmin;
    }
    save(){
        return db.execute(
            'INSERT INTO usuarios (nombres,apellidos,email,password,isadmin) VALUES (?, ?, ?, ?,?)',
            [this.nombres, this.apellidos, this.email, this.password,this.isAdmin]    
        );
    }
    static fetchAll() {
        return db.execute('SELECT * FROM usuarios');
    }
    static async getAll() {
        return db.execute('SELECT * FROM usuarios');
    }

}