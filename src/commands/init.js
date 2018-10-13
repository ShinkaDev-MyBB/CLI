import Initializer from "../Initializer";

/**
 * Generates shinka.json.
 *
 * @param {Command} cmd    - To access command arguments
 * @param {Object}  config - Pre-existing shinka.json
 */
export function init(cmd, config) {
    new Initializer(cmd, config).init();
}
