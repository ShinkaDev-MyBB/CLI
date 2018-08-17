import Transformer from "./Transformer";

/**
 * Generates markdown documentation for commands.
 *
 * @example
 * Presenter.generateFor({
 *      command: 'release',
 *      description: 'Bundles source files for release.',
 *      options: [{ flag: '-f, --force', description: "Overwrite target file" }],
 *      examples: [{ command: '-o path/to/target', description: "Changes output directory" }]
 * });
 * // => ## release
 * //    Bundles source files for release.
 * //
 * //    ### Options
 * //    **-f, --force**: Overwrite target file
 * //
 * //    ### Examples
 * //    $ shinka release -o path/to/target     # Changes output directory
 */
export default class Presenter {
    /**
     * Generates documentation for given command.
     *
     * @param   {Command} cmd - Command being documented
     * @returns {string}  Generated documentation
     *
     * @example
     * Presenter.generateFor({
     *      command: 'release',
     *      description: 'Bundles source files for release.'
     * });
     * // => ## Release
     * //    Bundles source files for release.
     */
    static generateFor = cmd => {
        const output = [
            `## \`${cmd.command}\``,
            cmd.description,
            ...Presenter.buildOptions(cmd),
            ...Presenter.buildExamples(cmd)
        ];

        return output.join("\n");
    };

    /**
     * Transforms examples to list of strings.
     *
     * @param   {Command}    cmd
     * @param   {Example[]}  cmd.examples
     * @param   {string}     cmd.command
     * @returns {string[]}
     *
     * @example
     * Presenter.buildExamples({
     *      command: "release",
     *      examples: [{ command: '-o path/to/target', description: "Changes output directory" }]
     * });
     * // => ['### Examples',
     * //     '```shell',
     * //     '$ release -o path/to/target    # Changes output directory',
     * //     '```']
     */
    static buildExamples({ examples, command }) {
        if (!examples || !examples.length) {
            return [];
        }

        const egs = examples.map(eg => {
            // include command name in example
            eg.command = `${command} ${eg.command}`;
            return `${Transformer.example(eg)}`;
        });

        return [`### Examples`, "```shell", ...egs, "```"];
    }

    /**
     * Transforms options to list of strings.
     *
     * @param   {Command}  cmd
     * @param   {Option[]} cmd.options
     * @returns {string[]}
     *
     * @example
     * Presenter.buildOptions({
     *      options: [{ flag: '-f, --force', description: "Overwrite target file" }]
     * });
     * // => ['### Options', **-f, --force**: Overwrite target file']
     */
    static buildOptions({ options }) {
        if (!options || !options.length) {
            return [];
        }

        const opts = options.map(option => `${Transformer.option(option)}\n`);

        return [`### Options`, ...opts];
    }
}
