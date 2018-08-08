#!/usr/bin/env node

"use strict";

import commander from "commander";
import path from "path";

import Helper from "../src/Helper";
import { version } from "../version";
import * as commands from "./commands";

const { error } = console;
const { exit, argv } = process;

commander.version(version).on("command:*", () => {
    error(
        `Invalid command: ${commander.args.join(" ")}\nSee --help for a list of available commands.`
    );
    exit(1);
});

loadCommands();

commander.parse(argv);

if (!argv.slice(2).length) {
    commander.outputHelp(help => help);
}

function loadCommands() {
    const config = loadConfig();

    Object.values(commands).forEach(data => {
        const { command, description, options = [], action, examples = [] } = data(config);
        let cmd = commander
            .command(command)
            .description(description)
            .action(action)
            .on("--help", function() {
                new Helper().outputHelp(examples, command);
            });

        Object.entries(options).forEach(([flag, description]) => {
            cmd.option(flag, description);
        });
    });
}

export function loadConfig(file = "shinka.json") {
    const resolved = path.resolve(file);
    try {
        const config = require(resolved);
        return config;
    } catch (error) {
        throw Error(`Cannot find shinka.json at ${resolved}`);
    }
}
