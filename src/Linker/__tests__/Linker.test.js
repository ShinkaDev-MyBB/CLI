import path from "path";

import Linker, { verbs as linkerVerbs } from "../Linker";
import * as helpers from "./helpers";

/**
 * @test {Linker}
 */
describe("Linker", () => {
    const longestPath = "c.txt";
    const mybb_root = path.resolve("src/Linker/__tests__/links");
    const emptyConfig = {
        link: {
            files: [],
            directories: []
        },
        mybb_root
    };

    let linker;
    let cmd;
    let config = {
        link: {
            files: [longestPath],
            directories: ["a"]
        },
        mybb_root
    };
    let logger;
    let errors;
    let verbs;

    const link = () => {
        if (!linker) {
            linker = new Linker(cmd, config, logger);
            linker.verbs = verbs;
            linker.errorList = errors;
        }

        return linker;
    };

    /**
     * ProgressBar defaults its read/write stream to process.stderr,
     * which breaks certain test runners (e.g. the Jest extension for
     * VS Code).
     */
    const mockStderr = () => {
        global.process = {
            ...process,
            stderr: {
                clearLine: jest.fn(),
                cursorTo: jest.fn(),
                write: jest.fn()
            }
        };
    };

    beforeEach(() => {
        cmd = { output: "test.zip" };
        config = {
            link: {
                files: [longestPath],
                directories: ["a"]
            },
            mybb_root
        };
        errors = [
            { path: "this/is/a/path", error: "this is an error" },
            { path: longestPath, error: "this is another error" }
        ];
        verbs = { present: "test", gerund: "testing", past: "tested" };
        linker = null;
        logger = {
            log: jest.fn()
        };
        mockStderr();
    });

    afterEach(() => {
        helpers.removeLinks();
    });

    /**
     * @test {Linker#constructor}
     */
    describe("constructor()", () => {
        it("uses default config", () => {
            config = undefined;
            expect(link().config).toBeTruthy();
        });

        it("uses default logger", () => {
            logger = undefined;
            expect(link().logger).toBeTruthy();
        });

        it("sets properties", () => {
            const expected = config.link.files.length + config.link.directories.length;
            expect(link().config).toEqual(config);
            expect(link().total).toEqual(expected);
            expect(link().maxLength).toEqual(longestPath.length);
            expect(link().bar).toBeTruthy();
        });
    });

    /**
     * @test {Linker#errors}
     */
    describe("errors()", () => {
        const mapErrors = () => {
            return errors.reduce(
                (acc, err) => [
                    ...acc,
                    expect.stringContaining(err.path),
                    expect.stringContaining(err.error)
                ],
                []
            );
        };

        it("outputs verbose errors", () => {
            cmd.verbose = true;
            const received = link().errors();

            // n+1 for initial failure message
            expect(received.length).toEqual(errors.length * 2 + 1);
            expect(received).toEqual([expect.stringContaining(`${errors.length}`), ...mapErrors()]);
        });

        it("outputs succinct error", () => {
            cmd.verbose = false;
            const received = link().errors();

            // failure + verbose message
            expect(received.length).toEqual(2);
            expect(received).toEqual([
                expect.stringContaining(`${errors.length}`),
                expect.stringContaining("verbose")
            ]);
        });
    });

    /**
     * @test {Linker#success}
     */
    describe("success()", () => {
        it("outputs message", () => {
            const received = link().success();
            expect(received).toEqual(expect.stringContaining("Success"));
        });
    });

    /**
     * @test {Linker#constructor}
     */
    describe("getMaxLength()", () => {
        it("calculates max length", () => {
            const received = link().getMaxLength();
            expect(received).toEqual(longestPath.length);
        });
    });

    /**
     * @test {Linker#progress}
     */
    describe("progress()", () => {
        it("outputs failure", () => {
            const path = "a/path";
            const error = {
                code: "ERROR CODE"
            };
            const received = link().progress(path, error);
            [verbs.gerund, path, error.code].forEach(str => {
                expect(received).toEqual(expect.stringContaining(str));
            });
        });

        it("outputs success", () => {
            const path = "a/path";
            const received = link().progress(path);
            [verbs.gerund, path, "Success"].forEach(str => {
                expect(received).toEqual(expect.stringContaining(str));
            });
        });
    });

    describe("linking", () => {
        const setupLinkage = file => {
            errors = [];
            link().cwd = path.resolve("src/Linker/__tests__/originals");

            return helpers.resolvePaths(file);
        };

        /**
         * @test {Linker#makeLink}
         */
        describe("makeLink()", () => {
            const makeLink = (file, type) => {
                const { linkPath } = setupLinkage(file);
                helpers.checkForFile(linkPath);

                link().makeLink(file, type);

                const exists = helpers.fileExists(linkPath);
                expect(exists).toEqual(true);

                helpers.removeFile(linkPath);
            };

            it.each`
                path                          | type
                ${config.link.files[0]}       | ${"file"}
                ${config.link.directories[0]} | ${"dir"}
            `("links $type at $path", ({ path, type }) => {
                makeLink(path, type);
            });

            it("pushes error", () => {
                errors = [];
                link().makeLink("not/a/real/path");

                expect(link().errorList).toHaveLength(1);
            });
        });

        /**
         * @test {Linker#destroyLink}
         */
        describe("destroyLink()", () => {
            it("destroys link", () => {
                const file = config.link.files[0];
                const { originalPath, linkPath } = setupLinkage(file);
                helpers.createFile(originalPath, linkPath);

                link().destroyLink(file);

                const exists = helpers.fileExists(linkPath);
                expect(exists).toEqual(false);
            });

            it("pushes error", () => {
                const file = "not/a/real/path";
                setupLinkage(file);

                link().destroyLink(file);
                expect(link().errorList.length).toEqual(1);
                expect(link().errorList[0].path).toEqual(file);
            });
        });

        describe("commands", () => {
            /**
             * @test {Linker#link}
             */
            describe("link()", () => {
                it("sets verbs", () => {
                    config = emptyConfig;
                    link().link();
                    expect(link().verbs).toEqual(linkerVerbs.linking);
                });

                it("makes links", () => {
                    setupLinkage();
                    link().link();

                    [...config.link.files, ...config.link.directories].forEach(file => {
                        const linkPath = path.resolve(mybb_root, file);
                        const exists = helpers.fileExists(linkPath);
                        expect(exists).toEqual(true);
                    });
                });
            });

            /**
             * @test {Linker#unlink}
             */
            describe("unlink()", () => {
                it("sets verbs", () => {
                    config = emptyConfig;
                    link().unlink();
                    expect(link().verbs).toEqual(linkerVerbs.unlinking);
                });

                it("destroys links", () => {
                    helpers.createLinks([...config.link.files, ...config.link.directories]);

                    if (!helpers.getLinks().length) {
                        throw Error("Links were not created properly");
                    }

                    link().unlink();

                    [...config.link.files, ...config.link.directories].forEach(file => {
                        const linkPath = path.resolve(mybb_root, file);
                        const exists = helpers.fileExists(linkPath);
                        expect(exists).toEqual(false);
                    });
                });

                it("outputs errors", () => {
                    config = emptyConfig;
                    const fnOutputErrors = jest.fn();
                    link().outputErrors = fnOutputErrors;
                    link().errorList = ["something"];

                    link().unlink();

                    expect(fnOutputErrors).toHaveBeenCalled();
                });

                it("outputs success", () => {
                    config = emptyConfig;
                    const fnOutputSuccess = jest.fn();
                    link().outputSuccess = fnOutputSuccess;
                    link().errorList = [];

                    link().unlink();

                    expect(fnOutputSuccess).toHaveBeenCalled();
                });
            });
        });
    });
});
