const expresss = require('express');
const app = expresss();
app.use(expresss.json());
const port = 4300;


app.listen(port, console.log(`Estatisticas. Porta ${port}.`));
