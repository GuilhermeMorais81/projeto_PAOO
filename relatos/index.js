const express = require('express');
const app = express();
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

