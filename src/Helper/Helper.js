import chalk from "chalk";
import Logger from "../Logger";

export default class Helper {
    constructor(logger = new Logger()) {
        this.logger = logger;
    }

    outputHelp(examples = [], command = "") {
        const str = this.help(examples, command);

        str.forEach(eg => this.logger.log(eg));
    }

    help(examples = [], cmd = "") {
        let str = ["\n  Examples: \n"];

        const max = examples.reduce(this.getLongest, { command: "" }).command.length;

        examples.forEach(({ command, description }) => {
            const padded = command.padEnd(max);
            str.push(`    $ shinka ${cmd} ${padded}   ${chalk.gray(description)}`);
        });

        return str;
    }

    getLongest(a, b) {
        return a.command.length > b.command.length ? a : b;
    }
}
