const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

let orders = [];

app.get('/orders', (req, res) => {
  res.send(orders);
});

app.post('/order', (req, res) => {
    const { products } = req.body;
    storeBD(products);
    res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
});


async function storeBD(products) {
    orders.push(products);
};
