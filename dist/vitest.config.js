"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        environment: "node",
        setupFiles: ["./src/tests/setupFiles.ts"],
        threads: false,
        // ...
    },
});