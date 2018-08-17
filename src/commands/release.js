import Releaser from "../Releaser";

/**
 * Bundles source files for release.
 *
 * @param {Object} cmd    - To access command arguments
 * @param {Object} config - shinka.json
 */
export function release(cmd, config) {
    new Releaser(cmd, config).release();
}
