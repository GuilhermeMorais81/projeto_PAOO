const express = require('express');
const app = express();
app.use(express.json());
const port = 10000;

app.listen(port, () => console.log(`Barramento. Porta ${port}.`));