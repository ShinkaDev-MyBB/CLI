"use strict";

var _Helper = require("./Helper");

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

describe("Helper", () => {
    describe("help", () => {
        const examples = [["one", "e.g. 1"], ["two", "e.g. 2"], ["three", "e.g. 3"]];

        it("builds string", () => {
            const received = _Helper2.default.help(examples);

            expect(received[0]).toEqual(expect.stringContaining("Examples"));

            examples.forEach((example, ndx) => {
                example.forEach(eg => {
                    expect(received[ndx + 1]).toEqual(expect.stringContaining(eg));
                });
            });
        });

        it("accepts empty list", () => {
            const received = _Helper2.default.help([]);
            expect(Array.isArray(received)).toBeTruthy();
        });

        it("accepts undefined", () => {
            const received = _Helper2.default.help();
            expect(Array.isArray(received)).toBeTruthy();
        });

        it("uses command", () => {
            const received = _Helper2.default.help(examples, "release").slice(1);

            received.forEach(str => {
                expect(str).toEqual(expect.stringContaining("release"));
            });
        });
    });
});
