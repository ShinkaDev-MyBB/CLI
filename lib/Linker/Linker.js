"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

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
    /** @var {string} cwd       - Current working directory, used to build absolute paths */

    /** @var {number} total     - Number of files and directories */

    /** @var {object[]} errors  - Paths and associated errors */
    constructor(cmd) {
        this.errorList = [];
        this.maxLength = this.getMaxLength();
        this.total = _shinka2.default.link.files.length + _shinka2.default.link.directories.length;
        this.bar = new _progress2.default("\n:bar [:current/:total]", {
            total: this.total
        });
        this.cwd = process.cwd();
        this.verbs = {};

        this.destroyLink = path => {
            const { mybb_root } = _shinka2.default;
            let error = null;

            try {
                _fs2.default.unlinkSync(`${mybb_root}/${path}`);
            } catch (e) {
                error = e;
                this.errorList.push({ path, error });
            }

            this.outputProgress(path, error);
        };

        this.makeLink = (path, type = "file") => {
            const { mybb_root } = _shinka2.default;
            let error = null;

            try {
                _fs2.default.symlinkSync(`${this.cwd}/${path}`, `${mybb_root}/${path}`, type);
            } catch (e) {
                error = e;
                this.errorList.push({ path, error });
            }

            this.outputProgress(path, error);
        };

        this.cmd = cmd;
    }

    /** @var {object} verbs     - Verbs to use in console output */

    /** @var {ProgressBar} bar  - Outputs progress bar */

    /** @var {number} maxLength - Length of longest path */

    link() {
        const { files, directories } = _shinka2.default.link;
        this.verbs = { present: "Link", past: "Linked", gerund: "Linking" };

        files.forEach(path => this.makeLink(path, "file"));
        directories.forEach(path => this.makeLink(path, "dir"));

        this.errorList.length ? this.outputErrors() : this.outputSuccess();

        return this;
    }

    unlink() {
        const { files, directories } = _shinka2.default.link;
        this.verbs = { present: "Unlink", past: "Unlinked", gerund: "Unlinking" };

        files.forEach(this.destroyLink);
        directories.forEach(this.destroyLink);

        this.errorList.length ? this.outputErrors() : this.outputSuccess();

        return this;
    }

    outputProgress(path, error) {
        const verb = this.verbs.gerund;

        let suffix = error ? _chalk2.default.red(error.code) : _chalk2.default.green("Success");
        let output = path.padEnd(this.maxLength);
        output = `${output} ${suffix}`;

        this.bar.interrupt(_chalk2.default.gray(`${verb}... `) + output);
        this.bar.tick();
    }

    /**
     * @returns {string[]}
     */
    errors() {
        const { verbose } = this.cmd;
        const verb = this.verbs.present.toLowerCase();

        let str = [
            _chalk2.default.red(`\nFailed to ${verb} ${this.errorList.length} files or directories`)
        ];

        if (verbose) {
            this.errorList.forEach(({ path, error }) => {
                str.push(`\n${path}\n`);
                str.push(error);
            });
        } else {
            str.push(_chalk2.default.gray("Rerun with -v for verbose error messages."));
        }

        return str;
    }

    /**
     * @returns {string}
     */
    success() {
        const verb = this.verbs.past.toLowerCase();
        return _chalk2.default.green(`\nSuccessfully ${verb} ${this.total} files and directories`);
    }

    outputErrors() {
        const str = this.errors();
        str.forEach(err => console.log(err));
    }

    outputSuccess() {
        const str = this.success();
        console.log(str);
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
