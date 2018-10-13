import Tester from "../Tester";
import { mybb_root } from "../../../shinka.json";

describe("Tester", () => {
    let errors;
    let cmd;
    let test;
    let config;
    let logger;

    const tester = () => {
        if (!test) {
            test = new Tester(cmd, config, logger);
            test.errorList = errors;
        }

        return test;
    };

    beforeEach(() => {
        errors = ["one error", "two error"];
        cmd = { output: "test.zip" };
        test = null;
        config = {
            mybb_root
        };
        logger = {
            log: jest.fn()
        };
    });

    describe("constructor()", () => {
        it("set default logger", () => {
            logger = undefined;
            expect(tester().logger).toBeTruthy();
        });
    });

    describe("runTests()", () => {
        it("doesn't crash", () => {
            tester().runTests();
            expect(true).toBe(true);
        });
    });
});
