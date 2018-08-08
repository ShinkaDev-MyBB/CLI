import { release as releaseCmd } from "../../src/commands";

export const release = config => ({
    command: "release",
    description: "Create symbolic links for plugin files and directories.",
    options: { "-v, --verbose": "Output verbose error messages" },
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
