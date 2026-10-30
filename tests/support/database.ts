import { Pool } from 'pg'
import { env } from './env'

const dbConfig = {
    user: env.dbUser,
    host: env.dbHost,
    database: env.dbName,
    password: env.dbPassword,
    port: env.dbPort
}

export async function executeSQL(sqlScript: string) {
    const pool = new Pool(dbConfig)
    try {
        await pool.query(sqlScript)
    } finally {
        await pool.end()
    }
}
