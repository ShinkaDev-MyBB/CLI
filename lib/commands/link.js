"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.link = link;

var _Linker = require("../Linker");

var _Linker2 = _interopRequireDefault(_Linker);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Creates symbolic links for designated files and directories.
 *
 * @param object cmd
 */
function link(cmd) {
    new _Linker2.default(cmd).link();
}
