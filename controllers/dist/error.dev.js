"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get500 = exports.get404 = exports.getSource = void 0;

var _DBconnect = _interopRequireDefault(require("./../config/DBconnect.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSource = function getSource(req, res, next) {
  var hostname;
  return regeneratorRuntime.async(function getSource$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          hostname = req.hostname.toLowerCase();
          _DBconnect["default"].hostState.siteName = hostname;
          _context.t0 = hostname;
          _context.next = _context.t0 === "socialaudience.club" ? 6 : _context.t0 === "mediasolution.club" ? 8 : _context.t0 === "secretweb.vip" ? 10 : _context.t0 === "socialmedia.24s.club" ? 12 : _context.t0 === "mediasolution.24s.club" ? 14 : _context.t0 === "medialab.24s.club" ? 16 : _context.t0 === "buyfollowers.24s.club" ? 18 : _context.t0 === "getfollowers.24s.club" ? 20 : _context.t0 === "growfollowers.24s.club" ? 22 : _context.t0 === "jetmedia.24s.club" ? 24 : _context.t0 === "mediahub.24s.club" ? 26 : _context.t0 === "surefollowers.24s.club" ? 28 : _context.t0 === "followershub.24s.club" ? 30 : _context.t0 === "gainfollowers.24s.club" ? 32 : _context.t0 === "promedia.24s.club" ? 34 : _context.t0 === "growmedia.24s.club" ? 36 : _context.t0 === "mediagrowth.24s.club" ? 38 : _context.t0 === "socialgrowth.24s.club" ? 40 : 42;
          break;

        case 6:
          _DBconnect["default"].DBcreated.database = "socialaudience";
          return _context.abrupt("break", 44);

        case 8:
          _DBconnect["default"].DBcreated.database = "godwin";
          return _context.abrupt("break", 44);

        case 10:
          _DBconnect["default"].DBcreated.database = "tesafollowers";
          return _context.abrupt("break", 44);

        case 12:
          _DBconnect["default"].DBcreated.database = "socialmedia";
          return _context.abrupt("break", 44);

        case 14:
          _DBconnect["default"].DBcreated.database = "mediasolution";
          return _context.abrupt("break", 44);

        case 16:
          _DBconnect["default"].DBcreated.database = "medialab";
          return _context.abrupt("break", 44);

        case 18:
          _DBconnect["default"].DBcreated.database = "buyFollowers";
          return _context.abrupt("break", 44);

        case 20:
          _DBconnect["default"].DBcreated.database = "getfollowers";
          return _context.abrupt("break", 44);

        case 22:
          _DBconnect["default"].DBcreated.database = "growfollowers";
          return _context.abrupt("break", 44);

        case 24:
          _DBconnect["default"].DBcreated.database = "jetmedia";
          return _context.abrupt("break", 44);

        case 26:
          _DBconnect["default"].DBcreated.database = "mediahub";
          return _context.abrupt("break", 44);

        case 28:
          _DBconnect["default"].DBcreated.database = "surefollowers";
          return _context.abrupt("break", 44);

        case 30:
          _DBconnect["default"].DBcreated.database = "followershub";
          return _context.abrupt("break", 44);

        case 32:
          _DBconnect["default"].DBcreated.database = "gainfollowers";
          return _context.abrupt("break", 44);

        case 34:
          _DBconnect["default"].DBcreated.database = "promedia";
          return _context.abrupt("break", 44);

        case 36:
          _DBconnect["default"].DBcreated.database = "growmedia";
          return _context.abrupt("break", 44);

        case 38:
          _DBconnect["default"].DBcreated.database = "mediagrowth";
          return _context.abrupt("break", 44);

        case 40:
          _DBconnect["default"].DBcreated.database = "socialgrowth";
          return _context.abrupt("break", 44);

        case 42:
          _DBconnect["default"].DBcreated.database = "smmperfect"; // config.DBcreated.database = "tesafollowers";

          return _context.abrupt("break", 44);

        case 44:
          _context.next = 49;
          break;

        case 46:
          _context.prev = 46;
          _context.t1 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json({
            error: {
              message: _context.t1.message
            },
            msg: "server error on init."
          }));

        case 49:
          next();

        case 50:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 46]]);
};

exports.getSource = getSource;

var get404 = function get404(req, res, next) {
  var error = new Error(" Not Found.");
  error.statusCode = 404;
  next(error);
};

exports.get404 = get404;

var get500 = function get500(error, req, res, next) {
  var data = error.data;
  return res.status(error.statusCode || 500).json({
    error: {
      message: error.message,
      data: data
    }
  });
};

exports.get500 = get500;