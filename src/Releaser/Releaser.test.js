import Releaser from "./Releaser";
import { vendor, code, version } from "../../shinka.json";

describe("Releaser", () => {
    describe("setFileName", () => {
        it("set filename from config", () => {
            const cmd = {};
            const release = new Releaser(cmd);
            release.setFileName();

            expect(release.filename).toEqual(`${vendor}-${code}-${version}.zip`);
        });

        it("set filename from command args", () => {
            const cmd = { vendor: "shin", code: "news", semver: "1.0.0a" };
            const release = new Releaser(cmd);
            release.setFileName();

            expect(release.filename).toEqual(`${cmd.vendor}-${cmd.code}-${cmd.semver}.zip`);
        });

        it("set filename as output", () => {
            const cmd = { output: "path/to/a/thing.zip" };
            const release = new Releaser(cmd);
            release.setFileName();

            expect(release.filename).toEqual(cmd.output);
        });

        it("add directory to filename", () => {
            const cmd = { directory: "path/to/a" };
            const release = new Releaser(cmd);
            release.setFileName();

            expect(release.filename).toEqual(`${cmd.directory}/${vendor}-${code}-${version}.zip`);
        });
    });
});
