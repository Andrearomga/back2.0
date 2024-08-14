const db = require('../config/database');

class Articulo {
  constructor(id, clave, nombre, categoria_id, activo) {
    this.id = id;
    this.clave = clave;
    this.nombre = nombre;
    this.categoria_id = categoria_id;
    this.activo = activo;
  }

  static async create(data) {
    const query = 'INSERT INTO articulo SET ?';
    return new Promise((resolve, reject) => {
      db.query(query, data, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.insertId);
      });
    });
  }

  static async getAll() {
    const query = `
      SELECT articulo.*, categoria.nombre AS categoria_nombre 
      FROM articulo 
      JOIN categoria ON articulo.categoria_id = categoria.id
    `;
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  static async getById(id) {
    const query = 'SELECT * FROM articulo WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        if (results.length === 0) {
          return reject(new Error('Artículo no encontrado'));
        }
        resolve(results[0]);
      });
    });
  }

  static async update(id, data) {
    const query = 'UPDATE articulo SET ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [data, id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  static async delete(id) {
    const query = 'DELETE FROM articulo WHERE id = ?';
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

module.exports = Articulo;
