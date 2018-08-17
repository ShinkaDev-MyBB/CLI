import chalk from "chalk";
import Logger from "../Logger";

/**
 * Outputs examples for usage (--help) information.
 *
 * @example
 * new Helper().outputHelp(
 *      [{ command: "-v", description: "Outputs verbose error messages" }],
 *      "link"
 * );
 * // => Examples:
 * //        $ shinka link -v   Outputs verbose error messages
 */
export default class Helper {
    /**
     * Used to output help, e.g. {@link Logger#log} or {@link console#log}.
     * @type {LogObject}
     */
    logger;

    /**
     * @param {LogObject} [logger=new Logger()] - Object with #log method.
     */
    constructor(logger = new Logger()) {
        this.logger = logger;
    }

    /**
     * Outputs usage examples.
     *
     * @param {Example[]} [examples=[]]
     * @param {?string}   [command=""] - Command name prepended to each example
     *
     * @example
     * new Helper().outputHelp(
     *      [{ command: "-v", description: "Outputs verbose error messages" }],
     *      "link"
     * );
     * // => Examples:
     * //        $ shinka link -v   Outputs verbose error messages
     */
    outputHelp(examples = [], command = "") {
        const str = this.help(examples, command);

        str.forEach(eg => this.logger.log(eg));
    }

    /**
     * Builds usage examples.
     *
     * @param   {Example[]} [examples=[]]
     * @param   {string}    [cmd=""] - Command name prepended to each example
     * @returns {string[]}
     *
     * @example
     * new Helper().help(
     *      [{ command: "-v", description: "Outputs verbose error messages" }],
     *      "link"
     * );
     * // => ["\n  Examples: \n", "$ shinka link -v   Outputs verbose error messages"]
     */
    help(examples = [], cmd = "") {
        let str = ["\n  Examples: \n"];

        const max = examples.reduce(this.getLongest, { command: "" }).command.length;

        examples.forEach(({ command, description }) => {
            const padded = command.padEnd(max);
            str.push(`    $ shinka ${cmd} ${padded}   ${chalk.gray(description)}`);
        });

        return str;
    }

    /**
     * Reducer helper for finding the example with the longest command.
     *
     * @param   {Example} a
     * @param   {Example} b
     * @returns {Example} Example with longest command
     */
    getLongest(a, b) {
        return a.command.length > b.command.length ? a : b;
    }
}
