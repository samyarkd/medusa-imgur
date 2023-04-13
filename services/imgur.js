"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _medusa = require("@medusajs/medusa");
var _fs = require("fs");
var _imgur = _interopRequireDefault(require("imgur"));
var _stream = require("stream");
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var ImgurService = /*#__PURE__*/function (_AbstractFileService) {
  (0, _inherits2["default"])(ImgurService, _AbstractFileService);
  var _super = _createSuper(ImgurService);
  // eslint-disable-next-line no-empty-pattern
  function ImgurService(_ref, options) {
    var _this;
    (0, _objectDestructuringEmpty2["default"])(_ref);
    (0, _classCallCheck2["default"])(this, ImgurService);
    _this = _super.call(this, {}, options);
    _this.imgurEndpoint = 'https://api.imgur.com/3/';
    _this.client = new _imgur["default"]({
      clientId: options.clientId,
      clientSecret: options.clientSecret
    });
    return _this;
  }

  /**
   * The super types are wrong
   */
  // @ts-ignore
  (0, _createClass2["default"])(ImgurService, [{
    key: "upload",
    value: function upload(fileData) {
      return this.uploadFile(fileData);
    }

    /**
     * The super types are wrong
     */
    // @ts-ignore
  }, {
    key: "uploadProtected",
    value: function uploadProtected(file) {
      return this.uploadFile(file);
    }
  }, {
    key: "uploadFile",
    value: function uploadFile(file) {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        _this2.client.upload({
          image: (0, _fs.createReadStream)(file.path),
          type: 'stream'
        }).then(function (image) {
          resolve({
            url: image.data.link,
            key: image.data.deletehash
          });
        })["catch"](function (err) {
          reject(err);
        });
      });
    }
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(file) {
        var _this3 = this;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                _this3.client.deleteImage("".concat(file)).then(function () {
                  return resolve();
                })["catch"](function (err) {
                  reject(err);
                });
              }));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function _delete(_x) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "getUploadStreamDescriptor",
    value: function () {
      var _getUploadStreamDescriptor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(fileData) {
        var pass, fileKey;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              pass = new _stream.Stream.PassThrough();
              fileKey = "".concat(fileData.name, ".").concat(fileData.ext);
              return _context2.abrupt("return", {
                writeStream: pass,
                promise: this.client.upload({
                  image: pass,
                  type: "stream"
                }),
                url: "".concat(this.imgurEndpoint, "/").concat(fileKey),
                fileKey: fileKey
              });
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function getUploadStreamDescriptor(_x2) {
        return _getUploadStreamDescriptor.apply(this, arguments);
      }
      return getUploadStreamDescriptor;
    }()
  }, {
    key: "getDownloadStream",
    value: function () {
      var _getDownloadStream = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(fileData) {
        var image;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.client.getImage(fileData.fileKey);
            case 2:
              image = _context3.sent;
              return _context3.abrupt("return", (0, _fs.createReadStream)(image.data.link));
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function getDownloadStream(_x3) {
        return _getDownloadStream.apply(this, arguments);
      }
      return getDownloadStream;
    }()
  }, {
    key: "getPresignedDownloadUrl",
    value: function () {
      var _getPresignedDownloadUrl = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(fileData) {
        var image;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.client.getImage(fileData.fileKey);
            case 2:
              image = _context4.sent;
              return _context4.abrupt("return", image.data.link);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function getPresignedDownloadUrl(_x4) {
        return _getPresignedDownloadUrl.apply(this, arguments);
      }
      return getPresignedDownloadUrl;
    }()
  }]);
  return ImgurService;
}(_medusa.AbstractFileService);
var _default = ImgurService;
exports["default"] = _default;