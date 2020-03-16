const express = require('express');
const path = require('path'); // модуль для парсинга пути

const app = express()

// поиск index.html
app.use(express.static(path.join(__dirname, "src/dist")));

// DB
const connString = 'postgresql://postgres:225@localhost:5432/test'
const { Client } = require('pg')
const client = new Client({
    connectionString: connString
})

// интерсептор запросов
app.use(function (req, res, next) {
    client.connect().catch(e => console.error(e))
    let date = new Date
    console.log('----->Time:', date.toString());
    console.log('Request:', req.method, req.url);
    next();
});
// controller
app.get('/employee', function (req, res) {
    getAll()
        .then(result => {
            res.send(result.rows)
            res.end()
        })
        .catch(error => console.error(error.stack))
        
});

app.post('/employee', function (req, res) {
    req.setEncoding('utf8');
    return req.on('data', function (data) {
        let empl = JSON.parse(data)
        client.query(`INSERT INTO test.t_employee(
            name, age, phone)
            VALUES ($1, $2, $3) RETURNING id;`, [empl.name, empl.age, empl.phone])
            .then(result => {
                console.log(result)
                res.end()
            })
            .catch(error => console.error(error.stack))
    });
});
app.put('/employee', function (req, res) {
    req.setEncoding('utf8');
    return req.on('data', function (data) {
        let empl = JSON.parse(data)
        console.log(empl)
        client.query(`UPDATE test.t_employee SET name = $1, age = $2, phone = $3 WHERE id = $4;`, [empl.name, empl.age, empl.phone, empl.id])
            .then(result => {
                console.log(result)
                res.end()
            })
            .catch(error => console.error(error.stack))
    });
});
app.delete('/employee/:id', function (req, res) {
    let id = req.params.id
    req.setEncoding('utf8');
    client.query(`DELETE FROM test.t_employee WHERE id=$1`, [id])
        .then(result => {
            console.log(result)
            res.end()
        })
        .catch(error => console.error(error.stack))
});

function getAll() {
    return client.query('SELECT * FROM test.t_employee')
}

app.listen(3000, function () {
    console.log('Listening on port 3000');
});