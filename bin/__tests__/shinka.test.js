import commander from "commander";

import { loadConfig } from "../shinka";

describe("shinka", () => {
    const commands = ["link", "unlink", "relink", "release"];

    it("register commands", () => {
        expect(commander.commands.length).toEqual(commands.length);
    });

    describe("loadConfig()", () => {
        it("should return config", () => {
            const received = loadConfig();
            expect(received).toBeTruthy();
        });

        it("should throw error", () => {
            const received = loadConfig();
            const fn = () => loadConfig("not/a/real/file");
            expect(received).toBeTruthy();
            expect(fn).toThrow();
        });
    });
});
