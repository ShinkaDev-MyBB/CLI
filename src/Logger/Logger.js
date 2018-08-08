export default class Logger {
    constructor(cmd) {
        this.silent = cmd.silent;
    }

    log(output, force = false) {
        if (!this.silent || force) {
            console.log(output);
        }
    }
}
