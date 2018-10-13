import { test as testCmd } from "../../src/commands";

export const test = config => ({
    command: "test",
    description: "Run PHPUnit tests.",
    options: [{ flag: "-v, --verbose", description: "Output verbose error messages" }],
    action: cmd => testCmd(cmd, config),
    examples: [
        {
            command: "",
            description: "Runs all unit tests."
        },
        {
            command: "ExampleTest",
            description: "Runs unit tests in ExampleTest.php"
        }
    ]
});
