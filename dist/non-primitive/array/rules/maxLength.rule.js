"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_ctx_1 = __importDefault(require("../../../common/errors/error.ctx"));
class MaxLengthRule {
    constructor(max, errorMsg) {
        this.errorMessage = "The length of array is longer than maximum";
        if (errorMsg)
            this.errorMessage = errorMsg;
        this.max = max;
    }
    validate(value) {
        if (Array.isArray(value) && value.length > this.max) {
            return error_ctx_1.default.createError({
                message: this.errorMessage,
                type: MaxLengthRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
MaxLengthRule.ruleName = 'array.rule.max';
exports.default = MaxLengthRule;
