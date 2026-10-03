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
const locaisCadaAvistamento = {}

function criarNovoLocal(avistamento) {
    locaisCadaAvistamento[avistamento.id] = avistamento.local;
    if(locais[avistamento.local] === undefined) {
        locais[avistamento.local] = { 
            avistamentos: 0,
            relatos: 0,
            confirmacoes: 0 
        }
    }
}

const funcoes = {
    AvistamentoCriado: (avistamento) => {
        criarNovoLocal(avistamento);
        locais[avistamento.local].avistamentos++;
        totais.avistamentos++;
    },
    RelatoCriado: (relato) => {
        locais[locaisCadaAvistamento[relato.avistamentoId]].relatos++;
        totais.relatos++;
    },
    RelatoConfirmado: (relato) => {
        locais[locaisCadaAvistamento[relato.avistamentoId]].confirmacoes++;
        totais.confirmacoes++;
    }
}

app.listen(port, console.log(`Estatisticas. Porta ${port}.`));

app.get('/estatisticas', (req, res) => {
    res.json({totais, locais});
})

app.post('/eventos', (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    }
    catch(error) {
        console.log("Evento de tipo desconhecido recebido");
    }
    res.status(200);
});
