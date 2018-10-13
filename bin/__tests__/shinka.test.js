import commander from "commander";
import "../shinka";

describe("bin/shinka", () => {
    const commands = ["link", "unlink", "relink", "release", "init"];

    it("register commands", () => {
        expect(commander.commands).toHaveLength(commands.length);
    });
});
