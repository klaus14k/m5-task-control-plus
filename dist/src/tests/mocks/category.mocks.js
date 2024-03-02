"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidDataCategory = exports.category = void 0;
const category = (userId) => {
    return {
        name: "Example",
        userId,
    };
};
exports.category = category;
exports.invalidDataCategory = {
    name: 123,
};
