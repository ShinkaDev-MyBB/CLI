module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        "(src|bin)/**/*.{js,jsx,mjs}",
        "!(src|bin)/**/__stories__/*",
        "!(src|bin)/**/__tests__/*",
        "!bin/commands/*"
    ],
    testMatch: [
        "<rootDir>/(src|bin|test)/__tests__/**/*(spec|test).{js,jsx,mjs}",
        "<rootDir>/(src|bin|test)/**/?(*.)(spec|test).{js,jsx,mjs}"
    ],
    testEnvironment: "node",
    testURL: "http://0.0.0.0",
    transform: {
        "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest"
    },
    transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"],
    moduleFileExtensions: ["web.js", "js", "json", "web.jsx", "jsx", "node", "mjs"]
};
