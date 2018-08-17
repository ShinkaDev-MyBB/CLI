/**
 * Transforms data into strings for documentation.
 *
 * @example
 * Transformer.example({
 *      command: 'release -f',
 *      description: 'Overwrites target file.'
 * });
 * // => $ release     # Overwrites target file.
 */
export default class Transformer {
    /**
     * @param   {Example} example
     * @returns {string} in format <code>$ command     # Description</code>
     *
     * @example
     * Transformer.example({
     *      command: 'release -f',
     *      description: 'Overwrites target file.'
     * });
     * // => $ release -f     # Overwrites target file.
     */
    static example({ command, description }) {
        let str = `$ ${command}`;
        if (description) str += `     # ${description}`;

        return str;
    }

    /**
     * @param   {Option} option
     * @returns {string} in format <code>**flag**: description</code>
     *
     * @example
     * Transformer.option({
     *      flag: '-v, --verbose',
     *      description: 'Output verbose error messages.'
     * });
     * // => **-v, --verbose**: Output verbose error messages.
     */
    static option({ flag, description }) {
        let str = `**${flag}**`;
        if (description) str += `: ${description}`;

        return str;
    }
}
