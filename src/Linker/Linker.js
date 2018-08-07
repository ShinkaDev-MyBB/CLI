import chalk from "chalk";
import fs from "fs";
import config from "../../shinka.json";
import ProgressBar from "progress";

export default class Linker {
    /** @var {object[]} errors  - Paths and associated errors */
    errorList = [];

    /** @var {number} maxLength - Length of longest path */
    maxLength = this.getMaxLength();

    /** @var {number} total     - Number of files and directories */
    total = config.link.files.length + config.link.directories.length;

    /** @var {ProgressBar} bar  - Outputs progress bar */
    bar = new ProgressBar("\n:bar [:current/:total]", {
        total: this.total
    });

    /** @var {string} cwd       - Current working directory, used to build absolute paths */
    cwd = process.cwd();

    /** @var {object} verbs     - Verbs to use in console output */
    verbs = {};

    constructor(cmd) {
        this.cmd = cmd;
    }

    link() {
        const { files, directories } = config.link;
        this.verbs = { present: "Link", past: "Linked", gerund: "Linking" };

        files.forEach(path => this.makeLink(path, "file"));
        directories.forEach(path => this.makeLink(path, "dir"));

        this.errorList.length ? this.outputErrors() : this.outputSuccess();

        return this;
    }

    unlink() {
        const { files, directories } = config.link;
        this.verbs = { present: "Unlink", past: "Unlinked", gerund: "Unlinking" };

        files.forEach(this.destroyLink);
        directories.forEach(this.destroyLink);

        this.errorList.length ? this.outputErrors() : this.outputSuccess();

        return this;
    }

    destroyLink = path => {
        const { mybb_root } = config;
        let error = null;

        try {
            fs.unlinkSync(`${mybb_root}/${path}`);
        } catch (e) {
            error = e;
            this.errorList.push({ path, error });
        }

        this.outputProgress(path, error);
    };

    makeLink = (path, type = "file") => {
        const { mybb_root } = config;
        let error = null;

        try {
            fs.symlinkSync(`${this.cwd}/${path}`, `${mybb_root}/${path}`, type);
        } catch (e) {
            error = e;
            this.errorList.push({ path, error });
        }

        this.outputProgress(path, error);
    };

    outputProgress(path, error) {
        const verb = this.verbs.gerund;

        let suffix = error ? chalk.red(error.code) : chalk.green("Success");
        let output = path.padEnd(this.maxLength);
        output = `${output} ${suffix}`;

        this.bar.interrupt(chalk.gray(`${verb}... `) + output);
        this.bar.tick();
    }

    /**
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
     * @returns {string}
     */
    success() {
        const verb = this.verbs.past.toLowerCase();
        return chalk.green(`\nSuccessfully ${verb} ${this.total} files and directories`);
    }

    outputErrors() {
        const str = this.errors();
        str.forEach(err => console.log(err));
    }

    outputSuccess() {
        const str = this.success();
        console.log(str);
    }

    /**
     * Calculates length of longest file or directory name.
     *

     * @returns {number}
     */
    getMaxLength() {
        const { files, directories } = config.link;
        return [...files, ...directories].reduce((a, b) => (a.length > b.length ? a : b)).length;
    }
}
