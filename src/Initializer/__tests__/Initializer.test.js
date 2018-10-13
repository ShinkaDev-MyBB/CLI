import Initializer from "../Initializer";

describe("Initializer", () => {
    let cmd = {};
    let expected = {};

    beforeEach(() => {
        cmd = {
            mybb: "path/to/mybb",
            vendor: "shinka",
            code: "cli",
            semver: "0.0.1-alpha.1"
        };

        expected = {
            link: {
                files: [],
                directories: []
            },
            mybb_root: cmd.mybb,
            vendor: cmd.vendor,
            code: cmd.code,
            version: cmd.semver
        };
    });

    /**
     * @test {Initializer#write}
     */
    describe("#write", () => {
        it("returns error when exception", () => {
            const fs = require("fs");
            fs.writeFileSync = jest.fn(() => {
                throw new Error("Test error");
            });

            const received = Initializer.write(cmd);
            expect(fs.writeFileSync).toHaveBeenCalled();
            expect(received).toBeTruthy();
        });

        it("returns null when no exception", () => {
            const fs = require("fs");
            fs.writeFileSync = jest.fn(() => {
                return true;
            });

            const received = Initializer.write(cmd);
            expect(fs.writeFileSync).toHaveBeenCalled();
            expect(received).toBeUndefined();
        });
    });

    /**
     * @test {Initializer#generate}
     */
    describe("#generate", () => {
        it("returns object", () => {
            const received = Initializer.generate(cmd);
            expect(received).toEqual(expected);
        });

        it("uses empty strings in place of undefined", () => {
            expected = {
                ...expected,
                mybb_root: "",
                vendor: "",
                code: "",
                version: ""
            };
            const received = Initializer.generate({});
            expect(received).toEqual(expected);
        });
    });

    /**
     * @test {Initializer#output}
     */
    describe("#output", () => {
        Initializer.logger = { success: jest.fn(), error: jest.fn() };

        it.each`
            error         | channel
            ${null}       | ${"success"}
            ${"an error"} | ${"error"}
        `("outputs on $channel channel", ({ error, channel }) => {
            Initializer.output(error);
            expect(Initializer.logger[channel]).toHaveBeenCalled();
        });
    });
});
