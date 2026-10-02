const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
const port = 10000;

app.listen(port, () => console.log(`Barramento. Porta ${port}.`));

app.post('/eventos', async (req, res) => {
    const evento = req.body;
    const portAlvo = 0;
    try {
        portAlvo = 4000;
        axios.post(`http://localhost:${portAlvo}/eventos`, evento);
    }
    catch(error) {
        console.log(`Porta ${portAlvo} falhou.`)
    }

    try {
        portAlvo = 4100;
        axios.post(`http://localhost:${portAlvo}/eventos`, evento);
    }
    catch(error) {
        console.log(`Porta ${portAlvo} falhou.`);
    }
    res.status(200).json({ msg: "ok" });
})