const db = require('../config/database');

class Categoria {
  constructor(id, clave, nombre, fechaCreado, activo) {
    this.id = id;
    this.clave = clave;
    this.nombre = nombre;
    this.fechaCreado = fechaCreado;
    this.activo = activo;
  }

  //crear una nueva categoría
  static async create(data) {
    const query = 'INSERT INTO categoria SET ?';
    return new Promise((resolve, reject) => {
      db.query(query, data, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.insertId);
      });
    });
  }

  // obtener todas las categorías
  static async getAll() {
    const query = 'SELECT * FROM categoria';
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  //obtener una categoría por su ID
  static async getById(id) {
    const query = 'SELECT * FROM categoria WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        if (results.length === 0) {
          return reject(new Error('Categoría no encontrada'));
        }
        resolve(results[0]);
      });
    });
  }

  //actualizar una categoría
  static async update(id, data) {
    const query = 'UPDATE categoria SET ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [data, id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  //eliminar una categoría
  static async delete(id) {
    const query = 'DELETE FROM categoria WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }
}

module.exports = Categoria;
