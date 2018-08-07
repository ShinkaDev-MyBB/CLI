"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _child_process = require("child_process");

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _shinka = require("../../shinka.json");

var _shinka2 = _interopRequireDefault(_shinka);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

class Releaser {
    constructor(cmd) {
        this.filename = `${_shinka2.default.vendor}-${_shinka2.default.code}-${
            _shinka2.default.semver
        }.zip`;
        this.errors = [];

        this.cmd = cmd;

        this.setFileName();
    }

    setFileName() {
        const {
            output,
            directory,
            vendor = _shinka2.default.vendor,
            code = _shinka2.default.code,
            semver = _shinka2.default.version
        } = this.cmd;

        this.filename = `${vendor}-${code}-${semver}.zip`;

        if (output) {
            this.filename = output;
        }

        if (directory) {
            this.filename = `${directory}/${this.filename}`;
        }
    }

    release() {
        try {
            (0, _child_process.exec)(`git archive HEAD:src --format zip -o "${this.filename}"`);
        } catch (error) {
            this.errors.push(error);
        }

        this.errors.length ? this.outputErrors() : this.outputSuccess();
    }

    errors() {
        const { verbose } = this.cmd;

        let str = [_chalk2.default.red(`Failed to bundle ${this.filename}`)];

        if (verbose) {
            this.errors.forEach(error => {
                str.push(`\n${error}`);
            });
        } else {
            str.push(_chalk2.default.gray("Rerun with -v for verbose error messages."));
        }

        return str;
    }

    success() {
        return _chalk2.default.green(`Successfully bundled ${this.filename}`);
    }

    outputErrors() {
        const str = this.errors();
        str.forEach(err => console.log(err));
    }

    outputSuccess() {
        const str = this.success();
        console.log(str);
    }
}
exports.default = Releaser;
