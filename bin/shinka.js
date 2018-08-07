#!/usr/bin/env node

"use strict";

const commander = require("commander");
const { version } = require("../package.json");
const { link, unlink, relink, release } = require("../lib/commands");
const { Helper } = require("../lib/Helper");

const { error } = console;
const { exit, argv } = process;

commander.version(version).on("command:*", () => {
    error(
        `Invalid command: ${commander.args.join(" ")}\nSee --help for a list of available commands.`
    );
    exit(1);
});

commander
    .command("link")
    .description("Create symbolic links for plugin files and directories.")
    .option("-v, --verbose", "Output verbose error messages")
    .action(link);

commander
    .command("unlink")
    .description("Destroy symbolic links for plugin files and directories.")
    .option("-v, --verbose", "Output verbose error messages")
    .action(unlink);

commander
    .command("relink")
    .description("Destroy and recreate symbolic links for plugin files and directories.")
    .option("-v, --verbose", "Output verbose error messages")
    .action(relink);

commander
    .command("release")
    .description("Bundles plugin for release in format `vendor-code-version.zip`.")
    .option("-v, --verbose", "Output verbose error messages")
    .option("-s, --semver [version]", "Plugin version. Defaults to shinka.json.")
    .option(
        "-N, --vendor [vendor]",
        "Vendor name, e.g. `shinka` in `shinka-cli`. Defaults to shinka.json."
    )
    .option(
        "-c, --code [code]",
        "Plugin codename, e.g. `cli` in `shinka-cli`. Defaults to shinka.json."
    )
    .option("-o, --output [path]", "Bundle filename. Should include file extension.")
    .option(
        "-d, --directory [path]",
        "Output directory and filename. Should include file extension."
    )
    .action(release)
    .on("--help", function() {
        Helper.outputHelp(
            [
                ["", "Outputs to shinka-cli-0.0.1a.zip"],
                ["-N shin -c news -s 1.0.0", "Outputs to shin-news-1.0.0.zip"],
                ["-o to/a/path/release.zip", "Outputs to to/a/path/release.zip"],
                ["-d to/a/path", "Outputs to to/a/path/shinka-cli-0.0.1a.zip"]
            ],
            "release"
        );
    });

// commander
//   .command()
//   .description()
//   .option()
//   .action();

commander.parse(argv);

if (!argv.slice(2).length) {
    commander.outputHelp(help => help);
}
