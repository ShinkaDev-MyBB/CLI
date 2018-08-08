import config from "../../shinka.json";
import Linker from "../Linker";

/**
 * Destroys symbolic links for designated files and directories.
 *
 * @param object cmd
 */
export function relink(cmd) {
    const linker = new Linker(cmd, config);
    linker.unlink();
    console.log("");
    linker.link();
}
