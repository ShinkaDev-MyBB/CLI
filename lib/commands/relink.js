"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.relink = relink;

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
function relink(cmd) {
    new _Linker2.default(cmd).unlink();
    console.log("");
    new _Linker2.default(cmd).link();
}
