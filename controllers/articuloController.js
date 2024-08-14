const Articulo = require('../models/Articulo');
const Precio = require('../models/Precio');

exports.create = async (req, res) => {
  try {
    const { precios, ...articuloData } = req.body;

    // Crear el artículo
    const newArticleId = await Articulo.create(articuloData);

    // Crear los precios asociados al artículo
    if (precios && precios.length > 0) {
      for (const precio of precios) {
        await Precio.create({ precio: precio.precio, articulo_id: newArticleId });
      }
    }

    res.status(201).json({ id: newArticleId, ...articuloData, precios });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const articulos = await Articulo.getAll();
    res.json(articulos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const articulo = await Articulo.getById(req.params.id);

    if (!articulo) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }

    // Obtener los precios asociados al artículo
    const precios = await Precio.getByArticuloId(req.params.id);

    res.json({ ...articulo, precios });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { precios, ...articuloData } = req.body;

    // Actualizar el artículo
    await Articulo.update(req.params.id, articuloData);

    // Eliminar los precios existentes
    await Precio.deleteByArticuloId(req.params.id);

    // Crear los nuevos precios asociados al artículo
    if (precios && precios.length > 0) {
      for (const precio of precios) {
        await Precio.create({ precio: precio.precio, articulo_id: req.params.id });
      }
    }

    res.json({ id: req.params.id, ...articuloData, precios });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Articulo.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
