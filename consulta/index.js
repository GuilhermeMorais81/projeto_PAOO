const express = require('express');
const app = express();
app.use(express.json());
const port = 4200;
const baseConsulta = {};

app.listen(port, () => console.log(`Consulta. Porta ${port}.`));

app.get('/avistamentos', async (req, res) => {
    res.json(baseConsulta);
})