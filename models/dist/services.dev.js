"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.services = void 0;

var _database = require("../util/database.js");

var _DBconnect = _interopRequireDefault(require("./../config/DBconnect.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var services =
/*#__PURE__*/
function () {
  _createClass(services, null, [{
    key: "dbConnect",
    value: function dbConnect() {
      var db = _database.pool.promise();

      if (_DBconnect["default"].hostState.siteName.includes("24s.club") || _DBconnect["default"].hostState.siteName == "secretweb.vip") {
        // config.DBcreated.database = "tesafollowers";
        db = _database.secretweb.promise();
      }

      if (_DBconnect["default"].hostState.siteName.includes("socialaudience.club") || _DBconnect["default"].hostState.siteName == "socialaudience.club") {
        // config.DBcreated.database = "socialaudience";
        db = _database.socialaudience.promise();
      }

      if (_DBconnect["default"].hostState.siteName.includes("mediasolution.club") || _DBconnect["default"].hostState.siteName == "mediasolution.club") {
        // config.DBcreated.database = "godwin";
        db = _database.godwin.promise();
      }

      if (_DBconnect["default"].hostState.siteName.includes("localhost") || _DBconnect["default"].hostState.siteName == "localhost") {
        // config.DBcreated.database = "smmperfect";
        db = _database.pool.promise();
      }

      return db;
    }
  }]);

  function services() {
    _classCallCheck(this, services);
  }

  _createClass(services, null, [{
    key: "getSpecificService",
    value: function getSpecificService(services) {
      var db = this.dbConnect();
      return db.execute("SELECT * FROM services WHERE ".concat(services.tbColomb, " = ?"), [services.value]);
    }
  }, {
    key: "getServiceByID",
    value: function getServiceByID(serviceID) {
      var db = this.dbConnect();
      return db.execute("SELECT * FROM services WHERE serviceID = ?", ["".concat(serviceID)]);
    }
  }, {
    key: "getAllServices",
    value: function getAllServices() {
      var db = this.dbConnect();
      return db.execute('SELECT * FROM services WHERE 1;');
    }
  }, {
    key: "deleteService",
    value: function deleteService(services) {
      var db = this.dbConnect();
      return db.execute("DELETE FROM services WHERE (".concat(services.key, ") = ").concat(services.keyValue), [services.value]);
    }
  }, {
    key: "deleteServiceByID",
    value: function deleteServiceByID(serviceID) {
      var db = this.dbConnect();
      return db.execute("DELETE FROM services WHERE services.serviceID = ?;", [serviceID]);
    }
  }, {
    key: "updateService",
    value: function updateService(services) {
      var db = this.dbConnect();
      return db.execute("UPDATE services SET ".concat(services.name, " = ? WHERE ").concat(services.key, " = ?;"), [services.value, services.keyValue]);
    }
  }, {
    key: "updateMultipleServices",
    value: function updateMultipleServices(services) {
      var db = this.dbConnect();
      var sqlText = this.multipleUpdate(services, 'OR', 'services');
      return db.execute("".concat(sqlText), services.NewColombNameValue);
    }
  }, {
    key: "addService",
    value: function addService(services) {
      var db = this.dbConnect();
      return db.execute('INSERT INTO services (serviceID, serviceProvider, serviceCategory, serviceType, providerRate, resellRate, minOrder, maxOrder, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [services.serviceID, services.serviceProvider, services.serviceCategory, services.serviceType, services.providerRate, services.resellRate, services.minOrder, services.maxOrder, services.description // services.updatedAt, 
      // services.updatedAt 
      ]);
    }
  }, {
    key: "multipleUpdate",
    value: function multipleUpdate(data, condition, tableName) {
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

  return services;
}(); // // module.exports = class user {
// export class services {
//     constructor() { }
//     static getSpecificService(services) {
//         return db.execute(
//             `SELECT * FROM services WHERE ${services.tbColomb} = ?`,
//             [services.value]
//         );
//     };
//     static getServiceByID(serviceID) {
//         return db.execute(
//             `SELECT * FROM services WHERE serviceID = ?`,
//             [`${serviceID}`]
//         );
//     };
//     static getAllServices() {
//         return db.execute(
//             'SELECT * FROM services WHERE 1;'
//         );
//     };
//     static deleteService(services) {
//         return db.execute(
//             `DELETE FROM services WHERE (${services.key}) = ${services.keyValue}`,
//             [ services.value ]
//         )
//     };
//     static updateService(services) {
//         return db.execute(
//             `UPDATE services SET ${services.name} = ? WHERE ${services.key} = ?;`,
//             [ services.value, services.keyValue ]
//         )
//     };
//     static updateMultipleServices(services) {
//         let sqlText = this.multipleUpdate(services, 'OR', 'services');
//         return db.execute(
//             `${sqlText}`,
//             services.NewColombNameValue
//         )
//     };
//     static addService(services) {
//         return db.execute(
//             'INSERT INTO services (serviceID, serviceProvider, serviceCategory, serviceType, providerRate, resellRate, minOrder, maxOrder, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
//             [ 
//                 services.serviceID, 
//                 services.serviceProvider, 
//                 services.serviceCategory, 
//                 services.serviceType, 
//                 services.providerRate, 
//                 services.resellRate, 
//                 services.minOrder, 
//                 services.maxOrder, 
//                 services.description, 
//                 // services.updatedAt, 
//                 // services.updatedAt 
//             ]
//         )
//     };
//     static multipleUpdate(data, condition, tableName) {
//         let sqlText = `UPDATE ${tableName} SET `
//         for (let i = 0; i < data.colombName.length; i++) {
//             const element = data.colombName[i];
//             if (i === 0) {
//                 sqlText += `${element} = ?`;
//             } else {
//                 sqlText += `, ${element} = ?`;
//             }
//         }
//         for (let i = 0; i < data.conditionColombName.length; i++) {
//             const conditionName = data.conditionColombName[i];
//             const elconditionValue = data.conditionColombValue[i];
//             if (i === 0) {
//                 sqlText += ` WHERE ${tableName}.${conditionName} = '${elconditionValue}'`;
//             } else {
//                 sqlText += ` ${condition} ${tableName}.${conditionName} =' ${elconditionValue}'`;
//             }
//         }
//         return sqlText;
//     }
// }


exports.services = services;