import commander from "commander";
import "../shinka";

describe("bin/shinka", () => {
    const commands = ["link", "unlink", "relink", "release"];

    it("register commands", () => {
        expect(commander.commands).toHaveLength(commands.length);
    });
});
