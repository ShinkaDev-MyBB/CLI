import { execSync } from "child_process";
import chalk from "chalk";

export default class Releaser {
    errorList = [];
    config = {};

    constructor(cmd, config) {
        this.cmd = cmd;
        this.config = config;

        this.setFileName();
    }

    setFileName() {
        const {
            output,
            directory,
            vendor = this.config.vendor,
            code = this.config.code,
            semver = this.config.version
        } = this.cmd;

        this.filename = `${vendor}-${code}-${semver}.zip`;

        if (output) {
            this.filename = output;
        }

        if (directory) {
            this.filename = `${directory}/${this.filename}`;
        }
    }

    release() {
        try {
            this.executeArchive();
        } catch (error) {
            this.errorList.push(error);
        }

        this.errorList.length ? this.outputErrors() : this.outputSuccess();
    }

    executeArchive() {
        execSync(`git archive HEAD:src --format zip -o "${this.filename}"`);
    }

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

    success() {
        return chalk.green(`Successfully bundled ${this.filename}`);
    }

    outputErrors() {
        const str = this.errors();
        str.forEach(err => console.log(err));
    }

    outputSuccess() {
        const str = this.success();
        console.log(str);
    }
}
