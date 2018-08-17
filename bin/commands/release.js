import { release as releaseCmd } from "../../src/commands";

export const release = config => ({
    command: "release",
    description: "Create symbolic links for plugin files and directories.",
    options: [
        { flag: "-v, --verbose", description: "Output verbose error messages" },
        { flag: "-s, --semver [version]", description: "Plugin version. Defaults to shinka.json." },
        {
            flag: "-N, --vendor [vendor]",
            description: "Vendor name, e.g. `shinka` in `shinka-cli`. Defaults to shinka.json."
        },
        {
            flag: "-c, --code [code]",
            description: "Plugin codename, e.g. `cli` in `shinka-cli`. Defaults to shinka.json."
        },
        {
            flag: "-o, --output [path]",
            description: "Bundle filename. Should include file extension."
        },
        {
            flag: "-d, --directory [path]",
            description: "Output directory and filename. Should include file extension."
        }
    ],
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
