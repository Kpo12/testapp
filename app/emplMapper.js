class mapper {
    constructor(client){
        this.client = client
    }

    selectAll() {
        return this.client.query('SELECT * FROM test.t_employee')
    }

    insert(empl){
        return this.client.query(`INSERT INTO test.t_employee(
            name, age, phone)
            VALUES ($1, $2, $3) RETURNING id;`, [empl.name, empl.age, empl.phone])
    }

    update(empl){
        return this.client.query(`UPDATE test.t_employee SET name = $1, age = $2, phone = $3 WHERE id = $4;`,
            [empl.name, empl.age, empl.phone, empl.id])
    }

    delete(id){
        return this.client.query(`DELETE FROM test.t_employee WHERE id=$1`, [id])
    }
}
module.exports = mapper