import fs from "fs";

import Releaser from "../Releaser";
import { vendor, code, version } from "../../../shinka.json";
import path from "path";

describe("Releaser", () => {
    let errors;
    let cmd;
    let releaser;

    const release = () => {
        releaser = releaser || new Releaser(cmd);
        releaser.errorList = errors;
        return releaser;
    };

    beforeEach(() => {
        errors = ["one error", "two error"];
        cmd = { output: "test.zip" };
        releaser = null;
    });

    describe("setFileName()", () => {
        const expectFilenameEquals = (expected = {}) => {
            release().setFileName();
            expect(release().filename).toEqual(expected);
        };

        it("set filename from config", () => {
            cmd = {};
            expectFilenameEquals(`${vendor}-${code}-${version}.zip`);
        });

        it("set filename from command args", () => {
            cmd = { vendor: "shin", code: "news", semver: "1.0.0a" };
            expectFilenameEquals(`${cmd.vendor}-${cmd.code}-${cmd.semver}.zip`);
        });

        it("set filename as output", () => {
            cmd = { output: "path/to/a/thing.zip" };
            expectFilenameEquals(cmd.output);
        });

        it("add directory to filename", () => {
            cmd = { directory: "path/to/a" };
            expectFilenameEquals(`${cmd.directory}/${vendor}-${code}-${version}.zip`);
        });
    });

    describe("errors()", () => {
        it("output verbose errors", () => {
            cmd.verbose = true;
            const received = release().errors();

            // n+1 for initial failure message
            expect(received.length).toEqual(errors.length + 1);
            expect(received).toEqual([
                expect.stringContaining(cmd.output),
                ...errors.map(err => expect.stringContaining(err))
            ]);
        });

        it("output succinct error", () => {
            cmd.verbose = false;
            const received = release().errors();

            // failure + verbose message
            expect(received.length).toEqual(2);
            expect(received).toEqual([
                expect.stringContaining(cmd.output),
                expect.stringContaining("verbose")
            ]);
        });
    });

    describe("success()", () => {
        it("output message", () => {
            const received = release().success();
            expect(received).toEqual(expect.stringContaining("Success"));
        });
    });

    describe("release()", () => {
        const fileExists = path => {
            try {
                fs.accessSync(path);
            } catch (err) {
                return false;
            }

            return true;
        };

        const removeFile = path => {
            try {
                fs.unlinkSync(path);
            } catch (error) {
                console.warn(`Could not remove ${path}.`);
                return false;
            }

            return true;
        };

        const checkForFile = path => {
            if (fileExists(path)) {
                console.error(`File already exists. Attempting to remove.`);

                if (!removeFile(path)) {
                    throw Error(`File already exists and could not be removed.`);
                }
            }
        };

        it("create file", () => {
            cmd = {
                output: path.resolve("src/Releaser/__tests__/Releaser.data.zip")
            };
            errors = [];

            checkForFile(cmd.output);

            release().release();
            const exists = fileExists(cmd.output);
            expect(exists).toEqual(true);

            removeFile(cmd.output);
        });
    });
});
