import 'dotenv/config'

function required(name: string) {
    const value = process.env[name]
    if (!value) {
        throw new Error(`Missing environment variable: ${name}. Check the .env file.`)
    }
    return value
}

export const env = {
    baseApi: required('BASE_API'),
    baseUrl: required('BASE_URL'),
    adminEmail: required('ADMIN_EMAIL'),
    adminPassword: required('ADMIN_PASSWORD'),
    dbUser: required('DB_USER'),
    dbHost: required('DB_HOST'),
    dbName: required('DB_NAME'),
    dbPassword: required('DB_PASSWORD'),
    dbPort: Number(required('DB_PORT'))
}
