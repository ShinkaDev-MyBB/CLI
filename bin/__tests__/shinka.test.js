import commander from "commander";

import "../shinka";

describe("shinka", () => {
    const commands = ["link", "unlink", "relink", "release"];

    it("register commands", () => {
        expect(commander.commands.length).toEqual(commands.length);
    });
});
