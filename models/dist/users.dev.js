"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user = exports.auth = void 0;

var _database = require("../util/database.js");

var _DBconnect = _interopRequireDefault(require("./../config/DBconnect.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var auth =
/*#__PURE__*/
function () {
  _createClass(auth, null, [{
    key: "dbConnect",
    value: function dbConnect() {
      switch (_DBconnect["default"].hostState.siteName) {
        case "socialaudience.club":
          return _database.socialaudience.promise();
          break;

        case "mediasolution.club":
          return _database.godwin.promise();
          break;

        case "secretweb.vip":
          // config.DBcreated.database = "tesafollowers";
          return _database.secretweb.promise();
          break;

        case "socialmedia.24s.club":
          return _database.socialmedia.promise();
          break;

        case "mediasolution.24s.club":
          return _database.mediasolution.promise();
          break;

        case "medialab.24s.club":
          return _database.medialab.promise();
          break;

        case "buyfollowers.24s.club":
          return _database.buyFollowers.promise();
          break;

        case "getfollowers.24s.club":
          return _database.getfollowers.promise();
          break;

        case "growfollowers.24s.club":
          return _database.growfollowers.promise();
          break;
        // -----------------------------------------------

        case "jetmedia.24s.club":
          return _database.jetmedia.promise();
          break;

        case "mediahub.24s.club":
          return _database.mediahub.promise();
          break;

        case "surefollowers.24s.club":
          return _database.surefollowers.promise();
          break;

        case "followershub.24s.club":
          return _database.followershub.promise();
          break;

        case "gainfollowers.24s.club":
          return _database.gainfollowers.promise();
          break;

        case "promedia.24s.club":
          return _database.promedia.promise();
          break;

        case "growmedia.24s.club":
          return _database.growmedia.promise();
          break;

        case "mediagrowth.24s.club":
          return _database.mediagrowth.promise();
          break;

        case "socialgrowth.24s.club":
          return _database.socialgrowth.promise();
          break;
        // ---------------------------------------------------

        default:
          return _database.pool.promise();
          break;
      }
    }
  }]);

  function auth() {
    _classCallCheck(this, auth);
  }

  _createClass(auth, null, [{
    key: "findEmail",
    value: function findEmail(email) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM users WHERE email = ?', [email]);
    }
  }, {
    key: "findUsername",
    value: function findUsername(username) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM users WHERE username = ?', [username]);
    }
  }, {
    key: "find",
    value: function find(usernameEmail) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM users WHERE username = ? OR email = ?', [usernameEmail, usernameEmail]);
    }
  }, {
    key: "findByID",
    value: function findByID(userID) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM users WHERE userID = ?', ["".concat(userID)]);
    }
  }, {
    key: "findByApiKey",
    value: function findByApiKey(apiKey) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM users WHERE apiKey = ?', ["".concat(apiKey)]);
    }
  }, {
    key: "save",
    value: function save(user) {
      var db = this.dbConnect();
      return db.execute('INSERT INTO users (userID, name, username, email, phoneNumber, apiKey, ipHistory, country, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [user.userID, user.name, user.username, user.email, user.phoneNumber, user.apiKey, user.ipHistory, user.country, user.password]);
    }
  }, {
    key: "updateUser",
    value: function updateUser(user) {
      var condition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "AND";
      var db = this.dbConnect();
      var sqlText = this.multipleUpdate(user, "users", condition);
      return db.execute(sqlText, user.NewColombNameValue);
    }
  }, {
    key: "multipleUpdate",
    value: function multipleUpdate(data, tableName, condition) {
      var db = this.dbConnect();
      var sqlText = "UPDATE ".concat(tableName, " SET ");

      for (var i = 0; i < data.colombName.length; i++) {
        var element = data.colombName[i];

        if (i === 0) {
          sqlText += "".concat(element, " = ?");
        } else {
          sqlText += ", ".concat(element, " = ?");
        }
      }

      for (var _i = 0; _i < data.conditionColombName.length; _i++) {
        var conditionName = data.conditionColombName[_i];
        var elconditionValue = data.conditionColombValue[_i];

        if (_i === 0) {
          sqlText += " WHERE ".concat(tableName, ".").concat(conditionName, " = '").concat(elconditionValue, "'");
        } else {
          sqlText += " ".concat(condition, " ").concat(tableName, ".").concat(conditionName, " =' ").concat(elconditionValue, "'");
        }
      }

      return sqlText;
    }
  }]);

  return auth;
}();

exports.auth = auth;

