import { link as linkCmd } from "../../src/commands";

export const link = config => ({
    command: "link",
    description: "Create symbolic links for plugin files and directories.",
    options: { "-v, --verbose": "Output verbose error messages" },
    action: cmd => linkCmd(cmd, config)
});
