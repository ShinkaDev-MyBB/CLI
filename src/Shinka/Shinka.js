import commander from "commander";
import path from "path";
import chalk from "chalk";

import Helper from "../Helper";
import Logger from "../Logger";
import { version } from "../../version";
import * as commands from "../../bin/commands";

/**
 * Registers commander.js.
 *
 * @example
 * Shinka.run();
 */
export default class Shinka {
    static logger = new Logger();

    /**
     * CLI entry point
     */
    static run() {
        Shinka.setVersion();
        Shinka.loadCommands();
        Shinka.parseArgs();
    }

    /**
     * Registers commands with Commander.
     */
    static loadCommands(cmds = commands) {
        const config = Shinka.loadConfig();

        Object.values(cmds).forEach(data => {
            const { command, description, options = [], action, examples = [] } = data(config);
            let cmd = commander
                .command(command)
                .description(description)
                .action(action)
                .on("--help", function() {
                    new Helper().outputHelp(examples, command);
                });

            options.forEach(({ flag, description }) => {
                cmd.option(flag, description);
            });
        });
    }

    /**
     * Requires shinka.json config.
     *
     * @param   {string} file - Path to shinka.json
     * @returns {Config}
     */
    static loadConfig(file = "shinka.json") {
        const resolved = path.resolve(file);
        try {
            return require(resolved);
        } catch (error) {
            Shinka.logger.log(
                chalk.red(
                    `Cannot find ${file}. Try "shinka init" or navigate to a project with ${file}.`
                )
            );
        }
    }

    /**
     * Registers version with Commander.
     *
     * @param {string} [vers=version]
     */
    static setVersion(vers = version) {
        const { error } = console;
        const { exit } = process;

        commander.version(vers).on("command:*", () => {
            error(
                `Invalid command: ${commander.args.join(
                    " "
                )}\nSee --help for a list of available commands.`
            );
            exit(1);
        });
    }

    static parseArgs() {
        const { argv } = process;
        commander.parse(argv);

        if (!argv.slice(2).length) {
            commander.outputHelp(help => help);
        }
    }
}
