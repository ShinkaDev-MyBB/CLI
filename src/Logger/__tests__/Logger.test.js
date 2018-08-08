import Logger from "../Logger";

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

    describe("constructor()", () => {
        it("set silent property from cmd", () => {
            silent = "SILENCE";
            expect(logger().silent).toEqual(silent);
        });

        it("default channel to console", () => {
            channel = undefined;
            expect(logger().channel).toEqual(console);
        });
    });

    describe("log()", () => {
        it("log output when not silenced", () => {
            logger().log(output);
            expect(channel.log).toHaveBeenCalledWith(output);
        });

        it("not log output when silenced", () => {
            silent = true;
            logger().log(output);
            expect(channel.log).not.toHaveBeenCalled();
        });

        it("log output when forced", () => {
            silent = true;
            logger().log(output, true);
            expect(channel.log).toHaveBeenCalledWith(output);
        });
    });
});
