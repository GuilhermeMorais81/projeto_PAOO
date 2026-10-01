const express = require('express');
const app = express();
app.use(express.json());
const port = 4100;

app.listen(port, () => console.log(`Relatos. Porta ${port}.`));