const connString = 'postgresql://postgres:225@localhost:5432/test'
const { Client } = require('pg')
const client = new Client({
    connectionString: connString
})

 module.exports = client