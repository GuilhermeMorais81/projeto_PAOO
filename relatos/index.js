const express = require('express');
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
        confirmacoes: 0
    }
    const relatosDoAvistamento = relatosPorAvistamentoId[req.params.id] || [];
    relatosDoAvistamento.push(novoRelato);
    relatosPorAvistamentoId[req.params.id] = relatosDoAvistamento;
    res.status(201).json(relatosDoAvistamento);
})