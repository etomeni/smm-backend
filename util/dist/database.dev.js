"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pool = exports.socialgrowth = exports.mediagrowth = exports.growmedia = exports.promedia = exports.gainfollowers = exports.followershub = exports.surefollowers = exports.mediahub = exports.jetmedia = exports.growfollowers = exports.getfollowers = exports.buyFollowers = exports.medialab = exports.mediasolution = exports.socialmedia = exports.secretweb = exports.godwin = exports.socialaudience = void 0;

var _mysql = _interopRequireDefault(require("mysql2"));

var _DBconnect = _interopRequireDefault(require("./../config/DBconnect.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var socialaudience = _mysql["default"].createPool({
  host: _DBconnect["default"].DBcreated.host,
  port: _DBconnect["default"].DBcreated.port,
  user: _DBconnect["default"].DBcreated.user,
  database: "socialaudience",
  password: _DBconnect["default"].DBcreated.password
});

exports.socialaudience = socialaudience;

var godwin = _mysql["default"].createPool({
  host: _DBconnect["default"].DBcreated.host,
  port: _DBconnect["default"].DBcreated.port,
  user: _DBconnect["default"].DBcreated.user,
  database: "godwin",
  password: _DBconnect["default"].DBcreated.password
});

exports.godwin = godwin;

var secretweb = _mysql["default"].createPool({
  host: _DBconnect["default"].DBcreated.host,
  port: _DBconnect["default"].DBcreated.port,
  user: _DBconnect["default"].DBcreated.user,
  database: "tesafollowers",
  password: _DBconnect["default"].DBcreated.password
});

exports.secretweb = secretweb;

var socialmedia = _mysql["default"].createPool({
  host: _DBconnect["default"].DBcreated.host,
  port: _DBconnect["default"].DBcreated.port,
  user: _DBconnect["default"].DBcreated.user,
  database: "socialmedia",
  password: _DBconnect["default"].DBcreated.password
});

exports.socialmedia = socialmedia;

var mediasolution = _mysql["default"].createPool({
  host: _DBconnect["default"].DBcreated.host,
  port: _DBconnect["default"].DBcreated.port,
  user: _DBconnect["default"].DBcreated.user,
  database: "mediasolution",
  password: _DBconnect["default"].DBcreated.password
});

exports.mediasolution = mediasolution;

var medialab = _mysql["default"].createPool({
  host: _DBconnect["default"].DBcreated.host,
  port: _DBconnect["default"].DBcreated.port,
  user: _DBconnect["default"].DBcreated.user,
  database: "medialab",
  password: _DBconnect["default"].DBcreated.password
});

exports.medialab = medialab;

var buyFollowers = _mysql["default"].createPool({
  host: _DBconnect["default"].DBcreated.host,
  port: _DBconnect["default"].DBcreated.port,
  user: _DBconnect["default"].DBcreated.user,
  database: "buyFollowers",
  password: _DBconnect["default"].DBcreated.password
});

exports.buyFollowers = buyFollowers;

var getfollowers = _mysql["default"].createPool({
  host: _DBconnect["default"].DBcreated.host,
  port: _DBconnect["default"].DBcreated.port,
  user: _DBconnect["default"].DBcreated.user,
  database: "getfollowers",
  password: _DBconnect["default"].DBcreated.password
});

exports.getfollowers = getfollowers;

var growfollowers = _mysql["default"].createPool({
  host: _DBconnect["default"].DBcreated.host,
  port: _DBconnect["default"].DBcreated.port,
  user: _DBconnect["default"].DBcreated.user,
  database: "growfollowers",
  password: _DBconnect["default"].DBcreated.password
}); // -------------------------------------------------------------------------------------------


exports.growfollowers = growfollowers;

var jetmedia = _mysql["default"].createPool({
  host: _DBconnect["default"].DBcreated.host,
  port: _DBconnect["default"].DBcreated.port,
  user: _DBconnect["default"].DBcreated.user,
  database: "jetmedia",
  password: _DBconnect["default"].DBcreated.password
});

exports.jetmedia = jetmedia;

var mediahub = _mysql["default"].createPool({
  host: _DBconnect["default"].DBcreated.host,
  port: _DBconnect["default"].DBcreated.port,
  user: _DBconnect["default"].DBcreated.user,
  database: "mediahub",
  password: _DBconnect["default"].DBcreated.password
});

exports.mediahub = mediahub;

var surefollowers = _mysql["default"].createPool({
  host: _DBconnect["default"].DBcreated.host,
  port: _DBconnect["default"].DBcreated.port,
  user: _DBconnect["default"].DBcreated.user,
  database: "surefollowers",
  password: _DBconnect["default"].DBcreated.password
});

exports.surefollowers = surefollowers;

var followershub = _mysql["default"].createPool({
  host: _DBconnect["default"].DBcreated.host,
  port: _DBconnect["default"].DBcreated.port,
  user: _DBconnect["default"].DBcreated.user,
  database: "followershub",
  password: _DBconnect["default"].DBcreated.password
});

exports.followershub = followershub;

var gainfollowers = _mysql["default"].createPool({
  host: _DBconnect["default"].DBcreated.host,
  port: _DBconnect["default"].DBcreated.port,
  user: _DBconnect["default"].DBcreated.user,
  database: "gainfollowers",
  password: _DBconnect["default"].DBcreated.password
});

exports.gainfollowers = gainfollowers;

var promedia = _mysql["default"].createPool({
  host: _DBconnect["default"].DBcreated.host,
  port: _DBconnect["default"].DBcreated.port,
  user: _DBconnect["default"].DBcreated.user,
  database: "promedia",
  password: _DBconnect["default"].DBcreated.password
});

exports.promedia = promedia;

var growmedia = _mysql["default"].createPool({
  host: _DBconnect["default"].DBcreated.host,
  port: _DBconnect["default"].DBcreated.port,
  user: _DBconnect["default"].DBcreated.user,
  database: "growmedia",
  password: _DBconnect["default"].DBcreated.password
});

exports.growmedia = growmedia;

var mediagrowth = _mysql["default"].createPool({
  host: _DBconnect["default"].DBcreated.host,
  port: _DBconnect["default"].DBcreated.port,
  user: _DBconnect["default"].DBcreated.user,
  database: "mediagrowth",
  password: _DBconnect["default"].DBcreated.password
});

exports.mediagrowth = mediagrowth;

var socialgrowth = _mysql["default"].createPool({
  host: _DBconnect["default"].DBcreated.host,
  port: _DBconnect["default"].DBcreated.port,
  user: _DBconnect["default"].DBcreated.user,
  database: "socialgrowth",
  password: _DBconnect["default"].DBcreated.password
}); //  --------------------------------------------------------------


exports.socialgrowth = socialgrowth;

var pool = _mysql["default"].createPool({
  host: _DBconnect["default"].DBcreated.host,
  port: _DBconnect["default"].DBcreated.port,
  user: _DBconnect["default"].DBcreated.user,
  database: "smmperfect",
  // database: config.DBcreated.database,
  password: _DBconnect["default"].DBcreated.password
}); // export default pool;
// export default pool.promise();


exports.pool = pool;