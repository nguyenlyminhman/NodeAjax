const pg = require('pg');

const config = {
    user: 'postgres',
    database: 'DEMONODE',
    password: 'sa',
    host: 'localhost',
    port: 5432,
    max: 3,
    idleTimeoutMillis: 1000
};

const pool = new pg.Pool(config);

const queryDB = (sql, arrayData, cb) => {
    pool.connect((err, client, done) => {
        if (err) return cb(err, undefined);
        client.query(sql, arrayData, (errQuery, result) => {
            done(errQuery);
            if (errQuery) return cb(errQuery, undefined);
            cb(undefined, result);
        });
    });
};

module.exports = queryDB;
