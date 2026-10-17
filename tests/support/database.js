const { Pool } = require('pg')

const DbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'zombieplus',
    password: 'pwd123',
    port: 5432,
}

export async function executeSQL(sqlScript) {
    const pool = new Pool(DbConfig)
    try {
        const result = await pool.query(sqlScript)
        console.log(result.rows)
    } catch (error) {
        console.error('Error executing SQL: ' + error)
        throw error
    } finally {
        await pool.end()
    }
}
