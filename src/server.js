const express = require('express');
const app = express();
const port = 3005

// app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
})

app.post('/files/new', (req, res) => {
    console.log("got body: ", req.body);
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});