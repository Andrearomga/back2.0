const db = require('../config/database');

class Precio {
  constructor(id, precio, articulo_id) {
    this.id = id;
    this.precio = precio;
    this.articulo_id = articulo_id;
  }

  static async create(data) {
    const query = 'INSERT INTO precio SET ?';
    return new Promise((resolve, reject) => {
      db.query(query, data, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.insertId);
      });
    });
  }

  static async getByArticuloId(articulo_id) {
    const query = 'SELECT * FROM precio WHERE articulo_id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [articulo_id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  static async deleteByArticuloId(articulo_id) {
    const query = 'DELETE FROM precio WHERE articulo_id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [articulo_id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }
}

module.exports = Precio;