var user =
/*#__PURE__*/
function () {
  _createClass(user, null, [{
    key: "dbConnect",
    value: function dbConnect() {
      switch (_DBconnect["default"].hostState.siteName) {
        case "socialaudience.club":
          return _database.socialaudience.promise();
          break;

        case "secretweb.vip":
          // config.DBcreated.database = "tesafollowers";
          return _database.secretweb.promise();
          break;

        case "socialmedia.24s.club":
          return _database.socialmedia.promise();
          break;

        case "mediasolution.24s.club":
          return _database.mediasolution.promise();
          break;

        case "medialab.24s.club":
          return _database.medialab.promise();
          break;

        case "buyfollowers.24s.club":
          return _database.buyFollowers.promise();
          break;

        case "getfollowers.24s.club":
          return _database.getfollowers.promise();
          break;

        case "growfollowers.24s.club":
          return _database.growfollowers.promise();
          break;
        // -------------------------------------------

        case "jetmedia.24s.club":
          return _database.jetmedia.promise();
          break;

        case "mediahub.24s.club":
          return _database.mediahub.promise();
          break;

        case "surefollowers.24s.club":
          return _database.surefollowers.promise();
          break;

        case "followershub.24s.club":
          return _database.followershub.promise();
          break;

        case "gainfollowers.24s.club":
          return _database.gainfollowers.promise();
          break;

        case "promedia.24s.club":
          return _database.promedia.promise();
          break;

        case "growmedia.24s.club":
          return _database.growmedia.promise();
          break;

        case "mediagrowth.24s.club":
          return _database.mediagrowth.promise();
          break;

        case "socialgrowth.24s.club":
          return _database.socialgrowth.promise();
          break;
        // -------------------------------------------------

        default:
          return _database.pool.promise();
          break;
      }
    }
  }]);

  function user() {
    _classCallCheck(this, user);
  }

  _createClass(user, null, [{
    key: "orderBalDeduction",
    value: function orderBalDeduction(data) {
      var condition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "AND";
      var db = this.dbConnect();
      var sqlText = this.multipleUpdate(data, "users", condition);
      return db.execute(sqlText, data.NewColombNameValue);
    }
  }, {
    key: "getCurrentUser",
    value: function getCurrentUser(user) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM users WHERE userID = ?', [user.userID]);
    }
  }, {
    key: "getUserOrders",
    value: function getUserOrders(user) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM orders WHERE userID = ?', [user.userID]);
    }
  }, {
    key: "getOrderById",
    value: function getOrderById(order) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM orders WHERE id = ?', ["".concat(order)]);
    }
  }, {
    key: "getOrderByOrderID",
    value: function getOrderByOrderID(orderID) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM orders WHERE orderID = ?', ["".concat(orderID)]);
    }
  }, {
    key: "getUserTickets",
    value: function getUserTickets(user) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM tickets WHERE userID = ?', [user.userID]);
    }
  }, {
    key: "getTicket",
    value: function getTicket(ticket) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM tickets WHERE ticketID = ?', [ticket.ticketID]);
    }
  }, {
    key: "getUserTicketMessage",
    value: function getUserTicketMessage(data) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM ticket_messages WHERE ticketID = ?', [data.ticketID]);
    }
  }, {
    key: "getUserPayments",
    value: function getUserPayments(user) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM payment_transactions WHERE userID = ?', [user.userID]);
    }
  }, {
    key: "addFunds",
    value: function addFunds(funds) {
      var db = this.dbConnect();
      return db.execute('INSERT INTO payment_transactions (transactionID, userID, currency, paymentMethod, extraData, amount, status) VALUES (?, ?, ?, ?, ?, ?, ?)', [funds.transactionID, funds.userID, funds.currency, funds.paymentMethod, funds.extraData, funds.amount, funds.status]);
    }
  }, {
    key: "getAdminUsers",
    value: function getAdminUsers() {
      var db = this.dbConnect();
      return db.execute("SELECT email FROM users WHERE role != 'user'");
    }
  }, {
    key: "multipleUpdate",
    value: function multipleUpdate(data, tableName, condition) {
      var db = this.dbConnect();
      var sqlText = "UPDATE ".concat(tableName, " SET ");

      for (var i = 0; i < data.colombName.length; i++) {
        var element = data.colombName[i];

        if (i === 0) {
          sqlText += "".concat(element, " = ?");
        } else {
          sqlText += ", ".concat(element, " = ?");
        }
      }

      for (var _i2 = 0; _i2 < data.conditionColombName.length; _i2++) {
        var conditionName = data.conditionColombName[_i2];
        var elconditionValue = data.conditionColombValue[_i2];

        if (_i2 === 0) {
          sqlText += " WHERE ".concat(tableName, ".").concat(conditionName, " = '").concat(elconditionValue, "'");
        } else {
          sqlText += " ".concat(condition, " ").concat(tableName, ".").concat(conditionName, " =' ").concat(elconditionValue, "'");
        }
      }

      return sqlText;
    }
  }]);

  return user;
}();

exports.user = user;