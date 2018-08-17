import { execSync } from "child_process";
import chalk from "chalk";

import Logger from "../Logger";

/**
 * Bundles source files for release.
 *
 * @example <caption>Assume later uses of `config` use the following value.</caption>
 * const config = {
 *      vendor: "shinka",
 *      code: "cli",
 *      version: "0.0.1-a"
 * };
 *
 * @example
 * new Releaser({}, config);
 * // => shinka-news-0.0.1-a.zip
 *
 * @example
 * new Releaser({
 *      vendor: "shin",
 *      directory: "to/a/dir"
 * }, config);
 * // => to/a/dir/shin-news-0.0.1-a.zip
 */
export default class Releaser {
    /**
     * Command arguments.
     *
     * @type     {Cmd}
     * @property {?string} [cmd.output]    - Overrides default filename format.
     * @property {?string} [cmd.directory] - Prepended to filename.
     * @property {?string} [cmd.vendor]    - Vendor name, e.g. `shinka` in `shinka-cli`.
     * @property {?string} [cmd.code]      - Plugin code name, e.g. `cli` in `shinka-cli`.
     * @property {?string} [cmd.semver]    - Semantic plugin version
     */
    cmd;

    /**
     * For vendor, code, and version lookup.
     * @type {Config}
     */
    config = {};

    /**
     * @type {Error[]}
     */
    errorList = [];

    /**
     * Output target.
     * @type {string}
     */
    filename;

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
     * Builds filename from command arguments and config.
     *
     * Format defaults to `vendor-code-semver.zip`.
     * `cmd.output` overwrites the default format.
     * `cmd.directory` is prepended to the filename
     *
     * @returns {string}
     *
     * @example
     * new Releaser({}, config).getFileName();
     * // => shinka-cli-0.0.1-a.zip
     *
     * @example
     * new Releaser({
     *      vendor: "shin",
     *      code: "news",
     *      version: "1.0.0"
     * }, config).getFileName();
     * // => shin-news-1.0.0.zip
     *
     * @example
     * new Releaser({
     *      directory: "to/a/dir"
     * }, config).getFileName();
     * // => to/a/dir/shinka-news-0.0.1-a.zip
     *
     * @example
     * new Releaser({
     *      directory: "to/a/dir",
     *      output: "release.zip"
     * }, config).getFileName();
     * // => to/a/dir/release.zip
     */
    getFileName() {
        const {
            output,
            directory,
            vendor = this.config.vendor,
            code = this.config.code,
            semver = this.config.version
        } = this.cmd;

        let filename = `${vendor}-${code}-${semver}.zip`;

        if (output) {
            filename = output;
        }

        if (directory) {
            filename = `${directory}/${filename}`;
        }

        return filename;
    }

    /**
     * Bundles source files for release with `git archive`.
     */
    release() {
        try {
            this.executeArchive();
        } catch (error) {
            this.errorList.push(error);
        }

        this.errorList.length ? this.outputErrors() : this.outputSuccess();
    }

    /**
     * Executes `git archive` to bundle release.
     */
    executeArchive() {
        execSync(`git archive HEAD:src --format zip -o "${this.filename}"`);
    }

    /**
     * Builds error messages.
     * @returns {string[]}
     */
    errors() {
        const { verbose } = this.cmd;

        let str = [chalk.red(`Failed to bundle ${this.filename}`)];

        if (verbose) {
            this.errorList.forEach(error => {
                str.push(`\n${error}`);
            });
        } else {
            str.push(chalk.gray("Rerun with -v for verbose error messages."));
        }

        return str;
    }

    /**
     * Builds success message.
     * @returns {string}
     */
    success() {
        return chalk.green(`Successfully bundled ${this.filename}`);
    }

    /**
     * Outputs error messages.
     */
    outputErrors() {
        const str = this.errors();
        str.forEach(err => this.logger.log(err));
    }

    /**
     * Outputs success message.
     */
    outputSuccess() {
        const str = this.success();
        this.logger.log(str);
    }
}
