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


function encontrarRelato(avistamentoId, idRelato) {
    if(relatosPorAvistamentoId[avistamentoId] === undefined) 
        return null;
    for(let relato of relatosPorAvistamentoId[avistamentoId]) {
        if(relato.id === idRelato) 
            return relato; 
    }
    return null;
}

function atualizarRelato(avistamentoId, idRelato, novoRelato) {
    for(let relato of relatosPorAvistamentoId[avistamentoId]) {
        if(relato.id === idRelato) {
            relato = novoRelato;
            return true;
        }
    }
    return false;
}

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

app.post('/avistamentos/:id/relatos/:idRelato/confirmacoes', async (req, res) => {
    const relato = encontrarRelato(req.params.id, req.params.idRelato);
    if(relato === null) 
        res.status(400).json({ erro: "relato não encontrado" });
    else {
        relato.confirmacoes++;
        let avistamentoAtualizado = {
            id: relato.id,
            avistamentoId: relato.avistamentoId,
            confirmacoes: relato.confirmacoes
        }
        atualizarRelato(req.params.id, req.params.idRelato, avistamentoAtualizado);
        await axios.post('http://localhost:10000/eventos', 
            {tipo:"RelatoConfirmado", dados: avistamentoAtualizado}
        );
        res.status(200).json(avistamentoAtualizado);
    }
})