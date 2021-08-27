const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'kafer',
    password: 'password',
    database: 'dollarcity'
});

connectBD => {
    connection.connect(function(err) {
        if (err) throw err;
        console.log('You are now connected...');
    });
    return connection;
}


app.get('/jobApplications', (req, res) => {
  connection.query('SELECT * FROM job_application', function(err, result) {
    if (err) throw err;
    res.json({
        products: result
    });
});
});

app.post('/jobApplications', (req, res) => {
    storeBD(req.body);
    res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
});

function storeBD(reqs) {
    for (let i = 0; i < reqs.length; i++) {
      connection.query('INSERT INTO dollarcity.job_application (name, last_names, email, city, job_title, address, cc, gender, year_experiences, title, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [ reqs[i].name, reqs[i].last_names, reqs[i].email, reqs[i].city, reqs[i].job_title, reqs[i].address, reqs[i].cc, reqs[i].gender, reqs[i].year_experiences, reqs[i].title, reqs[i].description],
          function(err, result) {
            if (err) throw err;
          });
    }
};
