"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.unlink = unlink;

var _Linker = require("../Linker");

var _Linker2 = _interopRequireDefault(_Linker);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Destroys symbolic links for designated files and directories.
 *
 * @param object cmd
 */
function unlink(cmd) {
    new _Linker2.default(cmd).unlink();
}
