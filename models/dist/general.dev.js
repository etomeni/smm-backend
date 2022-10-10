"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.general = void 0;

var _database = require("../util/database.js");

var _DBconnect = _interopRequireDefault(require("./../config/DBconnect.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var general =
/*#__PURE__*/
function () {
  _createClass(general, null, [{
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
        // ---------------------------------------------------

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

  function general() {
    _classCallCheck(this, general);
  } // get Active Api Provider


  _createClass(general, null, [{
    key: "getActiveApiProvider",
    value: function getActiveApiProvider(data) {
      var db = this.dbConnect();
      return db.execute("SELECT * FROM API_Provider WHERE ".concat(data.tbName, " = ?"), [data.tbValue]);
    }
  }, {
    key: "getAllApiProvider",
    // get All Api Provider
    value: function getAllApiProvider() {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM API_Provider WHERE 1');
    }
  }, {
    key: "deleteApiProvider",
    // delete Api Provider
    value: function deleteApiProvider(data) {
      var db = this.dbConnect();
      return db.execute("DELETE FROM API_Provider WHERE (".concat(data.key, ") = ").concat(data.keyValue), [data.value]);
    }
  }, {
    key: "updateApiProvider",
    // update Api Provider
    value: function updateApiProvider(data) {
      var db = this.dbConnect();
      return db.execute("UPDATE API_Provider SET (".concat(data.name, ") VALUES (?) WHERE (").concat(data.key, ") VALUES (?)"), [data.value, data.keyValue]);
    }
  }, {
    key: "addNewApiProvider",
    // Add New Provider API to the Database
    value: function addNewApiProvider(data) {
      var db = this.dbConnect();
      return db.execute('INSERT INTO API_Provider (APIproviderID, userID, name, url, key, balance, currency, description, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.APIproviderID, data.userID, data.name, data.url, data.key, data.balance, data.currency, data.description, data.status // data.updatedAt, 
      // data.updatedAt 
      ]);
    }
  }, {
    key: "placeOrder",
    // add new order to the DB
    value: function placeOrder(order) {
      var db = this.dbConnect();
      return db.execute('INSERT INTO orders (orderID, serviceID, type, APIproviderID, userID, link, quantity, amount, costAmount, apiCharge, profit, note, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [order.orderID, order.serviceID, order.type, order.APIproviderID, order.userID, order.link, order.quantity, order.amount, order.costAmount, null, order.profit, order.note, order.status]);
    }
  }, {
    key: "updateOrder",
    // update order records to the DB
    value: function updateOrder(data) {
      var condition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "AND";
      var db = this.dbConnect();
      var sqlText = this.multipleUpdate(data, "orders", condition);
      return db.execute(sqlText, data.NewColombNameValue);
    }
  }, {
    key: "createNewTicket",
    // create New Ticket
    value: function createNewTicket(ticket) {
      var db = this.dbConnect();
      return db.execute('INSERT INTO tickets (ticketID, userID, subject, message, attachedFile) VALUES (?, ?, ?, ?, ?)', [ticket.ticketID, ticket.userID, ticket.subject, ticket.message, ticket.attachedFile]);
    }
  }, {
    key: "ticket_messages",
    // create ticket messages
    value: function ticket_messages(ticketMsg) {
      var db = this.dbConnect();
      return db.execute('INSERT INTO ticket_messages (userID, ticketID, message, attachedFile) VALUES (?, ?, ?, ?)', [ticketMsg.userID, ticketMsg.ticketID, ticketMsg.message, ticketMsg.attachedFile]);
    }
  }, {
    key: "updateTicket",
    // update Ticket records on the DB
    value: function updateTicket(data) {
      var condition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "AND";
      var db = this.dbConnect();
      var sqlText = this.multipleUpdate(data, "tickets", condition);
      return db.execute(sqlText, data.NewColombNameValue);
    }
  }, {
    key: "updateTicketMessages",
    // update ticket messages records on the DB
    value: function updateTicketMessages(data) {
      var condition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "AND";
      var db = this.dbConnect();
      var sqlText = this.multipleUpdate(data, "ticket_messages", condition);
      return db.execute(sqlText, data.NewColombNameValue);
    }
  }, {
    key: "getPaymentMethods",
    // get Payment Method
    value: function getPaymentMethods() {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM payment_method WHERE 1');
    }
  }, {
    key: "getOrder",
    // API section
    // get order by orderID
    value: function getOrder(orderID) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM orders WHERE orderID = ?', ["".concat(orderID)]);
    }
  }, {
    key: "getOrderBy_id",
    // get order by id
    value: function getOrderBy_id(id) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM orders WHERE id = ?', ["".concat(id)]);
    }
  }, {
    key: "getUserOrderBy",
    // get user orders
    value: function getUserOrderBy(userID) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM orders WHERE userID = ?', ["".concat(userID)]);
    }
  }, {
    key: "getUserOrderByStatus",
    // get user orders by status (pending/processing )
    value: function getUserOrderByStatus(data) {
      var db = this.dbConnect();
      return db.execute("SELECT * FROM orders WHERE userID = ? AND (status = ? OR status = ?)", ["".concat(data.userID), "".concat(data.status1), "".concat(data.status2)]);
    }
  }, {
    key: "getAllOrderByStatus",
    // get all orders by status (pending/processing)
    value: function getAllOrderByStatus(status) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM orders WHERE status = ?', ["".concat(status)]);
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

  return general;
}();

exports.general = general;