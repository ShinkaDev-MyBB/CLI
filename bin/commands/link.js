import { link as linkCmd } from "../../src/commands";

export const link = config => ({
    command: "link",
    description: "Create symbolic links for plugin files and directories.",
    options: [
        { flag: "-v, --verbose", description: "Output verbose error messages" },
        { flag: "-t, --toTrim", description: "Trim string from path" }
    ],
    action: cmd => linkCmd(cmd, config),
    examples: [
        {
            command: "--verbose",
            description: ""
        },
        {
            command: "-t 'src/'",
            description: "Trims 'src/' from output path"
        }
    ]
});
