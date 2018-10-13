import { execSync } from "child_process";

import Logger from "../Logger";

/**
 * Runs PHPUnit tests.
 *
 * @example
 * new Tester({}, config).runTests();
 *
 * @example
 * new Tester({
 *     file: "ExampleTest"
 * }, config).runTests();
 */
export default class Tester {
    /**
     * Command arguments.
     *
     * @type     {Cmd}
     * @property {?string} [cmd.output]    - Overrides default filename format.
     */
    cmd;

    /**
     * For MyBB path lookup.
     * @type {Config}
     */
    config = {};

    /**
     * logger#log is used to output progress, e.g. {@link Logger#log} or {@link console#log}.
     * @type {LogObject}
     */
    logger;

    /**
     * @param {Cmd}       cmd                   - Command arguments
     * @param {Config}    [config={}]           - For vendor, code, and version lookup.
     * @param {LogObject} [logger=new Logger()] - logger#log is used to output progress
     */
    constructor(cmd, config = {}, logger = new Logger()) {
        this.cmd = cmd;
        this.config = config;
        this.logger = logger;
        this.filename = this.getFileName();
    }

    /**
     * Runs PHP unit tests.
     */
    runTests() {
        this.executePHPUnit();
    }

    /**
     * Executes `git archive` to bundle release.
     */
    executePHPUnit() {
        const { mybb_root } = this.config;
        const cwd = process.cwd();

        execSync(`cd ${mybb_root} && phpunit . --colors=always"`);
        execSync(`cd ${cwd}`);
    }
}
