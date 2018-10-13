import chalk from "chalk";

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
    describe("#constructor", () => {
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
    describe("#log", () => {
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

    /**
     * @test {Logger#error}
     */
    describe("#error", () => {
        it("logs error in red", () => {
            logger().error(output);
            expect(channel.error).toHaveBeenCalledWith(chalk.red(output));
        });

        it("falls back to channel#log", () => {
            channel.error = null;
            logger().error(output);
            expect(channel.log).toHaveBeenCalledWith(chalk.red(output));
        });
    });

    /**
     * @test {Logger#success}
     */
    describe("#success", () => {
        it("logs success in green", () => {
            logger().success(output);
            expect(channel.log).toHaveBeenCalledWith(chalk.green(output));
        });
    });
});
