const express = require('express');
const app = express();
app.use(express.json());
const port = 4200;
const baseConsulta = {};

const funcoes = {
    AvistamentoCriado: (avistamento) => {
        baseConsulta[avistamento.id] = avistamento;
    },
    RelatoCriado: (relato) => {
        const avistamentoDoRelato = 
            baseConsulta[relato.avistamentoId]['relatos'] || [];
        avistamentoDoRelato.push(relato);
        baseConsulta[relato.avistamentoId]['relatos'] = avistamentoDoRelato;
    }
}

app.listen(port, () => console.log(`Consulta. Porta ${port}.`));

app.get('/avistamentos', async (req, res) => {
    res.json(baseConsulta);
})