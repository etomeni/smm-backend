"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.admin = void 0;

var _database = require("../util/database.js");

var _DBconnect = _interopRequireDefault(require("./../config/DBconnect.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var admin =
/*#__PURE__*/
function () {
  _createClass(admin, null, [{
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
        // ----------------------------------------

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
        // ----------------------------------------

        default:
          return _database.pool.promise();
          break;
      }
    }
  }]);

  function admin() {
    _classCallCheck(this, admin);
  }

  _createClass(admin, null, [{
    key: "getApiBalance",
    value: function getApiBalance() {
      var db = this.dbConnect();
      return db.execute("SELECT API_Provider.balance AS apiBalance FROM API_Provider WHERE  API_Provider.status = 1;");
    }
  }, {
    key: "getTotalOrders",
    value: function getTotalOrders() {
      var db = this.dbConnect();
      return db.execute("SELECT COUNT(orders.id) AS totalOrders FROM orders;");
    }
  }, {
    key: "getTotalProfit",
    value: function getTotalProfit() {
      var db = this.dbConnect();
      return db.execute( // `SELECT SUM(orders.profit) AS totalProfit FROM orders WHERE status != 'Refunded';`,
      "SELECT SUM(orders.amount - orders.apiCharge) AS totalProfit FROM orders WHERE status != 'Refunded';");
    }
  }, {
    key: "getMonthlyProfit",
    value: function getMonthlyProfit() {
      var db = this.dbConnect();
      return db.execute("SELECT SUM(orders.amount - orders.apiCharge) AS monthlyProfit \n             FROM orders \n             WHERE status != 'Refunded'\n             AND createdAt = ".concat(new Date().getMonth(), "\n             ;\n            "));
    }
  }, {
    key: "getTotalPayments",
    value: function getTotalPayments() {
      var db = this.dbConnect();
      return db.execute("SELECT COUNT(payment_transactions.id) AS totalPayments FROM payment_transactions;");
    }
  }, {
    key: "getTotalUsers",
    value: function getTotalUsers() {
      var db = this.dbConnect();
      return db.execute("SELECT COUNT(users.id) AS totalUsers FROM users WHERE 1;");
    }
  }, {
    key: "getTotalUserUsers",
    value: function getTotalUserUsers() {
      var db = this.dbConnect();
      return db.execute("SELECT COUNT(users.id) AS totalUsers FROM users WHERE role != 'admin';");
    }
  }, {
    key: "getTotalTickets",
    value: function getTotalTickets() {
      var db = this.dbConnect();
      return db.execute("SELECT COUNT(tickets.id) AS totalTickets FROM tickets WHERE tickets.status = 1;");
    }
  }, {
    key: "getDashboardOrders",
    value: function getDashboardOrders() {
      var db = this.dbConnect();
      return db.execute("SELECT * FROM orders LIMIT 10;");
    }
  }, {
    key: "getAllActiveTicket",
    value: function getAllActiveTicket() {
      var db = this.dbConnect();
      return db.execute("SELECT * FROM tickets WHERE tickets.status = 1;");
    }
  }, {
    key: "getTicket",
    value: function getTicket(ticket) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM tickets WHERE ticketID = ?', [ticket.ticketID]);
    }
  }, {
    key: "getTicketMessage",
    value: function getTicketMessage(data) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM ticket_messages WHERE ticketID = ?', [data.ticketID]);
    }
  }, {
    key: "closeTicket",
    value: function closeTicket(ticketID) {
      var db = this.dbConnect();
      return db.execute("UPDATE tickets SET status = 0 WHERE tickets.ticketID = ".concat(ticketID, ";"));
    }
  }, {
    key: "getUserByID",
    value: function getUserByID(userID) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM users WHERE userID = ?;', ["".concat(userID)]);
    }
  }, {
    key: "deduct_upgradeUserBalance",
    value: function deduct_upgradeUserBalance(user) {
      var db = this.dbConnect();
      return db.execute('UPDATE users SET balance = ? WHERE users.userID = ?;', // `UPDATE users SET balance = ${user.balance} WHERE users.userID = ${user.userID};`,
      [user.balance, user.userID]);
    }
  }, {
    key: "getAllUsers",
    value: function getAllUsers() {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM users WHERE 1;');
    }
  }, {
    key: "getAllUserUsers",
    value: function getAllUserUsers() {
      var db = this.dbConnect();
      return db.execute("SELECT * FROM users WHERE role != 'admin';");
    }
  }, {
    key: "getAllOrders",
    value: function getAllOrders() {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM orders WHERE 1;' // [user.userID]
      );
    }
  }, {
    key: "getAllPayments",
    value: function getAllPayments() {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM payment_transactions WHERE 1;' // [user.userID]
      );
    }
  }, {
    key: "getAllProviders",
    value: function getAllProviders() {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM API_Provider;' // [user.userID]
      );
    }
  }, {
    key: "changeProviderStatus",
    value: function changeProviderStatus(data) {
      var db = this.dbConnect();
      return db.execute("UPDATE API_Provider SET status = '".concat(data.status, "' WHERE API_Provider.id = '").concat(data.id, "';") // [data.status]
      );
    }
  }, {
    key: "deleteApiProvider",
    value: function deleteApiProvider(data) {
      var db = this.dbConnect();
      return db.execute("DELETE FROM API_Provider WHERE API_Provider.id = '".concat(data, "';"));
    }
  }, {
    key: "getQueriedProvider",
    value: function getQueriedProvider(data) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM API_Provider WHERE APIproviderID = ?;', [data]);
    }
  }, {
    key: "addNewApiProvider",
    // Add New Provider API to the Database
    value: function addNewApiProvider(data) {
      var db = this.dbConnect();
      return db.execute('INSERT INTO API_Provider (APIproviderID, userID, name, url, apiKey, balance, currency, description, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);', [data.APIproviderID, data.userID, data.name, data.url, data.apiKey, data.balance, data.currency, data.description, data.status]);
    }
  }, {
    key: "updateApiProvider",
    // Update Multiple API Provider colomb
    value: function updateApiProvider(data, condition) {
      var db = this.dbConnect();
      var sqlText = this.multipleUpdate(data, "API_Provider" || data.tableName, condition);
      return db.execute(sqlText, data.NewColombNameValue);
    }
  }, {
    key: "updateUserRole",
    value: function updateUserRole(user) {
      var db = this.dbConnect();
      return db.execute('UPDATE users SET role = ? WHERE users.userID = ?;', [user.role, user.userID]);
    }
  }, {
    key: "getAllPaymentMethods",
    value: function getAllPaymentMethods() {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM payment_method;' // [user.userID]
      );
    }
  }, {
    key: "getQueriedPaymentMethod",
    value: function getQueriedPaymentMethod(data) {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM payment_method WHERE paymentMethodID = ?;', [data]);
    }
  }, {
    key: "addNewPaymentMethod",
    // Add New Payment Method to the Database
    value: function addNewPaymentMethod(data) {
      var db = this.dbConnect();
      return db.execute('INSERT INTO payment_method (paymentMethodID, name, currency, minAmount, maxAmount, exchangeRate, data, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?);', [data.paymentMethodID, data.name, data.currency, data.minAmount, data.maxAmount, data.exchangeRate, data.data, data.status]);
    }
  }, {
    key: "updatePaymentMethod",
    // update Payment Method
    value: function updatePaymentMethod(data, condition) {
      var db = this.dbConnect();
      var sqlText = this.multipleUpdate(data, "payment_method" || data.tableName, condition);
      return db.execute(sqlText, data.NewColombNameValue);
    }
  }, {
    key: "deletePaymentMethod",
    value: function deletePaymentMethod(data) {
      var db = this.dbConnect();
      return db.execute("DELETE FROM payment_method WHERE payment_method.id = '".concat(data, "';"));
    }
  }, {
    key: "getReportYears",
    value: function getReportYears() {
      var createdAt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'createdAt';
      var tbName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'users';
      var db = this.dbConnect();
      return db.execute("SELECT DISTINCT YEAR(".concat(createdAt, ") AS years FROM ").concat(tbName, ";") // [data]
      );
    }
  }, {
    key: "getUsersReport",
    // get Users Report data
    value: function getUsersReport(data) {
      var colombName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'createdAt';
      var db = this.dbConnect(); // updatedAt, createdAt, 

      var sqlText = "\n            SELECT \n                DATE_FORMAT(updatedAt, '%m/%d/%y') AS updatedAt,\n                DATE_FORMAT(createdAt, '%m/%d/%y') AS createdAt,\n                SUM(balance) AS totalBalance, \n                COUNT(".concat(colombName, ") AS numCount\n            FROM users\n        ");

      switch (data.date) {
        case 'year':
          sqlText += " GROUP BY EXTRACT(YEAR FROM ".concat(colombName, ");");
          break;

        case 'month':
          sqlText += " \n                    WHERE EXTRACT(YEAR FROM ".concat(colombName, ") = ").concat(data.year, " \n                    GROUP BY EXTRACT(MONTH FROM ").concat(colombName, ");\n                ");
          break;

        case 'day':
          sqlText += " \n                    WHERE EXTRACT(YEAR FROM ".concat(colombName, ") = ").concat(data.year, "\n                    AND EXTRACT(MONTH FROM ").concat(colombName, ") = ").concat(data.month, "\n                    GROUP BY EXTRACT(DAY FROM ").concat(colombName, ");\n                ");
          break;

        default:
          // AND EXTRACT(MONTH FROM ${data.colombName}) = ${data.month}
          sqlText += " \n                    WHERE ".concat(colombName, " > (curdate() - interval 30 day)\n                    AND EXTRACT(YEAR FROM ").concat(colombName, ") = ").concat(data.year, "\n                    GROUP BY EXTRACT(DAY FROM ").concat(colombName, ");\n                ");
          break;
      }

      return db.execute(sqlText);
    } // get Payments Report data

  }, {
    key: "getPaymentsReport",
    value: function getPaymentsReport(data) {
      var colombName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'createdAt';
      var db = this.dbConnect(); // updatedAt, createdAt, 

      var sqlText = "\n            SELECT \n                DATE_FORMAT(updatedAt, '%m/%d/%y') AS updatedAt,\n                DATE_FORMAT(createdAt, '%m/%d/%y') AS createdAt,\n                COUNT(".concat(colombName, ") AS numCount, \n                SUM(amount) as totalAmount\n            FROM payment_transactions\n        ");

      switch (data.date) {
        case 'year':
          sqlText += " GROUP BY EXTRACT(YEAR FROM ".concat(colombName, ");");
          break;

        case 'month':
          sqlText += " \n                    WHERE EXTRACT(YEAR FROM ".concat(colombName, ") = ").concat(data.year, " \n                    GROUP BY EXTRACT(MONTH FROM ").concat(colombName, ");\n                ");
          break;

        case 'day':
          sqlText += " \n                    WHERE EXTRACT(YEAR FROM ".concat(colombName, ") = ").concat(data.year, "\n                    AND EXTRACT(MONTH FROM ").concat(colombName, ") = ").concat(data.month, "\n                    GROUP BY EXTRACT(DAY FROM ").concat(colombName, ");\n                ");
          break;

        default:
          // AND EXTRACT(MONTH FROM ${colombName}) = ${data.month}
          sqlText += " \n                    WHERE ".concat(colombName, " > (curdate() - interval 30 day)\n                    AND EXTRACT(YEAR FROM ").concat(colombName, ") = ").concat(data.year, "\n                    GROUP BY EXTRACT(DAY FROM ").concat(colombName, ");\n                ");
          break;
      }

      return db.execute(sqlText);
    } // get Orders Report data

  }, {
    key: "getOrdersReport",
    value: function getOrdersReport(data) {
      var colombName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'createdAt';
      var db = this.dbConnect(); // updateAt, createdAt, 

      var sqlText = "\n            SELECT \n                SUM(quantity) AS totalProccessed, \n                SUM(amount) AS totalAmount, \n                SUM(costAmount) AS totalCost, \n                SUM(apiCharge) AS totalSpent, \n                SUM(profit) AS sumProfit, \n                DATE_FORMAT(updateAt, '%m/%d/%y') AS updatedAt,\n                DATE_FORMAT(createdAt, '%m/%d/%y') AS createdAt,\n                COUNT(".concat(colombName, ") AS numCount, \n                SUM(apiCharge - amount) AS totalProfit\n            FROM orders\n        ");

      switch (data.date) {
        case 'year':
          sqlText += " GROUP BY EXTRACT(YEAR FROM ".concat(colombName, ");");
          break;

        case 'month':
          sqlText += " \n                    WHERE EXTRACT(YEAR FROM ".concat(colombName, ") = ").concat(data.year, " \n                    GROUP BY EXTRACT(MONTH FROM ").concat(colombName, ");\n                ");
          break;

        case 'day':
          sqlText += " \n                    WHERE EXTRACT(YEAR FROM ".concat(colombName, ") = ").concat(data.year, "\n                    AND EXTRACT(MONTH FROM ").concat(colombName, ") = ").concat(data.month, "\n                    GROUP BY EXTRACT(DAY FROM ").concat(colombName, ");\n                ");
          break;

        default:
          // AND EXTRACT(MONTH FROM ${colombName}) = ${data.month}
          sqlText += " \n                    WHERE ".concat(colombName, " > (curdate() - interval 30 day)\n                    AND EXTRACT(YEAR FROM ").concat(colombName, ") = ").concat(data.year, "\n                    GROUP BY EXTRACT(DAY FROM ").concat(colombName, ");\n                ");
          break;
      }

      return db.execute(sqlText);
    } // static deleteApiProvider(data) {
    //     return db.execute(
    //         `DELETE FROM API_Provider WHERE (${data.key}) = ${data.keyValue}`,
    //         [ data.value ]
    //     )
    // };

  }, {
    key: "multipleUpdate",
    value: function multipleUpdate(data, tableName) {
      var condition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "AND";
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

  return admin;
}();

exports.admin = admin;