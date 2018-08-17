import { link as linkCmd } from "../../src/commands";

export const link = config => ({
    command: "link",
    description: "Create symbolic links for plugin files and directories.",
    options: [{ flag: "-v, --verbose", description: "Output verbose error messages" }],
    action: cmd => linkCmd(cmd, config),
    examples: [
        {
            command: "",
            description: ""
        },
        {
            command: "--verbose",
            description: ""
        },
        {
            command: "-v",
            description: ""
        }
    ]
});
