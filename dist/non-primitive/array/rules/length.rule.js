"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_ctx_1 = __importDefault(require("../../../common/errors/error.ctx"));
class LengthRule {
    constructor(length, errorMsg) {
        this.errorMessage = "The length of array is not equal to the value";
        if (errorMsg)
            this.errorMessage = errorMsg;
        this.length = length;
    }
    validate(value) {
        if (Array.isArray(value) && value.length !== this.length) {
            return error_ctx_1.default.createError({
                message: this.errorMessage,
                type: LengthRule.ruleName,
                path: "",
                value: value,
            });
        }
        return true;
    }
}
LengthRule.ruleName = "array.rule.length";
exports.default = LengthRule;
