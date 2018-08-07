import { execSync } from "child_process";
import chalk from "chalk";
import config from "../../shinka.json";

export default class Releaser {
    filename = `${config.vendor}-${config.code}-${config.semver}.zip`;
    errorList = [];

    constructor(cmd) {
        this.cmd = cmd;

        this.setFileName();
    }

    setFileName() {
        const {
            output,
            directory,
            vendor = config.vendor,
            code = config.code,
            semver = config.version
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
            execSync(`git archive HEAD:src --format zip -o "${this.filename}"`);
        } catch (error) {
            this.errorList.push(error);
        }

        this.errorList.length ? this.outputErrors() : this.outputSuccess();
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
