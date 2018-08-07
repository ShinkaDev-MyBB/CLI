import Linker from "../Linker";

/**
 * Destroys symbolic links for designated files and directories.
 *
 * @param object cmd
 */
export function unlink(cmd) {
    new Linker(cmd).unlink();
}
