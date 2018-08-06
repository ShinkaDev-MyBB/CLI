import colors from "colors";
import fs from "fs";
import config from "../../shinka.json";
import ProgressBar from "progress";

export default class Linker {
    errors = [];
    maxLength = this.getMaxLength();
    total = config.link.files.length + config.link.directories.length;
    bar = new ProgressBar("\n:bar [:current/:total]", {
        total: this.total
    });
    cwd = process.cwd();

    constructor(cmd) {
        this.cmd = cmd;
    }

    relink() {
        this.link();
        this.unlink();
    }

    link() {
        const { files, directories } = config.link;

        files.forEach(path => this.makeLink(path, "file"));
        directories.forEach(path => this.makeLink(path, "dir"));

        if (this.errors.length) {
            this.outputErrors("link");
        } else {
            this.outputSuccess("linked");
        }

        return this;
    }

    unlink() {
        const { files, directories } = config.link;

        files.forEach(this.destroyLink);
        directories.forEach(this.destroyLink);

        if (this.errors.length) {
            this.outputErrors("unlink");
        } else {
            this.outputSuccess("unlinked");
        }

        return this;
    }

    destroyLink = path => {
        const { mybb_root } = config;
        let error = null;

        try {
            fs.unlinkSync(`${mybb_root}/${path}`);
        } catch (e) {
            error = e;
            this.errors.push({ path, error });
        }

        this.outputProgress(path, error, "Unlinking");
    };

    makeLink = (path, type = "file") => {
        const { mybb_root } = config;
        let error = null;

        try {
            fs.symlinkSync(`${this.cwd}/${path}`, `${mybb_root}/${path}`, type);
        } catch (e) {
            error = e;
            this.errors.push({ path, error });
        }

        this.outputProgress(path, error, "Linking");
    };

    outputProgress(path, error, prefix = "Linking") {
        let output = path.padEnd(this.maxLength);
        let suffix = error ? error.code.red : "Success".green;
        output = `${output} ${suffix}`;

        this.bar.interrupt(`${prefix}... `.gray + output);
        this.bar.tick();
    }

    outputErrors(action = "link") {
        const { verbose } = this.cmd;

        console.log(`\nFailed to ${action} ${this.errors.length} files or directories`.red);

        if (verbose) {
            this.errors.forEach(({ path, error }) => {
                console.log(`\n${path}\n`);
                console.log(error);
            });
        } else {
            console.log("Rerun with -v for verbose error messages.".gray);
        }
    }

    outputSuccess(action = "linked") {
        console.log(`\nSuccessfully ${action} ${this.total} files and directories`.green);
    }

    /**
     * Calculates length of longest file or directory name.
     *
     * @returns {number}
     */
    getMaxLength() {
        const { files, directories } = config.link;

        return [...files, ...directories].reduce((a, b) => (a.length > b.length ? a : b)).length;
    }
}
