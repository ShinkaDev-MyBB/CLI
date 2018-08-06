#!/usr/bin/env node

"use strict";

// import { commander } from "commander";

const commander = require("commander");
const { version } = require("../package.json");
const config = require("../shinka.json");
const { error } = console;
const { exit, argv } = process;
const fs = require("fs");

const { link } = require("../lib/link");
const { unlink } = require("../lib/unlink");
const { relink } = require("../lib/relink");

commander.version(version).on("command:*", () => {
    error(
        `Invalid command: ${commander.args.join(" ")}\nSee --help for a list of available commands.`
    );
    exit(1);
});

commander
    .command("link")
    .description("Create symbolic links for plugin files and directories.")
    .option("-v, --verbose", "do a thing")
    .action(link);

commander
    .command("unlink")
    .description("Destroy symbolic links for plugin files and directories.")
    .option("-v, --verbose", "do a thing")
    .action(unlink);

commander
    .command("relink")
    .description("Destroy and recreate symbolic links for plugin files and directories.")
    .option("-v, --verbose", "do a thing")
    .action(relink);

// commander
//   .command()
//   .description()
//   .option()
//   .action();

commander.parse(argv);

if (!argv.slice(2).length) {
    commander.outputHelp(help => help);
}
