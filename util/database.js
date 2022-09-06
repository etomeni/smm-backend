import mysql from 'mysql2';

import config  from './../config/DBconnect.js';

const socialaudience = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "socialaudience",
    password: config.DBcreated.password
});

const secretweb = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "tesafollowers",
    password: config.DBcreated.password
});

const socialmedia = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "socialmedia",
    password: config.DBcreated.password
});

const mediasolution = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "mediasolution",
    password: config.DBcreated.password
});

const medialab = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "medialab",
    password: config.DBcreated.password
});

const buyFollowers = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "buyFollowers",
    password: config.DBcreated.password
});

const getfollowers = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "getfollowers",
    password: config.DBcreated.password
});

const growfollowers = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "growfollowers",
    password: config.DBcreated.password
});

const pool = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "smmperfect",
    // database: config.DBcreated.database,
    password: config.DBcreated.password
});

export {
    socialaudience,
    secretweb,
    socialmedia,
    mediasolution,
    medialab,
    buyFollowers,
    getfollowers,
    growfollowers,
    pool,
};

// export default pool;
// export default pool.promise();