/**
 * Drop-in replacement for console.log.
 *
 * Optionally silences and forces output.
 */
export default class Logger {
    /**
     * Silences output unless forced.
     * @type {boolean}
     */
    silent = false;

    /**
     * Object with #log method.
     * @type {LogObject}
     * @property {function} log
     */
    channel = console;

    /**
     * @param {boolean} [silent=false]
     * @param {Object}  [channel=console]
     */
    constructor(silent = false, channel = console) {
        this.silent = silent;
        this.channel = channel;
    }

    /**
     * Outputs message unless silenced.
     *
     * @param {string} msg
     */
    log(msg) {
        if (!this.silent) {
            this.channel.log(msg);
        }
    }

    /**
     * Namespace to force log output.
     * @type {Object}
     * @property {function(msg: string)} force.log - Always outputs message.
     * @see {@link Logger#log}
     */
    force = {
        /**
         * @param {string} msg
         */
        log: msg => {
            this.channel.log(msg);
        }
    };
}
