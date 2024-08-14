const express = require('express');
const app = express();
const connection = require('./config/database'); 

app.use(express.json());

const categoriaRoutes = require('./routes/categoria');
const articuloRoutes = require('./routes/articulo');


app.use('/categoria', categoriaRoutes);
app.use('/articulo', articuloRoutes);


app.get('/test-connection', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', (err, results, fields) => {
    if (err) throw err;
    res.send(`La solución es: ${results[0].solution}`);
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
