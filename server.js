const express = require('express');
const path = require('path'); // модуль для парсинга пути

const app = express()
// поиск index.html
app.use(express.static(path.join(__dirname, "src/dist")));
// DB
const client = require('./app/db')
// инициализируем маппер
const mapper = require("./app/emplMapper")
const emplMapper = new mapper(client)

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
    emplMapper.selectAll()
        .then(result => {
            res.send(result.rows)
            res.end()
        })
        .catch(error => console.error(error.stack))
        
});
app.post('/employee', function (req, res) {
    req.setEncoding('utf8');
    return req.on('data', function (data) {
        let employee = JSON.parse(data)
        emplMapper.insert(employee)
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
        let employee = JSON.parse(data)
        emplMapper.update(employee)
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
    emplMapper.delete(id)
        .then(result => {
            console.log(result)
            res.end()
        })
        .catch(error => console.error(error.stack))
});

app.listen(3000, function () {
    console.log('Listening on port 3000');
});