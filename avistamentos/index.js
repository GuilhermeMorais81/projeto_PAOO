const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const avistamentos = {};
// avistamentos: {
//     id:
//     local:
//     descricao:
// }

let contadorId = 1;
const port = 4000;

app.listen(port, () => console.log(`Avistamentos. Porta ${port}.`));

app.get('/avistamentos', async (req, res) => {
    res.json(avistamentos);
});

function campoEstaVazio(campo) {
    return campo === undefined || campo === "";
}

app.post('/avistamentos', async (req, res) => {
    if(campoEstaVazio(req.body.local) || campoEstaVazio(req.body.descricao)) 
        res.status(400).json({ erro: "local e descricao são obrigatórios" })
    else {
        const novoAvistamento = {
            id: contadorId,
            local: req.body.local,
            descricao: req.body.descricao
        };
        avistamentos[contadorId] = novoAvistamento;
        contadorId++;
        await axios.post('http://localhost:10000/eventos', { tipo:"AvistamentoCriado", dados:novoAvistamento });
        res.status(201).json(novoAvistamento);
    }
})

app.post('/eventos', async (req, res) => {
    console.log(req.body.tipo);
    res.status(200).json({ msg: "ok" });
})