import { relink as relinkCmd } from "../../src/commands";

export const relink = config => ({
    command: "relink",
    description: "Destroy and recreate symbolic links for plugin files and directories.",
    options: { "-v, --verbose": "Output verbose error messages" },
    action: cmd => relinkCmd(cmd, config),
    examples: []
});
