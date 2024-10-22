
const fs = require('fs');
const path = require('path');

const raizDir = require('../utils/path');

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
        getUsuariosFromFile(usuarios => {
            console.log(usuarios)
            usuarios.push(this);
            fs.writeFile(u, JSON.stringify(usuarios), err => {
              console.log(err);
            });
        });
    }
    static fetchAll(cb) {
        getUsuariosFromFile(cb);
    }
    static async getAll() {
        return JSON.parse(fs.readFileSync(u, `utf-8`));
    }

}