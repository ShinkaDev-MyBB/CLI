"use strict";

var _Releaser = require("./Releaser");

var _Releaser2 = _interopRequireDefault(_Releaser);

var _shinka = require("../../shinka.json");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

describe("Releaser", () => {
    describe("setFileName", () => {
        it("set filename from config", () => {
            const cmd = {};
            const release = new _Releaser2.default(cmd);
            release.setFileName();

            expect(release.filename).toEqual(
                `${_shinka.vendor}-${_shinka.code}-${_shinka.version}.zip`
            );
        });

        it("set filename from command args", () => {
            const cmd = { vendor: "shin", code: "news", semver: "1.0.0a" };
            const release = new _Releaser2.default(cmd);
            release.setFileName();

            expect(release.filename).toEqual(`${cmd.vendor}-${cmd.code}-${cmd.semver}.zip`);
        });

        it("set filename as output", () => {
            const cmd = { output: "path/to/a/thing.zip" };
            const release = new _Releaser2.default(cmd);
            release.setFileName();

            expect(release.filename).toEqual(cmd.output);
        });

        it("add directory to filename", () => {
            const cmd = { directory: "path/to/a" };
            const release = new _Releaser2.default(cmd);
            release.setFileName();

            expect(release.filename).toEqual(
                `${cmd.directory}/${_shinka.vendor}-${_shinka.code}-${_shinka.version}.zip`
            );
        });
    });
});
