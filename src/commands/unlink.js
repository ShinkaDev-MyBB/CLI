import Linker from "../Linker";

/**
 * Destroys symbolic links for designated files and directories.
 *
 * @param {Object} cmd    - To access command arguments
 * @param {Object} config - shinka.json
 */
export function unlink(cmd, config) {
    new Linker(cmd, config).unlink();
}
