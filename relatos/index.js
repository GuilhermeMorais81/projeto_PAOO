const express = require('express');
const axios = require('axios');
const app = express();
const {v4: uuidv4} = require('uuid')
app.use(express.json());
const port = 4100;
const relatosPorAvistamentoId = {};
// relatosPorAvistamentoId: {
//     1: [
//         {
//             id: 
//             texto:
//             confirmacoes:
//         }
//     ]
// }

app.listen(port, () => console.log(`Relatos. Porta ${port}.`));

app.post('/avistamentos/:id/relatos', async (req, res) => {
    const novoRelato = {
        id: uuidv4(),
        texto: req.body.texto,
        confirmacoes: 0,
        avistamentoId: req.params.id
    }
    const relatosDoAvistamento = relatosPorAvistamentoId[req.params.id] || [];
    relatosDoAvistamento.push(novoRelato);
    relatosPorAvistamentoId[req.params.id] = relatosDoAvistamento;
    await axios.post('http://localhost:10000/eventos', { tipo:"RelatoCriado", dados:novoRelato })
    res.status(201).json(relatosDoAvistamento);
})

app.get('/avistamentos/:id/relatos', async (req, res) => {
    res.json(relatosPorAvistamentoId[req.params.id] || []);
})

app.post('/eventos', async (req, res) => {
    console.log(req.body.tipo);
    res.status(200).json({ msg: "ok" });
})