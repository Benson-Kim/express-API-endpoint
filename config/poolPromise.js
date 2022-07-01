const sqlConfig = require('./config')

async function poolPromise() {
    const pool = sqlConfig.connect();
    if (pool) {
        console.log('database connected');
        return pool;
    }
}

module.exports = poolPromise     