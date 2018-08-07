import Helper from "./Helper";

describe("Helper", () => {
    describe("help", () => {
        const examples = [["one", "e.g. 1"], ["two", "e.g. 2"], ["three", "e.g. 3"]];

        it("builds string", () => {
            const received = Helper.help(examples);

            expect(received[0]).toEqual(expect.stringContaining("Examples"));

            examples.forEach((example, ndx) => {
                example.forEach(eg => {
                    expect(received[ndx + 1]).toEqual(expect.stringContaining(eg));
                });
            });
        });

        it("accepts empty list", () => {
            const received = Helper.help([]);
            expect(Array.isArray(received)).toBeTruthy();
        });

        it("accepts undefined", () => {
            const received = Helper.help();
            expect(Array.isArray(received)).toBeTruthy();
        });

        it("uses command", () => {
            const received = Helper.help(examples, "release").slice(1);

            received.forEach(str => {
                expect(str).toEqual(expect.stringContaining("release"));
            });
        });
    });
});
