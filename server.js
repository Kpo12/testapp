const express = require('express');
const path = require('path'); // модуль для парсинга пути
// const controller = require('./app/emplController')

const app = express()

// поиск index.html
app.use(express.static(path.join(__dirname, "src/dist")));

// DB
const connString = 'postgresql://postgres:225@localhost:5432/test'
const { Pool, Client } = require('pg')
const client = new Client({
    connectionString: connString
})

function getAll() {
    return client.query('select * from test.t_employee')
}

// интерсептор запросов
app.use(function (req, res, next) {
    client.connect().catch(e => console.error(e))
    let date = new Date
    console.log('Time:', date.toString());
    console.log('Request:', req.method, req.url);
    next();
});
// controller
app.get('/employee', function (req, res) {
    getAll()
    .then(result => {
        res.send(result.rows)
    })
    .catch(e => console.error(e.stack))
    // res.send(data);
});

app.post('/employee', function (req, res) {
    req.setEncoding('utf8');
    return req.on('data', function (data) {
        console.log(data);
    });
});
app.put('/employee', function (req, res) {
    req.setEncoding('utf8');
    req.on('data', function (data) {
        console.log(data);
    });
});
app.delete('/employee/:id', function (req, res) {
    let id = req.params.id
    req.setEncoding('utf8');
    console.log(id)
});

app.listen(3000, function () {
    console.log('Listening on port 3000');
});