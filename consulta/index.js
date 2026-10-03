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
        const relatosDoAvistamento = 
            baseConsulta[relato.avistamentoId].relatos || [];
        relatosDoAvistamento.push(relato);
        baseConsulta[relato.avistamentoId].relatos = relatosDoAvistamento;
    },
    RelatoConfirmado: (relato) => {
        for(let itemRelato of baseConsulta[relato.avistamentoId].relatos) {
            if(itemRelato.id === relato.id)
                itemRelato.confirmacoes = relato.confirmacoes;
        }
    }
}

app.listen(port, () => console.log(`Consulta. Porta ${port}.`));

app.get('/avistamentos', (req, res) => {
    res.json(baseConsulta);
})

app.post('/eventos', async (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
        res.status(200).json({ msg: "ok" });
    }
    catch(error) {
        console.log(error);
    }
})