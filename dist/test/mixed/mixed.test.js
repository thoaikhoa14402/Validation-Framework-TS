"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../.."));
const mixedValidator = __1.default.mixed()
    .addMethod("isEqual", (value, errCtx) => value === "test"
    ? true
    : errCtx.createError({
        message: "The string is not equal",
        value: value,
    }))
    .addMethod("isNotEqual", (value, errCtx) => value !== "test"
    ? true
    : errCtx.createError({
        message: "The string is equal",
        value: value,
    }));
const chainValidator = mixedValidator.isEqual().isNotEqual();
try {
    const result1 = chainValidator.validate("test", {
        stopOnFailure: false,
    });
    console.log("Result of mixed validator: ", result1);
}
catch (err) {
    console.log("Error messages: ", err.message);
    console.log("Validation Errors: ", err.validationErrors);
}
