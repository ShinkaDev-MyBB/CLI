import Linker from "../Linker";

/**
 * Creates symbolic links for designated files and directories.
 *
 * @param {Command} cmd    - To access command arguments
 * @param {Object}  config - shinka.json
 */
export function link(cmd, config) {
    new Linker(cmd, config).link();
}
