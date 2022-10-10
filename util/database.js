import mysql from 'mysql2';

import config  from './../config/DBconnect.js';

const socialaudience = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "socialaudience",
    password: config.DBcreated.password
});

const godwin = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "godwin",
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

// -------------------------------------------------------------------------------------------

const jetmedia = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "jetmedia",
    password: config.DBcreated.password
});

const mediahub = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "mediahub",
    password: config.DBcreated.password
});

const surefollowers = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "surefollowers",
    password: config.DBcreated.password
});

const followershub = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "followershub",
    password: config.DBcreated.password
});

const gainfollowers = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "gainfollowers",
    password: config.DBcreated.password
});

const promedia = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "promedia",
    password: config.DBcreated.password
});

const growmedia = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "growmedia",
    password: config.DBcreated.password
});

const mediagrowth = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "mediagrowth",
    password: config.DBcreated.password
});

const socialgrowth = mysql.createPool({
    host: config.DBcreated.host,
    port: config.DBcreated.port,
    user: config.DBcreated.user,
    database: "socialgrowth",
    password: config.DBcreated.password
});

//  --------------------------------------------------------------

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
    godwin,
    secretweb,
    socialmedia,
    mediasolution,
    medialab,
    buyFollowers,
    getfollowers,
    growfollowers,

    // ------------------------
    jetmedia,
    mediahub,
    surefollowers,
    followershub,
    gainfollowers,
    promedia,
    growmedia,
    mediagrowth,
    socialgrowth,
    // ------------------------

    pool,
};

// export default pool;
// export default pool.promise();