const Categoria = require('../models/Categoria');

exports.create = async (req, res) => {
  try {
    const id = await Categoria.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getAll = async (req, res) => {
  try {
    const categorias = await Categoria.getAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const categoria = await Categoria.getById(req.params.id);
    res.json(categoria);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.update = async (req, res) => {
  try {
    await Categoria.update(req.params.id, req.body);
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    await Categoria.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
