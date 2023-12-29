"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_ctx_1 = __importDefault(require("../../../common/errors/error.ctx"));
class MinLengthRule {
    constructor(min, errorMsg) {
        this.errorMessage = "The length of array is longer than minimum";
        if (errorMsg)
            this.errorMessage = errorMsg;
        this.min = min;
    }
    validate(value) {
        if (Array.isArray(value) && value.length < this.min) {
            return error_ctx_1.default.createError({
                message: this.errorMessage,
                type: MinLengthRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
MinLengthRule.ruleName = 'array.rule.min';
exports.default = MinLengthRule;
