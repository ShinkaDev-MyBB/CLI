import Linker from "../Linker";

/**
 * Creates symbolic links for designated files and directories.
 *
 * @param object cmd
 */
export function link(cmd, config) {
    new Linker(cmd, config).link();
}
