const Pool = require('pg').Pool;
const pool = new Pool({
    host: 'localhost',
    database: 'react',
    user: 'postgres',
    password: 'root',
    port: 5432
})

const getUsers = (request, response) => {
    pool.query("select * from users", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
    })
}

const getUserById = (request, response) => {
    const id = request.params.id;
    pool.query(`select * from users where id = ${id}`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
    })
}

const createUser = (request, response) => {
    const { name, email } = request.body;
    pool.query(`INSERT INTO users(name, email) VALUES ('${name}', '${email}');`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).json('User added');
    })
}

const updateUser = (request, response) => {
    const id = request.params.id;
    const { name, email } = request.body;
    pool.query(`UPDATE users SET name='${name}', email='${email}' where id=${id}`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(`User modified with ID:${id}`);
    })
}

const deleteUser = (request, response) => {
    const id = request.params.id;
    pool.query(`DELETE from users where id = ${id}`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(`User deleted with ID:${id}`);
    })
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}
