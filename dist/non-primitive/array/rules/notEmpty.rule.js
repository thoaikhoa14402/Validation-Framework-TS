"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_ctx_1 = __importDefault(require("../../../common/errors/error.ctx"));
class NotEmptyRule {
    constructor(errorMsg) {
        this.errorMessage = "The array is empty";
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (Array.isArray(value) && value.length == 0) {
            return error_ctx_1.default.createError({
                message: this.errorMessage,
                type: NotEmptyRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
NotEmptyRule.ruleName = 'array.rule.notEmpty';
exports.default = NotEmptyRule;
