const { Documenter } = require("../dist/src/Documenter");
Documenter.generate();

const { execSync } = require("child_process");
execSync("esdoc");
