import { execSync } from "child_process";
import chalk from "chalk";

import Logger from "../Logger";

export default class Releaser {
    errorList = [];
    config = {};

    constructor(cmd, config, logger = new Logger()) {
        this.cmd = cmd;
        this.config = config;
        this.logger = logger;
        this.filename = this.getFileName();
    }

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
        str.forEach(err => this.logger.log(err));
    }

    outputSuccess() {
        const str = this.success();
        this.logger.log(str);
    }
}
