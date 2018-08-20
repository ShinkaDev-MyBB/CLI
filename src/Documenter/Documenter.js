import fs from "fs";
import nodePath from "path";

import Presenter from "./Presenter";
import * as cmds from "../../bin/commands";

const defaultCommands = Object.values(cmds).map(value => value());

/**
 * Generates markdown documentation for commands.
 *
 * @example
 * Documenter.generate();
 * @example
 * Documenter.generate(cmds);
 * @example
 * Documenter.generate(cmds, "to/a/path.md");
 */
export default class Documenter {
    /**
     * Generates documentation and write to file.
     *
     * @param {Command[]} [commands=defaultCommands] - Defaults to exported commands
     * @param {string}    [path="manual/usage.md"] - File to write to
     *
     * @example
     * Documenter.generate();
     * @example
     * Documenter.generate(cmds);
     * @example
     * Documenter.generate(cmds, "to/a/path.md");
     */
    static generate(commands = defaultCommands, path = "manual/usage.md") {
        const presented = [
            "# Usage",
            "Try `shinka <command> --help` for detailed options and examples.",
            ...commands.map(Presenter.generateFor)
        ].join("\n");

        fs.writeFileSync(nodePath.resolve(path), presented);
    }
}
