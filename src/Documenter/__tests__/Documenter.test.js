import fs from "fs";
import nodePath from "path";

import Documenter from "../Documenter";

/** @test {Documenter} */
describe.only("Documenter", () => {
    const path = "./DOCUMENTER.md";
    const commands = [
        {
            command: "command",
            description: "Does a thing",
            options: [
                { flag: "-f, --force", description: "Force the thing" },
                { flag: "-v, --verbose", description: "Output verbose error messages" }
            ],
            examples: [
                {
                    command: "-f",
                    description: "Force it to do a thing"
                },
                {
                    command: "-v",
                    description: "Outputs full error messages"
                }
            ]
        }
    ];

    afterEach(() => {
        try {
            fs.unlinkSync(nodePath.resolve(path));
        } catch (e) {
            console.warn(`${path} does not exist.`);
        }
    });

    const readFile = () => {
        return fs.readFileSync(path, { encoding: "utf8" });
    };

    const fileExists = () => {
        try {
            fs.accessSync(path);
        } catch (err) {
            return false;
        }

        return true;
    };

    describe("#generate", () => {
        it.each`
            commands
            ${undefined}
            ${commands}
        `("writes file with $commands", () => {
            Documenter.generate(commands, path);
            expect(fileExists()).toEqual(true);
        });

        it("writes default commands", () => {
            Documenter.generate(undefined, path);
            const written = readFile();

            ["link", "release", "relink", "unlink"].forEach(({ command }) => {
                expect(written).toContain(command);
            });
        });

        it("writes given commands", () => {
            Documenter.generate(commands, path);
            const written = readFile();

            commands.forEach(command => {
                expect(written).toContain(command.command);
            });
        });
    });
});
