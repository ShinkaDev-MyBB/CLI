import Helper from "./Helper";

describe("Helper", () => {
    const longest = "three";
    const examples = [["one", "e.g. 1"], ["two", "e.g. 2"], [longest, "e.g. 3"]];

    beforeEach(() => {
        global.console = {
            log: jest.fn()
        };
    });

    describe("help()", () => {
        it("build string", () => {
            const received = Helper.help(examples);

            expect(received[0]).toEqual(expect.stringContaining("Examples"));

            examples.forEach((example, ndx) => {
                example.forEach(eg => {
                    expect(received[ndx + 1]).toEqual(expect.stringContaining(eg));
                });
            });
        });

        it("accept empty list", () => {
            const received = Helper.help([]);
            expect(Array.isArray(received)).toBeTruthy();
        });

        it("accept undefined", () => {
            const received = Helper.help();
            expect(Array.isArray(received)).toBeTruthy();
        });

        it("use command", () => {
            const received = Helper.help(examples, "release").slice(1);

            received.forEach(str => {
                expect(str).toEqual(expect.stringContaining("release"));
            });
        });
    });

    describe("outputHelp()", () => {
        const expectConsoleLog = (examples, expected = 1) => {
            Helper.outputHelp(examples);

            const { calls } = global.console.log.mock;
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
            const longest = ["bbbbbbb"];
            const received = Helper.getLongest(longest, ["a"]);
            expect(received).toEqual(longest);
        });

        it("return length of b", () => {
            const longest = ["bbbbbbb"];
            const received = Helper.getLongest(["a"], longest);
            expect(received).toEqual(longest);
        });
    });
});
