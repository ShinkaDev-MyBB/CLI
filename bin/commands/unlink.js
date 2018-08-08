import { unlink as unlinkCmd } from "../../src/commands";

export const unlink = config => ({
    command: "unlink",
    description: "Destroy and recreate symbolic links for plugin files and directories.",
    options: { "-v, --verbose": "Output verbose error messages" },
    action: cmd => unlinkCmd(cmd, config),
    examples: []
});
