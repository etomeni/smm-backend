import mysql from 'mysql2';

import config  from './../config/DBconnect.js';

const pool = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: config.DBcreated.database,
    password: config.DBcreated.password
});

export default pool.promise();