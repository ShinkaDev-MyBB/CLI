import { init as initCmd } from "../../src/commands";

export const init = config => ({
    command: "init",
    description: "Generate shinka.json for project.",
    options: [
        { flag: "-v, --verbose", description: "Output verbose error messages" },
        { flag: "-o, --overwrite", description: "Overwrite existing shinka.json, if any." },
        { flag: "-s, --semver <version>", description: "Semantic plugin version." },
        { flag: "-m, --mybb <root>", description: "Absolute path to MyBB root." },
        { flag: "-c, --code <code>", description: "Plugin codename, e.g. `cli` in `shinka-cli`." },
        {
            flag: "-N, --vendor <vendor>",
            description: "Vendor name, e.g. `shinka` in `shinka-cli`."
        }
    ],
    action: cmd => initCmd(cmd, config),
    examples: [
        {
            command: "",
            description: "Creates basic shinka.json."
        },
        {
            command: "-N shinka -c cli -s 0.0.1",
            description: "Creates shinka.json with specified vendor, code, and version."
        }
    ]
});
