import Helper from "../Helper";
import Logger from "../../Logger";

describe("Helper", () => {
    const longest = "three";
    const examples = [
        { command: "one", description: "e.g. 1" },
        { command: "two", description: "e.g. 2" },
        {
            command: longest,
            description: "e.g. 3"
        }
    ];
    let logger;
    let help;

    const helper = () => {
        if (!help) {
            help = new Helper(logger);
        }
        return help;
    };

    beforeEach(() => {
        logger = {
            log: jest.fn()
        };
        help = null;
    });

    describe("constructor()", () => {
        it("set logger", () => {
            expect(helper().logger).toEqual(logger);
        });

        it("set logger", () => {
            logger = undefined;
            expect(helper().logger).toBeInstanceOf(Logger);
        });
    });

    describe("help()", () => {
        it("build string", () => {
            const received = helper().help(examples);

            expect(received[0]).toEqual(expect.stringContaining("Examples"));

            examples.forEach((example, ndx) => {
                expect(received[ndx + 1]).toEqual(expect.stringContaining(example.command));
                expect(received[ndx + 1]).toEqual(expect.stringContaining(example.description));
            });
        });

        it("accept empty list", () => {
            const received = helper().help([]);
            expect(Array.isArray(received)).toBeTruthy();
        });

        it("accept undefined", () => {
            const received = helper().help();
            expect(Array.isArray(received)).toBeTruthy();
        });

        it("use command", () => {
            const received = helper()
                .help(examples, "release")
                .slice(1);

            received.forEach(str => {
                expect(str).toEqual(expect.stringContaining("release"));
            });
        });
    });

    describe("outputHelp()", () => {
        const expectConsoleLog = (examples, expected = 1) => {
            helper().outputHelp(examples);

            const { calls } = logger.log.mock;
            expect(calls.length).toEqual(expected);
        };

        it("output each line", () => {
            expectConsoleLog(examples, examples.length + 1);
        });

        it("accept empty list", () => {
            expectConsoleLog([]);
        });

        it("accept undefined", () => {
            expectConsoleLog(undefined);
        });
    });

    describe("getLongest()", () => {
        it("return length of a", () => {
            const longest = { command: "bbbbbbb" };
            const shortest = { command: "a" };
            const received = helper().getLongest(longest, shortest);
            expect(received).toEqual(longest);
        });

        it("return length of b", () => {
            const longest = { command: "bbbbbbb" };
            const shortest = { command: "a" };
            const received = helper().getLongest(shortest, longest);
            expect(received).toEqual(longest);
        });
    });
});
