const express = require('express');
const app = express();
app.use(express.json());
const avistamentos = {};
const contadorId = 1;
const port = 4000;

app.listen(port, () => console.log(`Avistamentos. Porta ${port}.`));