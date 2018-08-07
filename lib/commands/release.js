"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.release = release;

var _Releaser = require("../Releaser");

var _Releaser2 = _interopRequireDefault(_Releaser);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function release(cmd) {
    new _Releaser2.default(cmd).release();
}
