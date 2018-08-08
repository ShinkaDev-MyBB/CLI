import Linker from "../Linker";

/**
 * Destroys symbolic links for designated files and directories.
 *
 * @param object cmd
 */
export function relink(cmd, config) {
    const linker = new Linker(cmd, config);
    linker.unlink();
    console.log("");
    linker.link();
}
