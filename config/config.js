const mssql = require('mssql/msnodesqlv8')

const config = new mssql.ConnectionPool({
    database: 'mock_users',
    server: 'BENSON-LAPTOP\\SQLEXPRESS',
    driver: 'SQL Server',
    options: {
        trustedConnection: true
    }
})

module.exports = config;