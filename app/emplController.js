module.exports = function getAll() {
    return client.query('select * from test.t_employee')
}