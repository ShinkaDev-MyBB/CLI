"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _colors = require("colors");

var _colors2 = _interopRequireDefault(_colors);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _shinka = require("../../shinka.json");

var _shinka2 = _interopRequireDefault(_shinka);

var _progress = require("progress");

var _progress2 = _interopRequireDefault(_progress);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

class Linker {
    constructor(cmd) {
        this.errors = [];
        this.maxLength = this.getMaxLength();
        this.total = _shinka2.default.link.files.length + _shinka2.default.link.directories.length;
        this.bar = new _progress2.default("\n:bar [:current/:total]", {
            total: this.total
        });
        this.cwd = process.cwd();

        this.destroyLink = path => {
            const { mybb_root } = _shinka2.default;
            let error = null;

            try {
                _fs2.default.unlinkSync(`${mybb_root}/${path}`);
            } catch (e) {
                error = e;
                this.errors.push({ path, error });
            }

            this.outputProgress(path, error, "Unlinking");
        };

        this.makeLink = (path, type = "file") => {
            const { mybb_root } = _shinka2.default;
            let error = null;

            try {
                _fs2.default.symlinkSync(`${this.cwd}/${path}`, `${mybb_root}/${path}`, type);
            } catch (e) {
                error = e;
                this.errors.push({ path, error });
            }

            this.outputProgress(path, error, "Linking");
        };

        this.cmd = cmd;
    }

    relink() {
        this.link();

        this.unlink();
    }

    link() {
        const { files, directories } = _shinka2.default.link;

        files.forEach(path => this.makeLink(path, "file"));
        directories.forEach(path => this.makeLink(path, "dir"));

        if (this.errors.length) {
            this.outputErrors("link");
        } else {
            this.outputSuccess("linked");
        }

        return this;
    }

    unlink() {
        const { files, directories } = _shinka2.default.link;

        files.forEach(this.destroyLink);
        directories.forEach(this.destroyLink);

        if (this.errors.length) {
            this.outputErrors("unlink");
        } else {
            this.outputSuccess("unlinked");
        }

        return this;
    }

    outputProgress(path, error, prefix = "Linking") {
        let output = path.padEnd(this.maxLength);
        let suffix = error ? error.code.red : "Success".green;
        output = `${output} ${suffix}`;

        this.bar.interrupt(`${prefix}... `.gray + output);
        this.bar.tick();
    }

    outputErrors(action = "link") {
        const { verbose } = this.cmd;

        console.log(`\nFailed to ${action} ${this.errors.length} files or directories`.red);

        if (verbose) {
            this.errors.forEach(({ path, error }) => {
                console.log(`\n${path}\n`);
                console.log(error);
            });
        } else {
            console.log("Rerun with -v for verbose error messages.".gray);
        }
    }

    outputSuccess(action = "linked") {
        console.log(`\nSuccessfully ${action} ${this.total} files and directories`.green);
    }

    /**
     * Calculates length of longest file or directory name.
     *
     * @returns {number}
     */
    getMaxLength() {
        const { files, directories } = _shinka2.default.link;

        return [...files, ...directories].reduce((a, b) => (a.length > b.length ? a : b)).length;
    }
}
exports.default = Linker;
