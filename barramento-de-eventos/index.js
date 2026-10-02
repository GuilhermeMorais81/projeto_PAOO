const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
const port = 10000;

app.listen(port, () => console.log(`Barramento. Porta ${port}.`));

app.post('/eventos', async (req, res) => {
    const evento = req.body;
    try {
        await axios.post(`http://localhost:4000/eventos`, evento);
    }
    catch(error) {
        console.log(`Porta 4000 falhou.`)
    }

    try {
        await axios.post(`http://localhost:4100/eventos`, evento);
    }
    catch(error) {
        console.log(`Porta 4100 falhou.`);
    }

    res.status(200).json({ msg: "ok" });
})