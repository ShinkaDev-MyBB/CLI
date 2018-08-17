import Linker from "../Linker";

/**
 * Destroys symbolic links for designated files and directories.
 *
 * @param {Object} cmd    - To access command arguments
 * @param {Object} config - shinka.json
 */
export function relink(cmd, config) {
    const linker = new Linker(cmd, config);
    linker.unlink();
    console.log("");
    linker.link();
}
