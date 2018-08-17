/**
 * Command outline used to generate Commander commands and documentation.
 *
 * @typedef  {Object}    Command
 * @property {string}    command
 * @property {string}    description
 * @property {Option[]}  options
 * @property {Example[]} examples
 *
 * @example
 * {
 *     command: "release",
 *     description: "Bundles source for release.",
 *     options: [{
 *          flag: "-v, --verbose",
 *          description: "Output verbose error messages."
 *     }],
 *     examples: [{
 *          command: "-o path/to/target",
 *          description: "Bundled at path/to/target."
 *     }]
 * }
 */

/**
 * Option outline used to generate Commander commands.
 *
 * @typedef  {Object}  Option
 * @property {string}  flag
 * @property {?string} description
 *
 * @example
 * {
 *     flag: "-v, --verbose",
 *     description: "Output verbose error messages."
 * }
 */

/**
 * Example outline used to generate --help output.
 *
 * @typedef  {Object}  Example
 * @property {string}  command
 * @property {?string} description
 *
 * @example
 * {
 *     command: "-o path/to/target",
 *     description: "Bundled at path/to/target."
 * }
 */

/**
 * @see {@link Linker}
 *
 * @typedef  {Object} LinkError
 * @property {string} path
 * @property {Error}  error
 *
 * @example
 * {
 *     path: "path/to/file",
 *     error: {
 *          code: "EEOT"
 *     }
 * }
 */

/**
 * Object with #log method used to output progress.
 * @see {@link Logger}
 *
 * @typedef  {Object}   LogObject
 * @property {function} log
 *
 * @example
 * class Logger {
 *     log(msg) {
 *          console.log(msg);
 *      }
 * }
 *
 * @example
 * {
 *      log: (msg) => console.log(msg)
 * }
 *
 * @example
 * console
 */

/**
 * Strings used to build messages.
 *
 * @typedef  {Object} Verbs
 * @property {string} past
 * @property {string} present
 * @property {string} gerund
 *
 * @example
 * {
 *      past: "Linked",
 *      present: "Link"
 *      gerund: "Linking"
 * }
 */

/**
 * [Commander.js command](https://github.com/tj/commander.js/blob/master/typings/index.d.ts).
 *
 * @typedef {Object} Cmd
 */

/**
 * Project config.
 *
 * @typedef {Object} Config
 * @property {{ files: string[], directories: [] }} links - Paths used by {@link Linker}.
 * @property {string} mybb_root - Absolute path to MyBB root.
 * @property {string} vendor    - Vendor name, e.g. `shinka` in `shinka-cli`. Used by {@link Releaser}.
 * @property {string} code      - Plugin codename, e.g. `cli` in `shinka-cli`. Used by {@link Releaser}.
 * @property {string} version   - [Semantic version](https://semver.org/). Used by {@link Releaser}.
 *
 * @example
 * {
 *      links: {
 *          files: ["to/a/file", "to/another/file"],
 *          directories: ["to/a/dir", "to/another/dir"]
 *      },
 *      mybb_root: "C:/path/to/mybb/root",
 *      vendor: "shinka",
 *      code: "cli",
 *      version: "0.0.1-a"
 * }
 */
