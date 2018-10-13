import chalk from "chalk";
import fs from "fs";
import nodePath from "path";
import ProgressBar from "progress";

import Logger from "../Logger";

/**
 * Strings used in composing messages.
 * @type {{ linking: Verbs, unlinking: Verbs }}
 */
export const verbs = {
    linking: { present: "Link", past: "Linked", gerund: "Linking" },
    unlinking: { present: "Unlink", past: "Unlinked", gerund: "Unlinking" }
};

/**
 * Handles creating and destroying symlinks.
 */
export default class Linker {
    /**
     * Paths and associated errors.
     * @type {LinkError[]}
     */
    errorList = [];

    /**
     * Number of files and directories.
     * @type {number}
     */
    total;

    /**
     * Length of longest path.
     * @type {number}
     */
    maxLength;

    /**
     * Progress bar.
     * @type {ProgressBar}
     */
    bar;

    /**
     * Current working directory, used to build absolute paths.
     * @type {string}
     */
    cwd = process.cwd();

    /**
     * Verbs to use in composing messages.
     * @type {Verbs}
     */
    verbs = {};

    /**
     * Command arguments.
     * @type {Cmd}
     */
    cmd;

    /**
     * Config to pull linkables from.
     * @type {Config}
     */
    config = { link: { files: [], directories: [] } };

    /**
     * logger#log is used to output progress, e.g. {@link Logger#log} or {@link console#log}.
     * @type {LogObject}
     */
    logger;

    /**
     * @param {Cmd}    cmd
     * @param {Config} [config=this.config]
     * @param {LogObject} [logger=new Logger()]
     */
    constructor(cmd, config, logger = new Logger()) {
        this.cmd = cmd;
        this.config = config || this.config;
        this.logger = logger;

        this.total = this.config.link.files.length + this.config.link.directories.length;
        this.maxLength = this.getMaxLength();
        this.bar = new ProgressBar("\n:bar [:current/:total]", {
            total: this.total
        });
    }

    /**
     * Links items and outputs progress.
     *
     * @param    {Config}   config
     * @property {string[]} config.files
     * @property {string[]} config.directories
     * @returns  {Linker}
     */
    link({ files = [], directories = [] } = this.config.link) {
        this.verbs = verbs.linking;

        files.forEach(path => this.makeLink(path, "file"));
        directories.forEach(path => this.makeLink(path, "dir"));

        this.errorList.length ? this.outputErrors() : this.outputSuccess();

        return this;
    }

    /**
     * Unlinks items and outputs progress.
     *
     * @param    {Config}   config
     * @property {string[]} config.files
     * @property {string[]} config.directories
     * @returns  {Linker}
     */
    unlink({ files = [], directories = [] } = this.config.link) {
        this.verbs = verbs.unlinking;

        files.forEach(this.destroyLink);
        directories.forEach(this.destroyLink);

        this.errorList.length ? this.outputErrors() : this.outputSuccess();

        return this;
    }

    /**
     * Destroys symlink and outputs progress.
     *
     * @method
     * @param {string} path - Path to file or directory
     */
    destroyLink = path => {
        const { mybb_root } = this.config;
        const { toTrim } = this.config.link;
        let error = null;

        const symPath = !toTrim ? path : path.replace(toTrim, "");

        try {
            fs.unlinkSync(nodePath.resolve(mybb_root, symPath));
        } catch (e) {
            error = e;
            this.errorList.push({ symPath, error });
        }

        this.outputProgress(symPath, error);
    };

    /**
     * Creates symlink and outputs progress.
     *
     * @method
     * @param {string} path - Path to file or directory
     * @param {string} [type="file"] - <code>file</code> or <code>dir</code>
     */
    makeLink = (path, type = "file") => {
        const { mybb_root } = this.config;
        const { toTrim } = this.config.link;
        let error = null;

        const symPath = !toTrim ? path : path.replace(toTrim, "");

        try {
            fs.symlinkSync(
                nodePath.resolve(this.cwd, path),
                nodePath.resolve(mybb_root, symPath),
                type
            );
        } catch (e) {
            error = e;
            this.errorList.push({ path, error });
        }

        this.outputProgress(path, error);
    };

    /**
     * Outputs status message and updates progress bar.
     * @param {string} path
     * @param {?Error}  [error]
     */
    outputProgress(path, error) {
        const str = this.progress(path, error);
        this.bar.interrupt(str);
        this.bar.tick();
    }

    /**
     * Builds progress message in format `(Un)Linking... to/a/path    Status`
     *
     * @param   {string} path
     * @param   {?Error} [error]
     * @returns {string}
     */
    progress(path, error) {
        const verb = this.verbs.gerund;

        let suffix = error ? chalk.red(error.code) : chalk.green("Success");
        let str = path.padEnd(this.maxLength);
        str = `${str} ${suffix}`;

        return chalk.gray(`${verb}... `) + str;
    }

    /**
     * Builds error messages.
     *
     * @returns {string[]}
     */
    errors() {
        const { verbose } = this.cmd;
        const verb = this.verbs.present.toLowerCase();

        let str = [chalk.red(`\nFailed to ${verb} ${this.errorList.length} files or directories`)];

        if (verbose) {
            this.errorList.forEach(({ path, error }) => {
                str.push(`\n${path}\n`);
                str.push(error);
            });
        } else {
            str.push(chalk.gray("Rerun with -v for verbose error messages."));
        }

        return str;
    }

    /**
     * Builds success message.
     *
     * @returns {string}
     */
    success() {
        const verb = this.verbs.past.toLowerCase();
        return chalk.green(`\nSuccessfully ${verb} ${this.total} files and directories`);
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

    /**
     * Calculates length of longest file or directory name.
     *
     * @returns {number}
     */
    getMaxLength() {
        const { files, directories } = this.config.link;
        return [...files, ...directories].reduce((a, b) => (a.length > b.length ? a : b), [])
            .length;
    }
}
