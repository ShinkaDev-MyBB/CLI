import Presenter from "../Presenter";

/** @test {Presenter} */
describe("Presenter", () => {
    const obj = {
        command: "command",
        description: "Does a thing",
        options: [
            { flag: "-f, --force", description: "Force the thing" },
            { flag: "-v, --verbose", description: "Output verbose error messages" }
        ],
        examples: [
            {
                command: "-f",
                description: "Force it to do a thing"
            },
            {
                command: "-v",
                description: "Outputs full error messages"
            }
        ]
    };

    /** @test {Presenter.buildExamples} */
    describe("buildExamples()", () => {
        it("builds each example", () => {
            const received = Presenter.buildExamples(obj);

            // n+3 to account for header and code fences (```)
            expect(received).toHaveLength(obj.examples.length + 3);

            const examples = received.slice(2, received.length - 1);
            examples.forEach((eg, ndx) => {
                const { command, description } = obj.examples[ndx];
                expect(eg).toContain(command);
                expect(eg).toContain(description);
            });
        });

        it.each`
            obj                 | expected
            ${obj}              | ${obj.examples.length + 3}
            ${{ examples: [] }} | ${0}
            ${{}}               | ${0}
        `("accepts $obj.options", ({ obj, expected }) => {
            const received = Presenter.buildExamples(obj);
            expect(received).toHaveLength(expected);
        });
    });

    /** @test {Presenter.buildOptions} */
    describe("buildOptions()", () => {
        it("builds each option", () => {
            const received = Presenter.buildOptions(obj);

            // n+1 to account for header
            expect(received).toHaveLength(obj.options.length + 1);

            const options = received.slice(1);
            options.forEach((eg, ndx) => {
                const { flag, description } = obj.options[ndx];
                expect(eg).toContain(flag);
                expect(eg).toContain(description);
            });
        });

        it.each`
            obj                | expected
            ${obj}             | ${obj.options.length + 1}
            ${{ options: [] }} | ${0}
            ${{}}              | ${0}
        `("accepts $obj.options", ({ obj, expected }) => {
            const received = Presenter.buildOptions(obj);
            expect(received).toHaveLength(expected);
        });
    });

    /** @test {Presenter.generateFor} */
    describe("generateFor()", () => {
        it("returns something", () => {
            const fn1Return = ["one"];
            const fn2Return = ["two", "three"];
            let fn1, fn2;

            const Modified = Presenter;
            Modified.buildOptions = fn1 = jest.fn().mockReturnValue(fn1Return);
            Modified.buildExamples = fn2 = jest.fn().mockReturnValue(fn2Return);

            const received = Modified.generateFor(obj);

            [obj.command, obj.description, ...fn1Return, ...fn2Return].forEach(str => {
                expect(received).toEqual(expect.stringContaining(str));
            });

            [fn1, fn2].forEach;
            expect(fn1).toHaveBeenCalledTimes(1);
        });
    });
});
