"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boolean = exports.number = exports.string = void 0;
var validator_1 = require("./string/validator");
Object.defineProperty(exports, "string", { enumerable: true, get: function () { return __importDefault(validator_1).default; } });
var validator_2 = require("./number/validator");
Object.defineProperty(exports, "number", { enumerable: true, get: function () { return __importDefault(validator_2).default; } });
var validator_3 = require("./boolean/validator");
Object.defineProperty(exports, "boolean", { enumerable: true, get: function () { return __importDefault(validator_3).default; } });
