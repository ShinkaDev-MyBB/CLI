import fs from "fs";
import nodePath from "path";

import Logger from "../Logger";

/**
 * Organizes data into {@link Config} object.
 *
 * @param   {Cmd} cmd
 * @returns {Config}
 */
const template = ({ mybb_root, files = [], directories = [], vendor, code, version }) => ({
    link: {
        files,
        directories
    },
    mybb_root,
    vendor,
    code,
    version
});

/**
 * Generates a project config file `shinka.json`.
 *
 * @example
 * Initializer.init();
 * // => {
 * //   link: {
 * //     files: [],
 * //     directories: []
 * //   },
 * //   mybb_root: "",
 * //   vendor: "",
 * //   code: "",
 * //   version: "",
 * // }
 *
 * @example
 * Initializer.init({ code: "cli", version: "0.0.1-alpha.1" });
 * // => {
 * //   link: {
 * //     files: [],
 * //     directories: []
 * //   },
 * //   mybb_root: "",
 * //   vendor: "",
 * //   code: "cli",
 * //   version: "0.0.1-alpha.1",
 * // }
 */
export default class Initializer {
    static logger = new Logger();

    /**
     * Creates config file `shinka.json`.
     *
     * @param {Cmd} cmd
     *
     * @example
     * Initializer.init();
     *
     * @example
     * Initializer.init({ code: "cli", version: "0.0.1-alpha.1" });
     */
    static init(cmd) {
        const template = Initializer.generate(cmd);
        const error = Initializer.write(cmd, JSON.stringify(template));
        Initializer.output(error);
    }

    /**
     * Organizes data into {@link Config} object.
     *
     * @param   {Cmd} cmd
     * @returns {Config}
     */
    static generate(cmd) {
        const data = {
            mybb_root: cmd.mybb || "",
            version: cmd.semver || "",
            vendor: cmd.vendor || "",
            code: cmd.code || ""
        };

        return template(data);
    }

    /**
     * Writes template to shinka.json.
     *
     * @param   {Cmd} cmd
     * @returns {void|Error}
     */
    static write(cmd, template) {
        const path = nodePath.resolve(cmd.path || "", "shinka.json");

        try {
            fs.writeFileSync(path, JSON.stringify(template));
        } catch (error) {
            return error;
        }
    }

    /**
     * Logs error or success.
     *
     * @param {?Error} error
     */
    static output(error) {
        if (error) {
            Initializer.logger.error(error);
        } else {
            Initializer.logger.success("Successfully created shinka.json");
        }
    }
}
