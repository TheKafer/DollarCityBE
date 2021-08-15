const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

let employeeRequests = [];

app.get('/requests', (req, res) => {
  res.send(employeeRequests);
});

app.post('/requests', (req, res) => {
    const { requests } = req.body;
    storeBD(requests);
    res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
});


async function storeBD(reqs) {
    for (let i = 0; i < reqs.length; i++) {
        employeeRequests.push(reqs[i]);
    }
};
