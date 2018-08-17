import Helper from "../Helper";
import Logger from "../../Logger";

/**
 * @test {Helper}
 */
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
    let logger = {
        log: jest.fn()
    };
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

    /**
     * @test {Helper#constructor}
     */
    describe("constructor()", () => {
        it.each`
            log          | expected
            ${logger}    | ${Object}
            ${undefined} | ${Logger}
        `("sets logger to instance of $expected when $log", ({ log, expected }) => {
            logger = log;
            expect(helper().logger).toBeInstanceOf(expected);
        });
    });

    /**
     * @test {Helper#help}
     */
    describe("help()", () => {
        it("builds string", () => {
            const received = helper().help(examples);

            expect(received[0]).toEqual(expect.stringContaining("Examples"));

            examples.forEach((example, ndx) => {
                expect(received[ndx + 1]).toEqual(expect.stringContaining(example.command));
                expect(received[ndx + 1]).toEqual(expect.stringContaining(example.description));
            });
        });

        it.each`
            examples     | expected
            ${examples}  | ${examples.length + 1}
            ${[]}        | ${1}
            ${undefined} | ${1}
        `("returns string[] with length $expected for $examples", ({ examples, expected }) => {
            const received = helper().help(examples);
            expect(Array.isArray(received)).toEqual(true);
            expect(received).toHaveLength(expected);
        });

        it("includes command name", () => {
            const received = helper()
                .help(examples, "release")
                .slice(1); // ignore header

            received.forEach(str => {
                expect(str).toEqual(expect.stringContaining("release"));
            });
        });
    });

    /**
     * @test {Helper#outputHelp}
     */
    describe("outputHelp()", () => {
        it.each`
            examples     | expected
            ${examples}  | ${examples.length + 1}
            ${[]}        | ${1}
            ${undefined} | ${1}
        `("calls console.log $expected times for $examples", ({ examples, expected }) => {
            helper().outputHelp(examples);

            const { calls } = logger.log.mock;
            expect(calls.length).toEqual(expected);
        });
    });

    /**
     * @test {Helper#getLongest}
     */
    describe("getLongest()", () => {
        it.each`
            a            | b            | expected
            ${"bbbbbbb"} | ${"a"}       | ${"bbbbbbb"}
            ${"a"}       | ${"bbbbbbb"} | ${"bbbbbbb"}
            ${"a"}       | ${"b"}       | ${"b"}
        `("returns $expected when $a and $b are used", ({ a, b, expected }) => {
            const received = helper().getLongest({ command: a }, { command: b });
            expect(received).toEqual({ command: expected });
        });
    });
});
