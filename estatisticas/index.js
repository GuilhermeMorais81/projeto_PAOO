const expresss = require('express');
const app = expresss();
app.use(expresss.json());
const port = 4300;
const totais = { 
    avistamentos: 0,
    relatos: 0,
    confirmacoes: 0 
}
const locais = {}

app.listen(port, console.log(`Estatisticas. Porta ${port}.`));

app.get('/estatisticas', (req, res) => {
    res.json({totais, locais});
})
