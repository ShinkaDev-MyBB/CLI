import commander from "commander";
import { version } from "../../../version";
import config from "../../../shinka.json";

import Shinka from "../Shinka";

describe("Shinka", () => {
    let command = () => {};

    beforeEach(() => {
        command = {
            command: "test",
            description: "Does a thing",
            action: jest.fn(),
            examples: [],
            options: []
        };
    });

    describe("#loadConfig", () => {
        it("should return config", () => {
            const received = Shinka.loadConfig();
            expect(received).toEqual(config);
        });

        it("should log error", () => {
            console.log = jest.fn();
            Shinka.loadConfig("not/a/real/file");
            expect(console.log).toHaveBeenCalled();
        });
    });

    describe("#setVersion", () => {
        it.each([version, "1.2.3"])("should set version to %s", version => {
            Shinka.setVersion(version);
            expect(commander.version()).toEqual(version);
        });
    });

    describe("#parseArgs", () => {
        commander.outputHelp = jest.fn();
        process.exit = jest.fn();

        it("should output help", () => {
            process.argv = ["shinka", "release"];
            Shinka.parseArgs();
            expect(commander.outputHelp).toHaveBeenCalled();
        });

        it("should not output help", () => {
            process.argv = ["shinka", "release", "args"];
            Shinka.parseArgs();
            expect(commander.outputHelp).toHaveBeenCalled();
        });
    });

    describe("#loadCommands", () => {
        it.each(["examples", "options"])("should load without %s", key => {
            const initial = commander._eventsCount;
            command = { ...command, command: `without-${key}`, [key]: undefined };

            Shinka.loadCommands({ cmd: () => command });

            expect(commander._eventsCount).toEqual(initial + 1);
        });
    });
});
