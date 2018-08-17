import { relink as relinkCmd } from "../../src/commands";

export const relink = config => ({
    command: "relink",
    description: "Destroy and recreate symbolic links for plugin files and directories.",
    options: [{ flag: "-v, --verbose", description: "Output verbose error messages" }],
    action: cmd => relinkCmd(cmd, config),
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
