import Logger from "../Logger";

/**
 * @test {Logger}
 */
describe("Logger", () => {
    const output = "expected output";
    let log;
    let channel;
    let silent;

    const logger = () => {
        if (!log) {
            log = new Logger(silent, channel);
        }
        return log;
    };

    beforeEach(() => {
        log = null;
        channel = {
            log: jest.fn(),
            warn: jest.fn(),
            error: jest.fn()
        };
        silent = false;
    });

    /**
     * @test {Logger#constructor}
     */
    describe("constructor()", () => {
        it("sets silent property", () => {
            silent = "SILENCE";
            expect(logger().silent).toEqual(silent);
        });

        it("defaults channel to console", () => {
            channel = undefined;
            expect(logger().channel).toEqual(console);
        });
    });

    /**
     * @test {Logger#log}
     */
    describe("log()", () => {
        it("logs output when not silenced", () => {
            logger().log(output);
            expect(channel.log).toHaveBeenCalledWith(output);
        });

        it("doesn't log output when silenced", () => {
            silent = true;
            logger().log(output);
            expect(channel.log).not.toHaveBeenCalled();
        });

        /**
         * @test {Logger#force.log}
         */
        it("logs output when forced", () => {
            silent = true;
            logger().force.log(output);
            expect(channel.log).toHaveBeenCalledWith(output);
        });
    });
});
