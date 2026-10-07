const express = require('express');
const app = express();
app.use(express.json());
const port = 4200;
const baseConsulta = {};

/* {
    "1": {
        "id": 1,
        "local": "Ipiranga",
        "descricao": "ser luminoso encontrado no Ipiranga",
        "relatos": [
            {
                "id": "043afe27-f791-4562-8c08-27e8701630e9",
                "texto": "",
                "confirmacoes": 0,
                "avistamentoId": "1"
            },
            {
                "id": "2df7ab92-d63b-4f11-b52e-2b691e4572b8",
                "texto": "",
                "confirmacoes": 0,
                "avistamentoId": "1"
            }
        ]
    },
    "2": {
        "id": 2,
        "local": "Ipiranga",
        "descricao": "",
        "relatos": [
            {
                "id": "2d070296-010d-4fb0-9cbb-080f4b85569d",
                "texto": "",
                "confirmacoes": 0,
                "avistamentoId": "2"
            },
            {
                "id": "5d590b2e-cd7e-4372-943e-70d2a0490f46",
                "texto": "",
                "confirmacoes": 0,
                "avistamentoId": "2"
            }
        ]
    }
} */


const funcoes = {
    AvistamentoCriado: (avistamento) => {
        baseConsulta[avistamento.id] = avistamento;
    },
    RelatoCriado: (relato) => {
        const relatosDoAvistamento = 
            baseConsulta[relato.avistamentoId]['relatos'] || [];
        relatosDoAvistamento.push(relato);
        baseConsulta[relato.avistamentoId]['relatos'] = relatosDoAvistamento;
    },
    RelatoConfirmado: (relato) => {
        for(let itemRelato of baseConsulta[relato.avistamentoId]['relatos']) {
            if(itemRelato.id === relato.id)
                itemRelato.confirmacoes = relato.confirmacoes;
        }
    }
}

app.listen(port, () => console.log(`Consulta. Porta ${port}.`));

app.get('/avistamentos', (req, res) => {
    res.json(baseConsulta);
})

app.get('/avistamentos/:id', (req, res) => {
    if(baseConsulta[req.params.id] === undefined)
        res.status(400).json({ erro: "avistamento não encontrado" });
    else
        res.json(baseConsulta[req.params.id]);
})

app.post('/eventos', async (req, res) => {
    funcoes[req.body.tipo](req.body.dados);
    res.status(200).json({ msg: "ok" });
})