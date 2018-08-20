import Transformer from "../Transformer";

/** @test {Transformer} */
describe("Transformer", () => {
    const examples = [
        [
            {
                command: "release -f",
                description: "Force it to do a thing"
            }
        ],
        [
            {
                command: "release -v"
            }
        ]
    ];

    const options = [
        [{ flag: "-f, --force" }],
        [{ flag: "-v, --verbose", description: "Output verbose error messages" }]
    ];

    /** @test {Transformer.example} */
    describe("example()", () => {
        it.each(examples)("builds example for %o", example => {
            const received = Transformer.example(example);
            expect(received).toContain(example.command);

            if (example.description) {
                expect(received).toContain(example.description);
            } else {
                expect(received).not.toContain("#");
            }
        });
    });

    /** @test {Transformer.option} */
    describe("option()", () => {
        it.each(options)("builds option for %o", option => {
            const received = Transformer.option(option);
            expect(received).toContain(option.flag);

            if (option.description) {
                expect(received).toContain(option.description);
            } else {
                expect(received).not.toContain(":");
            }
        });
    });
});
