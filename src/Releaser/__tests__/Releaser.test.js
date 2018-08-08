import fs from "fs";

import Releaser from "../Releaser";
import { vendor, code, version } from "../../../shinka.json";
import path from "path";

describe("Releaser", () => {
    let errors;
    let cmd;
    let rel;
    let config;
    let logger;

    const releaser = () => {
        if (!rel) {
            rel = new Releaser(cmd, config, logger);
            rel.errorList = errors;
        }

        return rel;
    };

    beforeEach(() => {
        errors = ["one error", "two error"];
        cmd = { output: "test.zip" };
        rel = null;
        config = {
            vendor: "shinka",
            code: "cli",
            version: "0.0.1a"
        };
        logger = {
            log: jest.fn()
        };
    });

    describe("constructor()", () => {
        it("set default logger", () => {
            logger = undefined;
            expect(releaser().logger).toBeTruthy();
        });
    });

    describe("getFileName()", () => {
        const expectFilenameEquals = (expected = {}) => {
            const received = releaser().getFileName();
            expect(received).toEqual(expected);
        };

        it("get filename from config", () => {
            cmd = {};
            expectFilenameEquals(`${vendor}-${code}-${version}.zip`);
        });

        it("get filename from command args", () => {
            cmd = { vendor: "shin", code: "news", semver: "1.0.0a" };
            expectFilenameEquals(`${cmd.vendor}-${cmd.code}-${cmd.semver}.zip`);
        });

        it("get filename as output", () => {
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
            const received = releaser().errors();

            // n+1 for initial failure message
            expect(received.length).toEqual(errors.length + 1);
            expect(received).toEqual([
                expect.stringContaining(cmd.output),
                ...errors.map(err => expect.stringContaining(err))
            ]);
        });

        it("output succinct error", () => {
            cmd.verbose = false;
            const received = releaser().errors();

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
            const received = releaser().success();
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

            releaser().release();
            const exists = fileExists(cmd.output);
            expect(exists).toEqual(true);

            removeFile(cmd.output);
        });

        it("push error", () => {
            errors = [];
            releaser().executeArchive = () => {
                throw Error("This is a test error");
            };

            releaser().release();

            expect(releaser().errorList.length).toEqual(1);
        });
    });
});
