import Linker from "./Linker";

/**
 * Destroys symbolic links for designated files and directories.
 *
 * @param object cmd
 */
export function relink(cmd) {
    new Linker(cmd).unlink();
    console.log("");
    new Linker(cmd).link();
}
