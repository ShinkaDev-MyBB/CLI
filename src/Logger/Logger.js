export default class Logger {
    constructor(silent = false, channel = console) {
        this.silent = silent;
        this.channel = channel;
    }

    log(output, force = false) {
        if (!this.silent || force) {
            this.channel.log(output);
        }
    }
}
