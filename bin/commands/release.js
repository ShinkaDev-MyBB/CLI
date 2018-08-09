import { release as releaseCmd } from "../../src/commands";

export const release = config => ({
    command: "release",
    description: "Create symbolic links for plugin files and directories.",
    options: {
        "-v, --verbose": "Output verbose error messages",
        "-s, --semver [version]": "Plugin version. Defaults to shinka.json.",
        "-N, --vendor [vendor]":
            "Vendor name, e.g. `shinka` in `shinka-cli`. Defaults to shinka.json.",
        "-c, --code [code]":
            "Plugin codename, e.g. `cli` in `shinka-cli`. Defaults to shinka.json.",
        "-o, --output [path]": "Bundle filename. Should include file extension.",

        "-d, --directory [path]": "Output directory and filename. Should include file extension."
    },
    action: cmd => releaseCmd(cmd, config),
    examples: [
        {
            command: "",
            description: "Outputs to shinka-cli-0.0.1a.zip"
        },
        {
            command: "-N shin -c news -s 1.0.0",
            description: "Outputs to shin-news-1.0.0.zip"
        },
        {
            command: "-o to/a/path/release.zip",
            description: "Outputs to to/a/path/release.zip"
        },
        {
            command: "-d to/a/path",
            description: "Outputs to to/a/path/shinka-cli-0.0.1a.zip"
        }
    ]
});
